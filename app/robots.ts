import { MetadataRoute } from 'next'
import { getSetting } from '@/lib/actions/setting.actions'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const {
    site: { url },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/$', '/index.html', '/main.css', '/main.js'],
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/private/',
          '/account/',
          '/test/',
          '/staging/',
          '/wp-admin/',
          '/wp-login.php',
          '/tmp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/products/', '/blog/', '/categories/'],
        disallow: ['/tmp/', '/search/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/products/', '/blog/', '/categories/'],
        disallow: ['/search/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Anthropic-ai',
          'Claude-Web',
          'Google-Extended',
          'CCBot',
          'PerplexityBot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-products.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-images.xml`,
    ],
    host: baseUrl,
  }
}
