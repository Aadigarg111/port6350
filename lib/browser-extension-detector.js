// Browser extension detector for hydration debugging
export const detectBrowserExtensions = () => {
  if (typeof window === "undefined") return;

  // Check for common browser extension attributes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const target = mutation.target;
        const attributeName = mutation.attributeName;
        
        // Common browser extension attribute patterns
        const extensionPatterns = [
          /^bis_/,
          /^__processed/,
          /^data-extension/,
          /^data-bis/,
          /^data-lastpass/,
          /^data-1password/,
          /^data-ublock/,
          /^data-adblock/
        ];
        
        if (extensionPatterns.some(pattern => pattern.test(attributeName))) {
          console.warn("Browser extension detected:", {
            element: target.tagName,
            attribute: attributeName,
            value: target.getAttribute(attributeName),
            timestamp: new Date().toISOString()
          });
        }
      }
    });
  });

  // Start observing after a delay to catch extensions that modify the DOM
  setTimeout(() => {
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: [
        "bis_*",
        "__processed*", 
        "data-extension*",
        "data-bis*",
        "data-lastpass*",
        "data-1password*",
        "data-ublock*",
        "data-adblock*"
      ]
    });
  }, 1000);

  return () => observer.disconnect();
}; 