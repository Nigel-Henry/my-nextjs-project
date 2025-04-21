export const defaultMetadata = {
  defaultTitle: 'MGZon E-commerce',
  titleTemplate: '%s | MGZon',
  description: 'Your ultimate shopping destination',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'MGZon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ibrahim_lasfar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'PQo-i3w5jhSFT2MCdZxg0HnFOHDQ-iYMLNg8rYeFtXM',
  },
}
