import { getSetting } from '../actions/setting.actions'

export async function generateBreadcrumbSchema(
  items: {
    name: string
    url: string
  }[]
) {
  const {
    site: { url, name: siteName },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteName,
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
      })),
    ],
  }
}
