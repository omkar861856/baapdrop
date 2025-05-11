/**
 * Defers execution of a function until after a specified timeout
 * Useful for delaying non-critical operations
 * @param fn - The function to be executed
 * @param delay - The delay in milliseconds
 */
export function deferExecution(fn: () => void, delay: number = 0): void {
  setTimeout(fn, delay);
}

/**
 * Prefetches pages to improve performance
 * @param paths - Array of paths to prefetch
 */
export function prefetchPages(paths: string[]): void {
  paths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    link.as = "document";
    document.head.appendChild(link);
  });
}

/**
 * Preloads assets like images, fonts, etc.
 * @param urls - Array of URLs to preload
 * @param type - Resource type (e.g., 'image', 'font', 'style')
 */
export function preloadAssets(urls: string[], type: string = "image"): void {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
  });
}
