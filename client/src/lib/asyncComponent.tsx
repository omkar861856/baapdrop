import React, { ComponentType, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

/**
 * Minimal loading spinner component for all async component loading
 */
export const DefaultFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <Spinner size="lg" />
  </div>
);

/**
 * Create an async component with code-splitting and loading state
 * @param importFn Dynamic import function for the component
 * @param fallback Optional custom loading component
 */
export function createAsyncComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback = <DefaultFallback />
) {
  const LazyComponent = React.lazy(importFn);

  return function AsyncComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Preloads a component to improve perceived performance
 * Call this function before a user might navigate to a component
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): Promise<{ default: T }> {
  return importFn();
}

/**
 * Creates a preloadable component that also exposes a preload method
 */
export function createPreloadableComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback = <DefaultFallback />
) {
  const AsyncComp = createAsyncComponent(importFn, fallback);
  // Add the preload method to the component
  (AsyncComp as any).preload = () => preloadComponent(importFn);
  return AsyncComp;
}
