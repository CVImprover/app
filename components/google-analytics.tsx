'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
}

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void
  }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    
    const url = pathname + searchParams.toString()
    
    // Send pageview with gtag
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return null
}
