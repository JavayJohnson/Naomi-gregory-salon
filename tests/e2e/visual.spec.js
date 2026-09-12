import { expect, test } from '@playwright/test'

const captures = [
  { route: '/', name: 'home-desktop', viewport: { width: 1440, height: 900 } },
  { route: '/about', name: 'about-tablet', viewport: { width: 768, height: 1024 } },
  { route: '/contact', name: 'contact-small-mobile', viewport: { width: 320, height: 700 } },
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
