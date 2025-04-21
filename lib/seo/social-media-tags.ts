import { getSetting } from '../actions/setting.actions'

export async function generateSocialMediaTags(params: {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}) {
  const {
    site: { url: siteUrl, name },
  } = await getSetting()
  const baseUrl = siteUrl || 'https://hager-zon.vercel.app'

  const imageUrl = params.image
    ? params.image.startsWith('http')
      ? params.image
      : `${baseUrl}${params.image}`
    : `${baseUrl}/icons/icon-512x512.png`

  return {
    // Open Graph
    'og:title': params.title,
    'og:description': params.description,
    'og:image': imageUrl,
    'og:url': params.url || baseUrl,
    'og:type': params.type || 'website',
    'og:site_name': name,

    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': '@ibrahim_lasfar',
    'twitter:creator': '@ibrahim_lasfar',
    'twitter:title': params.title,
    'twitter:description': params.description,
    'twitter:image': imageUrl,

    // WhatsApp
    'og:whatsapp:title': params.title,
    'og:whatsapp:description': params.description,

    // Pinterest
    'pinterest:description': params.description,
    'pinterest:image': imageUrl,

    // LinkedIn
    'linkedin:title': params.title,
    'linkedin:description': params.description,
    'linkedin:image': imageUrl,
  }
}
