import { useEffect } from 'react'

const siteName = 'Naomi Gregory Salon, LLC'
const origin = 'https://www.naomigregorysalon.com'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

export default function PageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const pageTitle = title === siteName ? title : `${title} | ${siteName}`
    const url = `${origin}${path === '/' ? '' : path}`
    document.title = pageTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [description, path, title])
  return null
}
