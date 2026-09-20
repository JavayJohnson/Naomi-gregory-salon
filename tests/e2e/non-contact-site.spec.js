import { expect, test } from '@playwright/test'

const siteName = 'Naomi Gregory Salon, LLC'
const siteOrigin = 'https://www.naomigregorysalon.com'

const publicPages = [
  {
    name: 'home',
    path: '/',
    heading: 'Professional Salon Services for Senior Living Communities',
    title: `Metro Detroit Senior Living Salon Services | ${siteName}`,
    canonical: siteOrigin,
    description: 'Naomi Gregory Salon, LLC provides professional, compassionate senior hair care for Metro Detroit senior living communities with an existing on-site salon.',
  },
  {
    name: 'senior living communities',
    path: '/senior-living-communities',
    heading: 'On-Site Salon Services for Senior Living Communities',
    title: `On-Site Salon Services for Metro Detroit Senior Living Communities | ${siteName}`,
    canonical: `${siteOrigin}/senior-living-communities`,
    description: `${siteName} partners with Metro Detroit senior living communities that have an on-site salon and want compassionate, professional hair care for residents.`,
  },
  {
    name: 'services',
    path: '/services',
    heading: 'Senior Hair Care Services',
    title: `Senior Hair Care Services for Senior Living Communities | ${siteName}`,
    canonical: `${siteOrigin}/services`,
    description: 'Explore compassionate shampoo sets, blowouts, haircuts, and chemical services provided inside Metro Detroit senior living community salons.',
  },
  {
    name: 'about',
    path: '/about',
    heading: 'About Dominique',
    title: `About Dominique Pitts, Senior Living Cosmetologist | ${siteName}`,
    canonical: `${siteOrigin}/about`,
    description: 'Meet Dominique Pitts, a licensed Metro Detroit cosmetologist with more than 22 years of experience and 18 years specializing in compassionate senior hair care.',
  },
  {
    name: 'contact page',
    path: '/contact',
    heading: 'Contact Us',
    title: `Contact a Metro Detroit Senior Living Hairstylist | ${siteName}`,
    canonical: `${siteOrigin}/contact`,
    description: 'Contact Naomi Gregory Salon, LLC to discuss professional salon services for residents at a Metro Detroit senior living community with an existing on-site salon.',
  },
  {
    name: 'thank-you page opened directly',
    path: '/thank-you',
    heading: 'Thank You',
    title: `Thank You | ${siteName}`,
    canonical: `${siteOrigin}/thank-you`,
    description: `Thank you for contacting ${siteName}.`,
  },
  {
    name: 'not-found route',
    path: '/missing-page',
    heading: 'Page Not Found',
    title: `Page Not Found | ${siteName}`,
    canonical: `${siteOrigin}/404`,
    description: `The requested ${siteName} page could not be found.`,
  },
]

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'landscape tablet', width: 1024, height: 768 },
  { name: 'portrait tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small mobile', width: 320, height: 700 },
]

for (const pageDetails of publicPages) {
  test(`${pageDetails.name} loads with correct content and metadata`, async ({ page }) => {
    const pageErrors = []
    const consoleErrors = []
    const failedRequests = []

    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`))

    const response = await page.goto(pageDetails.path)
    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('heading', { level: 1, name: pageDetails.heading })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page).toHaveTitle(pageDetails.title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', pageDetails.description)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', pageDetails.path === '/thank-you' ? 'noindex, follow' : pageDetails.name === 'not-found route' ? 'noindex, nofollow' : 'index, follow')
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', pageDetails.title)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', pageDetails.canonical)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', pageDetails.canonical)

    expect(pageErrors).toEqual([])
    expect(consoleErrors).toEqual([])
    expect(failedRequests).toEqual([])
  })
}

test('primary navigation works and clearly identifies the active page', async ({ page }) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' })

  await expect(navigation.getByRole('link')).toHaveCount(5)
  await expect(navigation.getByRole('link', { name: 'Home' })).toHaveClass(/active/)

  await navigation.getByRole('link', { name: 'Communities' }).click()
  await expect(page).toHaveURL(/\/senior-living-communities$/)
  await expect(page.getByRole('heading', { level: 1, name: 'On-Site Salon Services for Senior Living Communities' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Communities' })).toHaveClass(/active/)

  await navigation.getByRole('link', { name: 'Services' }).click()
  await expect(page).toHaveURL(/\/services$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Senior Hair Care Services' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Services' })).toHaveClass(/active/)

  await navigation.getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1, name: 'About Dominique' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'About' })).toHaveClass(/active/)

  await navigation.getByRole('link', { name: 'Contact Us' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Contact Us' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Contact Us' })).toHaveClass(/active/)
})

test('updated home, services, communities, and about content render correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.tagline')).toHaveCount(0)
  await expect(page.getByText(/22\+ years as a licensed cosmetologist/i)).toBeVisible()
  const homePortrait = page.getByRole('img', { name: `Owner and professional cosmetologist at ${siteName}.` })
  await expect(homePortrait).toBeVisible()
  expect(await homePortrait.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true)
  const contactButton = page.getByRole('link', { name: 'Call or Text Us' })
  await expect(contactButton).toHaveAttribute('href', '/contact')
  await contactButton.click()
  await expect(page).toHaveURL(/\/contact$/)

  await page.goto('/services')
  await expect(page.locator('.service-detail-card')).toHaveCount(5)
  for (const service of ['Shampoo Sets', 'Blowouts', "Women's Haircuts", "Men's Haircuts", 'Chemical Services']) {
    await expect(page.getByRole('heading', { level: 3, name: service, exact: true })).toBeVisible()
  }
  await expect(page.locator('.service-detail-card p')).toHaveCount(0)

  await page.goto('/senior-living-communities')
  await expect(page.getByText('Brings more than 18 years of specialized experience serving older adults, including residents living with dementia and Alzheimer\'s disease.')).toBeVisible()
  await expect(page.locator('.faq-list article')).toHaveCount(3)
  await expect(page.getByRole('link', { name: 'Contact Naomi Gregory Salon, LLC about your community' })).toHaveAttribute('href', '/contact')

  await page.goto('/about')
  const aboutPortrait = page.getByRole('img', { name: `Dominique Pitts, owner and professional cosmetologist at ${siteName}.` })
  expect(await aboutPortrait.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true)
})

test('portrait images remain compact and uncropped', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  for (const route of ['/', '/about']) {
    await page.goto(route)
    const portrait = page.locator('.portrait-image')
    const presentation = await portrait.evaluate((image) => ({
      width: image.getBoundingClientRect().width,
      objectFit: getComputedStyle(image).objectFit,
      ratio: image.getBoundingClientRect().width / image.getBoundingClientRect().height,
      naturalRatio: image.naturalWidth / image.naturalHeight,
    }))

    expect(presentation.width).toBeLessThanOrEqual(route === '/' ? 324 : 341)
    expect(presentation.objectFit).toBe('contain')
    expect(Math.abs(presentation.ratio - presentation.naturalRatio)).toBeLessThan(0.01)
  }
})

test('published phone and email links are consistent without submitting the form', async ({ page }) => {
  await page.goto('/contact')
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: '248-956-0236' })).toHaveAttribute('href', 'tel:+12489560236')
  await expect(main.getByRole('link', { name: 'info@naomigregorysalon.com' })).toHaveAttribute('href', 'mailto:info@naomigregorysalon.com')

  const footer = page.locator('footer')
  await expect(footer.getByRole('link', { name: '248-956-0236' })).toHaveAttribute('href', 'tel:+12489560236')
  await expect(footer.getByRole('link', { name: 'info@naomigregorysalon.com' })).toHaveAttribute('href', 'mailto:info@naomigregorysalon.com')
  await expect(footer).toContainText(`${siteName}. All rights reserved.`)
})

test('keyboard skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  await skipLink.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('direct thank-you visits do not claim that an unsubmitted message succeeded', async ({ page }) => {
  await page.goto('/thank-you')
  await expect(page.getByText(/shown only after the contact form is accepted/i)).toBeVisible()
  await expect(page.getByText(/message was submitted successfully/i)).toHaveCount(0)
})

test('not-found page returns visitors to the home page', async ({ page }) => {
  await page.goto('/missing-page')
  await page.getByRole('link', { name: 'Return Home' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Professional Salon Services for Senior Living Communities' })).toBeVisible()
})

for (const viewport of viewports) {
  test(`${viewport.name} layouts have no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize(viewport)

    for (const route of ['/', '/senior-living-communities', '/services', '/about', '/contact', '/missing-page']) {
      await page.goto(route)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${route} overflows at ${viewport.width}px`).toBeLessThanOrEqual(1)
    }
  })
}

for (const viewport of viewports) {
  test(`${viewport.name} keeps the navigation ribbon visible while scrolling`, async ({ page }) => {
    await page.setViewportSize(viewport)

    for (const route of ['/', '/senior-living-communities', '/services', '/about', '/contact']) {
      await page.goto(route)
      const header = page.locator('.site-header')
      await expect(header).toBeVisible()

      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))

      expect(await page.evaluate(() => window.scrollY), `${route} should be scrollable at ${viewport.width}px`).toBeGreaterThan(0)
      expect(Math.abs(await header.evaluate((element) => element.getBoundingClientRect().top)), `${route} header should remain at the top at ${viewport.width}px`).toBeLessThanOrEqual(1)
      await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
    }
  })
}

test('mobile navigation remains visible without a hidden menu dependency', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  await page.goto('/about')
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' })

  await expect(navigation).toBeVisible()
  for (const linkName of ['Home', 'Communities', 'Services', 'About', 'Contact Us']) {
    await expect(navigation.getByRole('link', { name: linkName })).toBeVisible()
  }
  await expect(page.getByRole('button', { name: /navigation menu/i })).toHaveCount(0)
})

test('robots, sitemap, favicon, and social preview assets are available', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).toContain('Sitemap: https://www.naomigregorysalon.com/sitemap.xml')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  const sitemapBody = await sitemap.text()
  expect(sitemapBody).toContain('<loc>https://www.naomigregorysalon.com/</loc>')
  expect(sitemapBody).toContain('<loc>https://www.naomigregorysalon.com/senior-living-communities</loc>')
  expect(sitemapBody).toContain('<loc>https://www.naomigregorysalon.com/services</loc>')
  expect(sitemapBody).toContain('<loc>https://www.naomigregorysalon.com/about</loc>')
  expect(sitemapBody).toContain('<loc>https://www.naomigregorysalon.com/contact</loc>')

  for (const asset of ['/favicon.png', '/og.webp', '/images/owner-professional-portrait.webp']) {
    const response = await request.get(asset)
    expect(response.ok(), `${asset} should load successfully`).toBe(true)
    expect(Number(response.headers()['content-length'] || 1)).toBeGreaterThan(0)
  }
})
