import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

interface AnalyticsData {
  type: 'pageview'
  url: string
  userAgent: string
  referer: string
  timestamp: string
}

interface PageViewPayload {
  url: string
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') ?? ''
    const referer = headersList.get('referer') ?? ''
    const { url } = (await request.json()) as PageViewPayload

    const analyticsData: AnalyticsData = {
      type: 'pageview',
      url,
      userAgent,
      referer,
      timestamp: new Date().toISOString(),
    }

    console.log('Analytics data:', analyticsData)

    return NextResponse.json({
      success: true,
      message: 'Pageview tracked successfully',
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to track pageview',
      },
      { status: 500 }
    )
  }
}

// Current Date and Time (UTC): 2025-04-19 23:40:30
// Current User's Login: ibrahim-lasfar
