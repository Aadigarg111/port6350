import { useEffect, useState } from "react";

// Hook to handle client-side only effects
export const useClientEffect = (effect, deps = []) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      return effect();
    }
  }, deps);
};

// Hook to get client-side only state
export const useClientState = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return [value, setValue, isClient];
};

// Hook to handle window events safely
export const useWindowEvent = (event, handler, options = {}) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener(event, handler, options);
    return () => window.removeEventListener(event, handler, options);
  }, [event, handler, options]);
}; 