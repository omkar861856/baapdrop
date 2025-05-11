import React, { memo, ComponentType } from "react";

/**
 * Enhanced memoization for React components with deep prop comparison
 * @param Component Component to be memoized
 * @param propsAreEqual Optional custom comparison function
 */
export function createMemoComponent<P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.MemoExoticComponent<ComponentType<P>> {
  return memo(Component, propsAreEqual);
}

/**
 * HOC that adds rendering optimization to a component
 * @param Component Component to optimize
 */
export function withOptimization<P extends object>(
  Component: ComponentType<P>
): React.MemoExoticComponent<ComponentType<P>> {
  // Default deep comparison for props
  const arePropsEqual = (
    prevProps: Readonly<P>,
    nextProps: Readonly<P>
  ): boolean => {
    // Compare top-level props first for quick equality check
    if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
      return false;
    }

    // Deep comparison of prop values
    for (const key in prevProps) {
      const prev = prevProps[key as keyof P];
      const next = nextProps[key as keyof P];

      // Special handling for functions - compare stringified version
      if (typeof prev === "function" && typeof next === "function") {
        continue; // Skip function comparison as it's not reliable
      }

      // Handle arrays and objects
      if (
        typeof prev === "object" &&
        prev !== null &&
        typeof next === "object" &&
        next !== null
      ) {
        // Use JSON.stringify for deep comparison of objects/arrays
        // Only for small objects to avoid performance issues
        try {
          if (JSON.stringify(prev) !== JSON.stringify(next)) {
            return false;
          }
        } catch (e) {
          // Fallback if stringify fails
          return false;
        }
      } else if (prev !== next) {
        return false;
      }
    }

    return true;
  };

  // Optimize component name for debugging
  const displayName = Component.displayName || Component.name || "Component";
  const OptimizedComponent = memo(Component, arePropsEqual);
  OptimizedComponent.displayName = `Optimized(${displayName})`;

  return OptimizedComponent;
}
