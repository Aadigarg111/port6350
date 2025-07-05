// Hydration debugging utility
export const debugHydration = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    // Log hydration mismatches
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === "string" && args[0].includes("hydration")) {
        console.warn("Hydration mismatch detected:", ...args);
      } else {
        originalConsoleError(...args);
      }
    };

    // Monitor for browser extension modifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const target = mutation.target;
          const attributeName = mutation.attributeName;
          
          // Check for browser extension attributes
          if (attributeName && (
            attributeName.includes("bis_") ||
            attributeName.includes("__processed") ||
            attributeName.includes("data-extension")
          )) {
            console.warn("Browser extension attribute detected:", {
              element: target.tagName,
              attribute: attributeName,
              value: target.getAttribute(attributeName)
            });
          }
        }
      });
    });

    // Start observing after a short delay
    setTimeout(() => {
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["bis_*", "__processed*", "data-extension*"]
      });
    }, 1000);

    return () => {
      observer.disconnect();
      console.error = originalConsoleError;
    };
  }
  
  return () => {};
}; 