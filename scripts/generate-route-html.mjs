import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const siteName = 'Naomi Gregory Salon, LLC'
const origin = 'https://www.naomigregorysalon.com'
const baseHtml = readFileSync(path.join(dist, 'index.html'), 'utf8')

const routes = [
  {
    path: '/',
    title: `Metro Detroit Senior Living Salon Services | ${siteName}`,
    description: 'Naomi Gregory Salon, LLC provides professional, compassionate senior hair care for Metro Detroit senior living communities with an existing on-site salon.',
  },
  {
    path: '/senior-living-communities',
    title: `On-Site Salon Services for Metro Detroit Senior Living Communities | ${siteName}`,
    description: `${siteName} partners with Metro Detroit senior living communities that have an on-site salon and want compassionate, professional hair care for residents.`,
  },
  {
    path: '/services',
    title: `Senior Hair Care Services for Senior Living Communities | ${siteName}`,
    description: 'Explore compassionate shampoo sets, blowouts, haircuts, and chemical services provided inside Metro Detroit senior living community salons.',
  },
  {
    path: '/about',
    title: `About Dominique Pitts, Senior Living Cosmetologist | ${siteName}`,
    description: 'Meet Dominique Pitts, a licensed Metro Detroit cosmetologist with more than 22 years of experience and 18 years specializing in compassionate senior hair care.',
  },
  {
    path: '/contact',
    title: `Contact a Metro Detroit Senior Living Hairstylist | ${siteName}`,
    description: 'Contact Naomi Gregory Salon, LLC to discuss professional salon services for residents at a Metro Detroit senior living community with an existing on-site salon.',
  },
  {
    path: '/thank-you',
    title: `Thank You | ${siteName}`,
    description: `Thank you for contacting ${siteName}.`,
    robots: 'noindex, follow',
  },
  {
    path: '/404',
    title: `Page Not Found | ${siteName}`,
    description: `The requested ${siteName} page could not be found.`,
    robots: 'noindex, nofollow',
    is404: true,
  },
]

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function replaceMeta(html, key, value, attribute = 'name') {
  const escaped = escapeAttribute(value)
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*" \\/>`)
  const replacement = `<meta ${attribute}="${key}" content="${escaped}" />`
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`)
}

function renderRoute(route) {
  const url = `${origin}${route.path === '/' ? '' : route.path}`
  let html = baseHtml.replace(/<title>.*?<\/title>/, `<title>${escapeAttribute(route.title)}</title>`)
  html = replaceMeta(html, 'description', route.description)
  html = replaceMeta(html, 'robots', route.robots || 'index, follow')
  html = replaceMeta(html, 'og:title', route.title, 'property')
  html = replaceMeta(html, 'og:description', route.description, 'property')
  html = replaceMeta(html, 'og:url', url, 'property')
  html = replaceMeta(html, 'twitter:title', route.title)
  html = replaceMeta(html, 'twitter:description', route.description)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  return html
}

for (const route of routes) {
  const html = renderRoute(route)
  if (route.path === '/') {
    writeFileSync(path.join(dist, 'index.html'), html)
  } else if (route.is404) {
    writeFileSync(path.join(dist, '404.html'), html)
  } else {
    const routeDirectory = path.join(dist, route.path.slice(1))
    mkdirSync(routeDirectory, { recursive: true })
    writeFileSync(path.join(routeDirectory, 'index.html'), html)
  }
}

console.log(`Generated route-specific HTML metadata for ${routes.length} routes.`)
