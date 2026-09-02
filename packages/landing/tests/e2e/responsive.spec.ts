import { test, expect } from '@playwright/test'

const viewports = [
    { name: 'mobile-320', width: 320, height: 568 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1024', width: 1024, height: 768 },
] as const

for (const vp of viewports) {
    test.describe(`Responsive @ ${vp.name} (${vp.width}x${vp.height})`, () => {
        test.use({ viewport: { width: vp.width, height: vp.height } })

        test('page renders without horizontal overflow', async ({ page }) => {
            await page.goto('/')
            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
            const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
            expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
        })

        test('h1 is visible', async ({ page }) => {
            await page.goto('/')
            const h1 = page.getByRole('heading', { level: 1 })
            await expect(h1).toBeVisible()
        })

        test('all sections render (hero, features, pricing, cta, footer)', async ({ page }) => {
            await page.goto('/')
            await expect(page.locator('section#hero')).toBeVisible()
            await expect(page.locator('section#features')).toBeAttached()
            await expect(page.locator('section#pricing')).toBeAttached()
            await expect(page.locator('section#cta')).toBeAttached()
            await expect(page.locator('footer')).toBeAttached()
        })
    })
}
