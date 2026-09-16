import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const origin = 'https://www.naomigregorysalon.com'

const pages = [
  { file: 'index.html', canonical: origin, robots: 'index, follow' },
  { file: 'senior-living-communities/index.html', canonical: `${origin}/senior-living-communities`, robots: 'index, follow' },
  { file: 'services/index.html', canonical: `${origin}/services`, robots: 'index, follow' },
  { file: 'about/index.html', canonical: `${origin}/about`, robots: 'index, follow' },
  { file: 'contact/index.html', canonical: `${origin}/contact`, robots: 'index, follow' },
  { file: 'thank-you/index.html', canonical: `${origin}/thank-you`, robots: 'noindex, follow' },
  { file: '404.html', canonical: `${origin}/404`, robots: 'noindex, nofollow' },
]

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

for (const page of pages) {
  const filePath = path.join(dist, page.file)
  assert(existsSync(filePath), `Missing generated route HTML: ${page.file}`)
  const html = readFileSync(filePath, 'utf8')
  assert(/<title>[^<]+<\/title>/.test(html), `${page.file} is missing a title.`)
  assert(/<meta name="description" content="[^"]+" \/>/.test(html), `${page.file} is missing a meta description.`)
  assert(html.includes(`<meta name="robots" content="${page.robots}" />`), `${page.file} has incorrect robots metadata.`)
  assert(html.includes(`<link rel="canonical" href="${page.canonical}" />`), `${page.file} has an incorrect canonical URL.`)
  assert(html.includes(`<meta property="og:url" content="${page.canonical}" />`), `${page.file} has an incorrect Open Graph URL.`)
}

const homeHtml = readFileSync(path.join(dist, 'index.html'), 'utf8')
const jsonLdMatch = homeHtml.match(/<script type="application\/ld\+json">\s*(.*?)\s*<\/script>/s)
assert(jsonLdMatch, 'Structured data is missing from the home page.')
const structuredData = JSON.parse(jsonLdMatch[1])
assert(Array.isArray(structuredData['@graph']), 'Structured data must contain an @graph.')
assert(structuredData['@graph'].some((item) => item['@type'] === 'Organization' && item.areaServed?.name === 'Metro Detroit, Michigan'), 'Structured data is missing the Metro Detroit service area.')

const sitemap = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8')
for (const url of ['/', '/senior-living-communities', '/services', '/about', '/contact']) {
  const expected = `${origin}${url === '/' ? '/' : url}`
  assert(sitemap.includes(`<loc>${expected}</loc>`), `Sitemap is missing ${expected}.`)
}
assert(!sitemap.includes('/thank-you'), 'The noindex Thank You page must not be in the sitemap.')
assert(!sitemap.includes('/404'), 'The 404 page must not be in the sitemap.')

const socialImage = await sharp(path.join(dist, 'og.webp')).metadata()
assert(socialImage.format === 'webp' && socialImage.width === 1200 && socialImage.height === 630, 'Social image must be a 1200x630 WebP.')

console.log(`SEO validation passed for ${pages.length} route documents, structured data, sitemap, and social image.`)
