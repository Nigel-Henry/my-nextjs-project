import { getSetting } from '../actions/setting.actions'

export async function generateOrganizationSchema() {
  const {
    site: { url, name, description },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    description: description,
    url: baseUrl,
    logo: `${baseUrl}/icons/icon-512x512.png`,
    sameAs: [
      'https://twitter.com/ibrahim_lasfar',
      'https://github.com/Mark-Lasfar',
      // Add other social media profiles
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20121244617',
      contactType: 'customer service',
      email: 'support@hager-zon.vercel.app',
      availableLanguage: ['English', 'French', 'Arabic'],
    },
  }
}

export async function generateSearchBoxSchema() {
  const {
    site: { url, name },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
