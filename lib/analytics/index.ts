interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
}

interface AnalyticsResponse {
  success?: boolean
  error?: string
}

export const trackPageView = async (url: string): Promise<void> => {
  try {
    const response = await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    const data: AnalyticsResponse = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Analytics request failed')
    }
  } catch (error) {
    console.error('Failed to track pageview:', error)
  }
}

export const trackEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    const response = await fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })

    const data: AnalyticsResponse = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Analytics request failed')
    }
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}
