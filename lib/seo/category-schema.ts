import { getSetting } from '../actions/setting.actions'

export async function generateCategorySchema(category: {
  name: string
  description: string
  products: Array<{
    name: string
    url: string
  }>
}) {
  const {
    site: { url, name: siteName },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: baseUrl,
    },
    hasPart: category.products.map((product) => ({
      '@type': 'Product',
      name: product.name,
      url: product.url.startsWith('http')
        ? product.url
        : `${baseUrl}${product.url}`,
    })),
  }
}
