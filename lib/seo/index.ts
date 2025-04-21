export * from './breadcrumbs-schema'
export * from './category-schema'
export * from './product-schema'
export * from './rich-snippets'
export * from './social-media-tags'

export const SEO_CONFIG = {
  defaultLocale: 'en-US',
  supportedLocales: ['en-US', 'fr', 'ar'],
  defaultTitle: 'MGZon E-commerce',
  titleTemplate: '%s | MGZon',
  description: 'Your ultimate shopping destination',
  canonicalUrl: 'https://hager-zon.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MGZon',
  },
  twitter: {
    handle: '@ibrahim_lasfar',
    site: '@ibrahim_lasfar',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/icons/icon-192x192.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/icon-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}
