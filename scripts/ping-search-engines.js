const https = require('https')

const SITE_URL = 'https://hager-zon.vercel.app'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

const searchEngines = [
  `https://www.google.com/ping?sitemap=${SITEMAP_URL}`,
  `https://www.bing.com/ping?sitemap=${SITEMAP_URL}`,
]

searchEngines.forEach((url) => {
  https
    .get(url, (res) => {
      console.log(`Pinged ${url} - Status: ${res.statusCode}`)
    })
    .on('error', (e) => {
      console.error(`Error pinging ${url}: ${e.message}`)
    })
})
