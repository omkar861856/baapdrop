/**
 * Performance utilities for optimizing application rendering and processing
 */

import { useRef, useCallback, useState, useEffect } from "react";

// Simple deep equality function implementation inlined to avoid circular dependencies
function internalIsEqual(a: any, b: any): boolean {
  // Handle primitive types and references to the same object
  if (a === b) return true;

  // If either is null/undefined but not both
  if (a == null || b == null) return false;

  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // If one is object but the other isn't
  if (typeof a !== "object" || typeof b !== "object") return false;

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!internalIsEqual(a[i], b[i])) return false;
    }

    return true;
  }

  // Handle objects
  if (Array.isArray(a) || Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys in B
  for (const key of keysA) {
    if (!b.hasOwnProperty(key)) return false;
    if (!internalIsEqual(a[key], b[key])) return false;
  }

  return true;
}

/**
 * Custom hook for debouncing function calls
 * Prevents excessive function calls during rapid user interactions
 *
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [fn, delay]
  ) as T;

  return debouncedFn;
}

/**
 * Custom hook for throttling function calls
 * Limits the rate at which a function can fire
 *
 * @param fn Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): T {
  const lastRunRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRunRef.current;

      if (timeSinceLastRun >= limit) {
        // If enough time has passed, run the function immediately
        lastRunRef.current = now;
        fn(...args);
      } else {
        // Otherwise, schedule it to run after the remaining time
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          lastRunRef.current = Date.now();
          fn(...args);
          timeoutRef.current = null;
        }, limit - timeSinceLastRun);
      }
    },
    [fn, limit]
  ) as T;

  return throttledFn;
}

interface DepsCache {
  [key: number]: any;
}

/**
 * Memoizes expensive calculations for improved performance
 * Only recalculates when inputs change significantly
 *
 * @param value Value to memoize based on
 * @param calculate Function to calculate the result
 * @param deps Additional dependencies to trigger recalculation
 * @returns Memoized calculated value
 */
export function useDeepMemo<T, R>(
  value: T,
  calculate: (val: T) => R,
  deps: any[] = []
): R {
  // Define the ref type with an index signature for deps storage
  interface MemoRef {
    value: T;
    result: R | null;
    depsCache: DepsCache;
  }

  const ref = useRef<MemoRef>({
    value,
    result: null,
    depsCache: {},
  });

  // Check if values have changed
  const valueChanged = !internalIsEqual(ref.current.value, value);
  const depsChanged = deps.some((dep, i) => dep !== ref.current.depsCache[i]);

  if (ref.current.result === null || valueChanged || depsChanged) {
    // Create new deps cache
    const newDepsCache: DepsCache = {};
    deps.forEach((dep, i) => {
      newDepsCache[i] = dep;
    });

    // Update ref with new values
    ref.current = {
      value,
      result: calculate(value),
      depsCache: newDepsCache,
    };
  }

  return ref.current.result as R;
}

/**
 * Custom hook for virtualization of long lists
 * Only renders items that are visible in the viewport
 */
export function useVirtualization<T>({
  items,
  itemHeight,
  overscan = 3,
  viewportHeight,
}: {
  items: T[];
  itemHeight: number;
  overscan?: number;
  viewportHeight: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(
    0,
    Math.floor(scrollPosition / itemHeight) - overscan
  );
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollPosition + viewportHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const onScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop);
  }, 50);

  const getItemStyle = (index: number) => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: itemHeight,
    transform: `translateY(${(startIndex + index) * itemHeight}px)`,
  });

  return {
    containerRef,
    visibleItems,
    totalHeight,
    startIndex,
    onScroll,
    getItemStyle,
  };
}
