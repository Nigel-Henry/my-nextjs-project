import { routing } from '@/i18n/routing'
import { getSetting } from '../actions/setting.actions'

export async function generateHreflangLinks(path: string) {
  const {
    site: { url },
  } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'

  return routing.locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale,
    href: `${baseUrl}/${locale}${path}`,
  }))
}

export async function generateHreflangTags(path: string) {
  const links = await generateHreflangLinks(path)

  return links.map((link) => ({
    tag: 'link',
    props: {
      rel: link.rel,
      hrefLang: link.hrefLang,
      href: link.href,
    },
  }))
}
