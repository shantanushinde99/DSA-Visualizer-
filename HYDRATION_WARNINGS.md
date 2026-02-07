# Hydration Warnings - Browser Extensions

## Problem

You may see hydration warnings in the console that look like this:

```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
```

These warnings often show attributes like:
- `fdprocessedid` (from FasterDasher or similar extensions)
- Other extension-added attributes

## Cause

This is **NOT** a bug in the application. These warnings are caused by browser extensions that modify the DOM by adding custom attributes to HTML elements. Common culprits include:

- **FasterDasher** - Adds `fdprocessedid` attributes
- **Grammarly** - Adds various attributes to input elements
- **Password managers** - Add attributes to form elements
- **Translation extensions** - Modify text content
- Other DOM-manipulating extensions

## Solution

### For Users

1. **Disable the browser extension temporarily** (recommended for development)
2. **Use incognito/private mode** without extensions
3. **Ignore the warnings** - they don't affect functionality

### For Developers

The application has been configured to handle these warnings:

1. ✅ Added `suppressHydrationWarning` to `<html>` and `<body>` tags
2. ✅ Created `HydrationErrorSuppressor` component to filter console errors in development
3. ✅ Enabled React Strict Mode in Next.js config

## Technical Details

### What Happens

1. Server renders HTML without extension attributes
2. Browser extension injects attributes before React hydrates
3. React sees mismatch between server HTML and client DOM
4. Warning is logged (but application works fine)

### Why It's Safe to Suppress

- The attributes added by extensions don't break functionality
- They're added after initial render
- React reconciles the differences automatically
- User experience is not affected

## Testing Without Warnings

To test in a clean environment:

```bash
# Option 1: Use incognito mode
# Option 2: Create a new browser profile without extensions
# Option 3: Disable all extensions temporarily
```

## Related Links

- [React Hydration Documentation](https://react.dev/link/hydration-mismatch)
- [Next.js suppressHydrationWarning](https://nextjs.org/docs/messages/react-hydration-error)

## Note

If you see hydration warnings that are **NOT** related to browser extension attributes (like `fdprocessedid`), those should be investigated as they may indicate real issues in the code.
