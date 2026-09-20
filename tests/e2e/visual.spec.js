import { expect, test } from '@playwright/test'

const captures = [
  { route: '/', name: 'home-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/services', name: 'services-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/senior-living-communities', name: 'communities-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/about', name: 'about-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/contact', name: 'contact-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/', name: 'home-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/services', name: 'services-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/senior-living-communities', name: 'communities-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/about', name: 'about-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/contact', name: 'contact-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/', name: 'home-mobile', viewport: { width: 390, height: 844 } },
  { route: '/services', name: 'services-mobile', viewport: { width: 390, height: 844 } },
  { route: '/senior-living-communities', name: 'communities-mobile', viewport: { width: 390, height: 844 } },
  { route: '/about', name: 'about-mobile', viewport: { width: 390, height: 844 } },
  { route: '/contact', name: 'contact-mobile', viewport: { width: 390, height: 844 } },
]

test('captures the public responsive pages for visual review', async ({ page }) => {
  for (const capture of captures) {
    await page.setViewportSize(capture.viewport)
    await page.goto(capture.route)
    await expect(page.locator('main h1')).toBeVisible()
    await page.screenshot({ path: `test-results/visual/${capture.name}.png`, fullPage: true })
  }
})

test('captures the private comparison sheet', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/image-approval/comparison.html')
  await expect(page.getByRole('heading', { name: 'Private Image Approval' })).toBeVisible()
  await page.screenshot({ path: 'test-results/visual/private-image-comparison.png', fullPage: true })
})
