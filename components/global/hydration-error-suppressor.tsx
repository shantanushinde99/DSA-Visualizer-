"use client"

import { useEffect } from 'react'

/**
 * Component to suppress hydration warnings caused by browser extensions
 * that add attributes like fdprocessedid to DOM elements
 */
export function HydrationErrorSuppressor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error
      
      console.error = (...args: any[]) => {
        // Filter out hydration errors caused by browser extensions
        const errorString = args.join(' ')
        
        // Check if it's a hydration error about fdprocessedid or similar browser extension attributes
        if (
          errorString.includes('hydrated') ||
          errorString.includes('Hydration') ||
          errorString.includes('fdprocessedid') ||
          errorString.includes('server rendered HTML') ||
          errorString.includes('browser extension')
        ) {
          // Check if it's specifically about browser extension attributes
          if (
            errorString.includes('fdprocessedid') ||
            (errorString.includes('hydrated') && errorString.includes('attributes'))
          ) {
            // Suppress this error - it's from browser extensions
            return
          }
        }
        
        // Call the original console.error for other errors
        originalError.apply(console, args)
      }
      
      // Cleanup on unmount
      return () => {
        console.error = originalError
      }
    }
  }, [])

  return null
}
