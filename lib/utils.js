import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utility to check if we're on the client side
export const isClient = typeof window !== "undefined";

// Utility to get a stable random seed for client-side rendering
export const getStableRandom = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return () => {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };
};

// Utility to get current year safely
export const getCurrentYear = () => {
  if (isClient) {
    return new Date().getFullYear();
  }
  return 2024; // Fallback for SSR
};

// Utility to get current year that updates on client only
export const getDynamicYear = () => {
  return 2024; // Static for SSR, will be updated on client
};
