import { getSetting } from '../actions/setting.actions'

export async function generateProductSchema(product: {
  name: string
  description: string
  images: string[]
  price: number
  currency: string
  sku: string
  category: string
  brand?: string
  rating?: {
    average: number
    count: number
  }
}) {
  const {
    site: { url, name: siteName },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${baseUrl}${img}`
    ),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || siteName,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/product/${product.sku}`,
      seller: {
        '@type': 'Organization',
        name: siteName,
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
      },
    }),
  }
}
