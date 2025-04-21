import { getSetting } from '@/lib/actions/setting.actions'

/**
 * Generate sitemap for the website
 * @returns {Promise<Response>} XML response containing sitemap
 */
export async function GET(): Promise<Response> {
  try {
    const {
      site: { url },
    } = await getSetting()
    const baseUrl = url || 'https://hager-zon.vercel.app'
    const date = new Date()

    const sitemapItems = [
      {
        url: baseUrl,
        lastModified: date,
      },
      {
        url: `${baseUrl}/sitemap.xml`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/sitemap-products.xml`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/sitemap-blog.xml`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/sitemap-images.xml`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/cart`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/checkout`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/account`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/orders`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/wishlist`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/terms-of-service`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/shipping-policy`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/return-policy`,
        lastModified: date,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: date,
      },
    ]

    // Convert to XML format
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapItems
        .map(
          (item) => `
        <url>
          <loc>${item.url}</loc>
          <lastmod>${item.lastModified.toISOString()}</lastmod>
        </url>
      `
        )
        .join('')}
    </urlset>`

    // Return as XML response
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}

// Current Date and Time (UTC): 2025-04-21 02:44:43
// Current User's Login: ibrahim-lasfar