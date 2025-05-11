import { useEffect, useState } from "react";

interface PerformanceMetrics {
  dcl: number; // DOMContentLoaded
  load: number; // Load event
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
}

/**
 * Tracks Web Vitals and other performance metrics
 * Can be used in development to monitor performance improvements
 */
export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    dcl: 0,
    load: 0,
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.performance ||
      !window.performance.timing
    ) {
      return;
    }

    // Standard timing metrics
    const timing = window.performance.timing;
    const navStart = timing.navigationStart;

    // Calculate initial timing metrics
    setMetrics((prev) => ({
      ...prev,
      dcl: timing.domContentLoadedEventStart - navStart,
      load: timing.loadEventStart - navStart,
    }));

    // Track First Contentful Paint
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
        }
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
        }
        if (entry.entryType === "first-input") {
          setMetrics((prev) => ({
            ...prev,
            fid: (entry as any).processingStart - entry.startTime,
          }));
        }
        if (
          entry.entryType === "layout-shift" &&
          !(entry as any).hadRecentInput
        ) {
          const currentCLS = metrics.cls || 0;
          setMetrics((prev) => ({
            ...prev,
            cls: currentCLS + (entry as any).value,
          }));
        }
      }
    });

    // Observe various performance entries
    observer.observe({
      entryTypes: [
        "paint",
        "largest-contentful-paint",
        "first-input",
        "layout-shift",
      ],
    });

    // Toggle display with keyboard shortcut (Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "P") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  // Simplified display for development only
  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 text-xs font-mono z-50 rounded-tl-lg">
      <h3 className="font-bold mb-2">Performance</h3>
      <table>
        <tbody>
          <tr>
            <td className="pr-4">DOM Content Loaded:</td>
            <td className={getColorClass(metrics.dcl)}>{metrics.dcl}ms</td>
          </tr>
          <tr>
            <td className="pr-4">Load:</td>
            <td className={getColorClass(metrics.load)}>{metrics.load}ms</td>
          </tr>
          {metrics.fcp !== null && (
            <tr>
              <td className="pr-4">First Paint:</td>
              <td className={getColorClass(metrics.fcp)}>
                {Math.round(metrics.fcp)}ms
              </td>
            </tr>
          )}
          {metrics.lcp !== null && (
            <tr>
              <td className="pr-4">Largest Paint:</td>
              <td className={getColorClass(metrics.lcp, true)}>
                {Math.round(metrics.lcp)}ms
              </td>
            </tr>
          )}
          {metrics.fid !== null && (
            <tr>
              <td className="pr-4">Input Delay:</td>
              <td className={getColorClass(metrics.fid)}>
                {Math.round(metrics.fid)}ms
              </td>
            </tr>
          )}
          {metrics.cls !== null && (
            <tr>
              <td className="pr-4">Layout Shift:</td>
              <td className={getColorClass(metrics.cls * 100, false, true)}>
                {metrics.cls.toFixed(3)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-2 text-[10px] opacity-70">Press Shift+P to toggle</div>
    </div>
  );
}

// Helper to color metrics based on performance
function getColorClass(
  value: number | null,
  isLCP = false,
  isCLS = false
): string {
  if (value === null) return "";

  if (isCLS) {
    // CLS thresholds
    if (value <= 10) return "text-green-400";
    if (value <= 25) return "text-yellow-400";
    return "text-red-400";
  }

  if (isLCP) {
    // LCP thresholds
    if (value < 2500) return "text-green-400";
    if (value < 4000) return "text-yellow-400";
    return "text-red-400";
  }

  // General performance thresholds
  if (value < 200) return "text-green-400";
  if (value < 1000) return "text-yellow-400";
  return "text-red-400";
}
