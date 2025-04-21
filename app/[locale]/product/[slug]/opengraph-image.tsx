import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'nodejs'
export const revalidate = 3600 // revalidate every hour
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              width: '200px',
              height: '200px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              borderRadius: '50%',
            }}
          >
            <span style={{ fontSize: '100px' }}>M</span>
          </div>
          <h1
            style={{
              fontSize: '60px',
              color: '#ffffff',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            MGZon
          </h1>
          <p
            style={{
              fontSize: '30px',
              color: '#cccccc',
              textAlign: 'center',
            }}
          >
            {decodeURIComponent(params.slug)}
          </p>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('OpenGraph Image Error:', error)
    return new ImageResponse(
      (
        <div
          style={{
            background: '#000000',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              color: '#ffffff',
            }}
          >
            MGZon
          </h1>
        </div>
      ),
      {
        ...size,
      }
    )
  }
}
