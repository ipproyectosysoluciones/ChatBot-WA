import { test, expect } from '@playwright/test'

test.describe('SEO Verification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('title tag contains ChatBot-WA', async ({ page }) => {
        await expect(page).toHaveTitle(/ChatBot-WA/)
    })

    test('meta description is present', async ({ page }) => {
        const meta = page.locator('meta[name="description"]')
        await expect(meta).toHaveAttribute('content', /WhatsApp/)
    })

    test('canonical link present', async ({ page }) => {
        const link = page.locator('link[rel="canonical"]')
        await expect(link).toBeAttached()
    })

    test('Open Graph meta tags present', async ({ page }) => {
        await expect(page.locator('meta[property="og:title"]')).toBeAttached()
        await expect(page.locator('meta[property="og:description"]')).toBeAttached()
    })

    test('Twitter meta tags present', async ({ page }) => {
        await expect(page.locator('meta[name="twitter:card"]')).toBeAttached()
    })

    test('sitemap.xml accessible', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/sitemap.xml`)
        expect(response.ok()).toBeTruthy()
        const body = await response.text()
        expect(body).toContain('<urlset')
    })

    test('robots.txt accessible', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/robots.txt`)
        expect(response.ok()).toBeTruthy()
        const body = await response.text()
        expect(body).toContain('User-agent')
    })

    test('JSON-LD schema present in page', async ({ page }) => {
        const script = page.locator('script[type="application/ld+json"]')
        await expect(script).toBeAttached()
    })
})
