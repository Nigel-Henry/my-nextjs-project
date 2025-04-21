'use client'

import { useEffect } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  id?: string
  startTime?: number
  processingStart?: number
  entryType?: string
}

interface LayoutShift extends PerformanceEntry {
  value: number
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
}

export default function PerformanceMetrics() {
  useEffect(() => {
    const reportWebVitals = (metric: PerformanceMetric) => {
      console.log(metric)
    }

    let cls = 0
    let fid = 0
    let lcp = 0

    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              cls += (entry as LayoutShift).value
            }
          }
          reportWebVitals({ name: 'CLS', value: cls })
        }).observe({ type: 'layout-shift', buffered: true })

        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'first-input') {
              fid =
                (entry as PerformanceEventTiming).processingStart -
                entry.startTime
            }
          }
          reportWebVitals({ name: 'FID', value: fid })
        }).observe({ type: 'first-input', buffered: true })

        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              lcp = entry.startTime
            }
          }
          reportWebVitals({ name: 'LCP', value: lcp })
        }).observe({ type: 'largest-contentful-paint', buffered: true })
      } catch (error) {
        console.error('Performance monitoring error:', error)
      }
    }

    // Cleanup function
    return () => {
      // Clean up observers if needed
    }
  }, [])

  return null
}
