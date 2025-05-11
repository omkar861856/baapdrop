import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Formats a price string or number to INR currency format
 * @param price - The price to format
 * @param currency - The currency symbol (defaults to ₹)
 */
export function formatPrice(
  price: string | number,
  currency: string = "₹"
): string {
  if (!price) return `${currency}0`;

  // Convert to number if it's a string
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return `${currency}${numericPrice.toLocaleString("en-IN")}`;
}

/**
 * A utility function that merges multiple class values into a single class string.
 * It combines clsx for conditional classes with tailwind-merge to handle Tailwind CSS conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to the specified element
 * @param elementId - The ID of the element to scroll to
 * @param options - ScrollIntoView options (behavior, block, inline)
 */
export function scrollToElement(
  elementId: string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView(options);
  }
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}
