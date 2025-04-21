import https from 'https'
import { IncomingMessage } from 'http'

interface SearchEngines {
  [key: string]: string
  google: string
  bing: string
}

type SearchEngine = keyof SearchEngines

const SITEMAPS: string[] = [
  'https://hager-zon.vercel.app/sitemap.xml',
  'https://hager-zon.vercel.app/sitemap-products.xml',
  'https://hager-zon.vercel.app/sitemap-news.xml',
]

const SEARCH_ENGINES: SearchEngines = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap=',
}

async function submitSitemap(
  searchEngine: SearchEngine,
  sitemapUrl: string
): Promise<number> {
  const url = `${SEARCH_ENGINES[searchEngine]}${sitemapUrl}`
  const engineName = String(searchEngine).toUpperCase()

  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        console.log(
          `[${engineName}] Submitted ${sitemapUrl} - Status: ${res.statusCode}`
        )
        resolve(res.statusCode ?? 500)
      })
      .on('error', (error: Error) => {
        console.error(`Error submitting to ${engineName}:`, error.message)
        reject(error)
      })
  })
}

async function submitAllSitemaps(): Promise<void> {
  try {
    const engines = Object.keys(SEARCH_ENGINES) as SearchEngine[]

    for (const sitemap of SITEMAPS) {
      for (const engine of engines) {
        try {
          await submitSitemap(engine, sitemap)
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              `Failed to submit ${sitemap} to ${engine}:`,
              error.message
            )
          } else {
            console.error(`Failed to submit ${sitemap} to ${engine}:`, error)
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to submit sitemaps:', error.message)
    } else {
      console.error('Failed to submit sitemaps:', error)
    }
  }
}

// Execute if running directly
if (require.main === module) {
  submitAllSitemaps().catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Error executing submitAllSitemaps:', error.message)
    } else {
      console.error('Error executing submitAllSitemaps:', error)
    }
  })
}

export { submitSitemap, submitAllSitemaps, type SearchEngine }

// Current Date and Time (UTC): 2025-04-20 16:20:42
// Current User's Login: ibrahim-lasfar
