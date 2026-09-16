import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'landscape-tablet', width: 1024, height: 768 },
  { name: 'portrait-tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small-mobile', width: 320, height: 700 },
]

test('all routes load directly', async ({ page }) => {
  for (const [route, heading] of [['/', 'Professional Salon Services for Metro Detroit Senior Living Communities'], ['/senior-living-communities', 'On-Site Salon Services for Senior Living Communities'], ['/services', 'Senior Hair Care Services'], ['/about', 'About Dominique'], ['/contact', 'Contact Us'], ['/thank-you', 'Thank You']]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }
})

for (const viewport of viewports) {
  test(`${viewport.name} has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize(viewport)
    for (const route of ['/', '/senior-living-communities', '/services', '/about', '/contact']) {
      await page.goto(route)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow).toBeLessThanOrEqual(1)
    }
  })
}

test('mobile shows all navigation tabs without a hamburger menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/about')
  const navigation = page.getByRole('navigation', { name: 'Primary navigation' })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Home' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Communities' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Services' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'About' })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Contact' })).toBeVisible()
  await expect(page.getByRole('button', { name: /navigation menu/i })).toHaveCount(0)
})

test('contact form redirects on success but not failure', async ({ page }) => {
  await page.route('**/api/contact.php', async (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }))
  await page.goto('/contact')
  await page.getByLabel(/First Name/).fill('Javay')
  await page.getByLabel(/Last Name/).fill('Johnson')
  await page.getByLabel(/Email Address/).fill('javay@example.com')
  await page.getByLabel(/Message/).fill('Please contact me.')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page).toHaveURL(/\/thank-you$/)
  await expect(page.getByText(/submitted successfully/i)).toBeVisible()

  await page.route('**/api/contact.php', async (route) => route.fulfill({ status: 500, contentType: 'application/json', body: '{"success":false,"message":"Please call us."}' }))
  await page.goto('/contact')
  await page.getByLabel(/First Name/).fill('Javay')
  await page.getByLabel(/Last Name/).fill('Johnson')
  await page.getByLabel(/Email Address/).fill('javay@example.com')
  await page.getByLabel(/Telephone Number/).fill('+1 (248) 956-0236')
  await page.getByLabel(/Message/).fill('Please contact me.')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByText('Please call us.')).toBeVisible()
})
