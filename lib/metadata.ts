import { Metadata } from 'next'
import { getSetting } from './actions/setting.actions'

interface ProductData {
  name: string
  description: string
  images: string[]
  price: number
  currency: string
  sku: string
  category: string
  brand?: string
}

export async function generateProductMetadata(
  productData: ProductData,
  locale: string
): Promise<Metadata> {
  const {
    site: { url, name: siteName },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  const formattedImages = productData.images.map((img) => ({
    url: img.startsWith('http') ? img : `${baseUrl}${img}`,
    width: 800,
    height: 600,
    alt: productData.name,
  }))

  return {
    title: productData.name,
    description: productData.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: productData.name,
      description: productData.description,
      images: formattedImages,
      locale,
      type: 'website',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: productData.name,
      description: productData.description,
      images: formattedImages,
      creator: '@mgzon',
      site: '@mgzon',
    },
    alternates: {
      canonical: `${baseUrl}/product/${productData.sku}`,
      languages: {
        [locale]: `${baseUrl}/${locale}/product/${productData.sku}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
    applicationName: siteName,
    keywords: [
      productData.name,
      productData.category,
      productData.brand || siteName,
      'shop',
      'ecommerce',
    ].join(', '),
    authors: [{ name: productData.brand || siteName }],
    creator: productData.brand || siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    other: {
      'product:price:amount': productData.price.toString(),
      'product:price:currency': productData.currency,
      'product:brand': productData.brand || siteName,
      'product:category': productData.category,
      'product:sku': productData.sku,
      'product:availability': 'in stock',
      'og:price:amount': productData.price.toString(),
      'og:price:currency': productData.currency,
    },
  }
}

// Current Date and Time (UTC): 2025-04-19 23:54:51
// Current User's Login: ibrahim-lasfar
