# Hydration Mismatch Fixes

This document outlines the fixes implemented to resolve hydration mismatch errors in the Next.js portfolio application.

## Problem

The application was experiencing hydration mismatch errors due to:

1. **Browser Extensions**: Extensions like ad blockers, password managers, and other tools were adding attributes like `bis_skin_checked="1"` to HTML elements
2. **Client-Side Only Code**: Components using `Math.random()`, `Date.now()`, and `window` object without proper SSR handling
3. **Dynamic Content**: Content that differed between server and client rendering
4. **Year Display**: The current year was different between server (2024) and client (2025)

## Solutions Implemented

### 1. Suppress Hydration Warnings

Added `suppressHydrationWarning={true}` to the body element in `app/layout.js` to prevent warnings from browser extensions.

### 2. Client-Only Wrapper Component

Created `components/ClientOnly.jsx` to wrap components that should only render on the client side:

```jsx
import ClientOnly from "./ClientOnly";

// Usage
<ClientOnly>
  {new Date().getFullYear()}
</ClientOnly>
```

### 3. Utility Functions

Added utility functions in `lib/utils.js`:

- `isClient`: Check if code is running on client side
- `getCurrentYear()`: Safely get current year with SSR fallback
- `getStableRandom()`: Generate stable random numbers for consistent rendering

### 4. Custom Hooks

Created `lib/hooks.js` with hooks for client-side only effects:

- `useClientEffect()`: Run effects only on client side
- `useClientState()`: State that only updates on client side
- `useWindowEvent()`: Safely handle window events

### 5. Component Updates

Updated components to use client-side only features safely:

- **Hero.jsx**: Used `useClientEffect()` for canvas initialization
- **Footer.jsx**: Used `getCurrentYear()` utility for dynamic year
- **ProjectModal.jsx**: Improved GSAP import handling

### 6. Next.js Configuration

Updated `next.config.mjs` to optimize package imports and enable experimental features.

### 7. Debugging Tools

Created `lib/hydration-debug.js` to monitor and log hydration issues in development.

### 8. Browser Extension Detection

Created `lib/browser-extension-detector.js` to identify which browser extensions are causing hydration issues.

### 9. Comprehensive Wrapper

Created `HydrationSafe` component to wrap the entire application and suppress hydration warnings.

### 10. Root Level Suppression

Added `suppressHydrationWarning` to the body element and main content wrapper to handle browser extension interference.

## Usage Examples

### For Dynamic Content
```jsx
// Instead of this (causes hydration mismatch)
<p>© {new Date().getFullYear()} Aadi</p>

// Use this
<p>© <DynamicYear /> Aadi</p>
```

### For Client-Only Effects
```jsx
// Instead of this
useEffect(() => {
  if (typeof window !== "undefined") {
    // client code
  }
}, []);

// Use this
useClientEffect(() => {
  // client code
}, []);
```

### For Random Content
```jsx
// Instead of this
const randomValue = Math.random();

// Use this
const stableRandom = getStableRandom("seed");
const randomValue = stableRandom();
```

## Testing

To test the fixes:

1. Run the development server: `npm run dev`
2. Open browser dev tools
3. Check console for hydration warnings
4. Test with browser extensions enabled/disabled

## Browser Extensions

Common extensions that can cause hydration mismatches:
- Ad blockers (uBlock Origin, AdBlock Plus)
- Password managers (LastPass, 1Password)
- Dark mode extensions
- Accessibility extensions
- Developer tools extensions

The `suppressHydrationWarning` attribute helps prevent these from causing errors, while the debugging tools help identify which extensions are causing issues.

## Best Practices

1. **Always check for client-side availability** before using browser APIs
2. **Use stable values** for SSR when possible
3. **Wrap dynamic content** in ClientOnly components
4. **Use utility functions** for common client-side operations
5. **Monitor hydration issues** in development
6. **Test with various browser extensions** enabled 