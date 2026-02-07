"use client"

import { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

/**
 * Development notice about hydration warnings caused by browser extensions
 * Only shows in development mode
 */
export function DevNotice() {
  const [isDismissed, setIsDismissed] = useState(true)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      // Check if user has dismissed the notice before
      const dismissed = localStorage.getItem('hydration-notice-dismissed')
      if (!dismissed) {
        setIsDismissed(false)
        setShowNotice(true)
      }
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('hydration-notice-dismissed', 'true')
    setIsDismissed(true)
  }

  if (!showNotice || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="flex items-start justify-between gap-2">
          <div className="flex-1 text-sm">
            <p className="font-semibold mb-1">Development Notice</p>
            <p className="text-xs text-muted-foreground">
              Seeing hydration warnings? They're likely caused by browser extensions 
              (e.g., FasterDasher). These don't affect functionality. 
              See <code className="text-xs">HYDRATION_WARNINGS.md</code> for details.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss notice"
          >
            <X className="h-4 w-4" />
          </button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
