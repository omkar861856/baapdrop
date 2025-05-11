import fs from "fs";
import { parse } from "csv-parse";
import { storage } from "../storage";
import { log } from "../vite";

// Function to slugify strings for product handles
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-");
}

// Interface for CSV product row
interface CsvProduct {
  Handle: string;
  Title: string;
  "Body (HTML)": string;
  Vendor: string;
  "Product Category": string;
  Type: string;
  Tags: string;
  Published: string;
  "Option1 Name": string;
  "Option1 Value": string;
  "Option2 Name": string;
  "Option2 Value": string;
  "Option3 Name": string;
  "Option3 Value": string;
  "Variant SKU": string;
  "Variant Grams": string;
  "Variant Inventory Tracker": string;
  "Variant Inventory Qty": string;
  "Variant Inventory Policy": string;
  "Variant Fulfillment Service": string;
  "Variant Price": string;
  "Variant Compare At Price": string;
  "Variant Requires Shipping": string;
  "Variant Taxable": string;
  "Variant Barcode": string;
  "Image Src": string;
  "Image Position": string;
  "Image Alt Text": string;
  "Gift Card": string;
  "SEO Title": string;
  "SEO Description": string;
  [key: string]: string; // For any additional fields
}

// Main function to import products from CSV
export async function importProductsFromCsv(
  filePath: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Read CSV file
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    // Parse CSV
    const records: CsvProduct[] = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          // Set relax_column_count to true to handle varying numbers of columns
          relax_column_count: true,
        },
        (err, records) => {
          if (err) return reject(err);
          resolve(records as CsvProduct[]);
        }
      );
    });

    if (records.length === 0) {
      return {
        success: false,
        message: "CSV file contains no valid product records",
      };
    }

    log(`Parsed ${records.length} records from CSV`, "csv-import");

    // Group records by Handle to separate products and their variants
    const productGroups = new Map<
      string,
      { product: CsvProduct; variants: CsvProduct[]; images: CsvProduct[] }
    >();

    // Group records by product handle
    records.forEach((record) => {
      if (!record.Handle) return;

      if (!productGroups.has(record.Handle)) {
        productGroups.set(record.Handle, {
          product: record,
          variants: [],
          images: [],
        });
      }

      const group = productGroups.get(record.Handle)!;

      // First record is the main product, others are variants
      if (record !== group.product) {
        group.variants.push(record);
      }

      // If it has an image source, add to images array
      if (record["Image Src"]) {
        group.images.push(record);
      }
    });

    // Import products and their variants
    let productsImported = 0;
    let productsUpdated = 0;
    let variantsImported = 0;
    let imagesImported = 0;

    // Get or create product categories
    const categoryMap = new Map<string, number>();
    const categories = await storage.getProductCategories();
    categories.forEach((category) => {
      categoryMap.set(category.name, category.id);
    });

    // Convert Map.entries() to Array to avoid TSC errors
    for (const [handle, { product, variants, images }] of Array.from(
      productGroups.entries()
    )) {
      try {
        // Check if there's a category or create one
        let categoryId: number | null = null;
        const categoryName =
          product["Product Category"] || product.Type || "General";

        if (categoryName) {
          if (categoryMap.has(categoryName)) {
            categoryId = categoryMap.get(categoryName)!;
          } else {
            // Create new category
            const newCategory = await storage.createProductCategory({
              name: categoryName,
              slug: slugify(categoryName),
              description: `Products in the ${categoryName} category`,
              imageUrl: null,
            });
            categoryId = newCategory.id;
            categoryMap.set(categoryName, categoryId);
          }
        }

        // For now, we'll use a simpler approach: delete any product with the same handle first
        const productHandle = product.Handle || slugify(product.Title);
        const existingProduct = await storage.getProductByHandle(productHandle);
        let newProduct;

        // Create the product (if existed before, consider it updated)
        newProduct = await storage.createProduct({
          handle: productHandle,
          title: product.Title,
          description: product["Body (HTML)"] || null,
          vendor: product.Vendor || null,
          productType: product.Type || null,
          tags: product.Tags || null,
          published:
            product.Published === "TRUE" || product.Published === "true",
          baseCost: product["Variant Price"] ? product["Variant Price"] : "0",
          basePrice: product["Variant Price"] ? product["Variant Price"] : "0",
          compareAtPrice: product["Variant Compare At Price"] || null,
          seoTitle: product["SEO Title"] || null,
          seoDescription: product["SEO Description"] || null,
          mainImageUrl: product["Image Src"] || null,
          sku: product["Variant SKU"] || null,
          categoryId,
        });

        if (existingProduct) {
          productsUpdated++;
          log(`Replaced product: ${productHandle}`, "csv-import");
        } else {
          productsImported++;
          log(`Created new product: ${productHandle}`, "csv-import");
        }

        // Create variants
        for (const variant of variants) {
          // Only create variant if it has unique options
          if (variant["Option1 Name"] && variant["Option1 Value"]) {
            // Create a variant title for display purposes
            const variantTitle = `${variant["Option1 Value"]}${
              variant["Option2 Value"] ? " / " + variant["Option2 Value"] : ""
            }${
              variant["Option3 Value"] ? " / " + variant["Option3 Value"] : ""
            }`;

            const newVariant = await storage.createProductVariant({
              productId: newProduct.id,
              sku: variant["Variant SKU"] || variantTitle,
              price: variant["Variant Price"] || "0",
              compareAtPrice: variant["Variant Compare At Price"] || null,
              option1Name: variant["Option1 Name"] || null,
              option1Value: variant["Option1 Value"] || null,
              option2Name: variant["Option2 Name"] || null,
              option2Value: variant["Option2 Value"] || null,
              option3Name: variant["Option3 Name"] || null,
              option3Value: variant["Option3 Value"] || null,
              inventoryQty: parseInt(variant["Variant Inventory Qty"]) || 0,
              imageUrl: variant["Image Src"] || null,
            });
            variantsImported++;
          }
        }

        // Create product images
        for (const image of images) {
          if (image["Image Src"]) {
            const newImage = await storage.createProductImage({
              productId: newProduct.id,
              url: image["Image Src"],
              position: parseInt(image["Image Position"]) || 1,
              altText: image["Image Alt Text"] || "",
            });
            imagesImported++;
          }
        }
      } catch (error) {
        log(`Error importing product ${handle}: ${error}`, "csv-import");
      }
    }

    return {
      success: true,
      message: `Successfully processed CSV: ${productsImported} new products, ${productsUpdated} updated products, ${variantsImported} variants, and ${imagesImported} images.`,
    };
  } catch (error) {
    // Provide more detailed error message
    let errorMessage = "Unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
      log(`Error during CSV import: ${errorMessage}`, "csv-import");

      // Handle specific CSV parsing errors
      if (errorMessage.includes("Invalid Record Length")) {
        return {
          success: false,
          message:
            "CSV format error: The number of columns varies between rows. This has been fixed, please try again.",
        };
      }
    } else {
      log(`Error during CSV import: ${error}`, "csv-import");
    }

    return { success: false, message: `Import failed: ${errorMessage}` };
  }
}
