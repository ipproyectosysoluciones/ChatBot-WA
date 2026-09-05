import fs from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'

const SITE_URL = 'https://chatbot-wa.vercel.app'
const APP_DIR = path.resolve(__dirname, '../../src/app')

describe('SEO Integration (PR #4 + PR #5)', () => {
    it('sitemap references production URL', () => {
        const src = fs.readFileSync(path.join(APP_DIR, 'sitemap.ts'), 'utf8')
        expect(src).toContain('chatbot-wa.vercel.app')
    })

    it('robots points to sitemap.xml', () => {
        const src = fs.readFileSync(path.join(APP_DIR, 'robots.ts'), 'utf8')
        expect(src).toContain('sitemap.xml')
    })

    it('canonical URL is set in layout metadata', () => {
        const src = fs.readFileSync(path.join(APP_DIR, 'layout.tsx'), 'utf8')
        expect(src).toContain('canonical')
    })

    it('OG image referenced in metadata', () => {
        const src = fs.readFileSync(path.join(APP_DIR, 'layout.tsx'), 'utf8')
        expect(src).toContain('og-image')
    })

    it('JSON-LD contains required schema.org keys', () => {
        const src = fs.readFileSync(path.join(APP_DIR, 'layout.tsx'), 'utf8')
        expect(src).toContain('@context')
        expect(src).toContain('SoftwareApplication')
        expect(src).toContain('name')
    })

    it('site URL constant is consistent across sitemap/robots', () => {
        const sitemap = fs.readFileSync(path.join(APP_DIR, 'sitemap.ts'), 'utf8')
        const robots = fs.readFileSync(path.join(APP_DIR, 'robots.ts'), 'utf8')
        expect(sitemap).toContain(SITE_URL)
        expect(robots).toContain(SITE_URL)
    })
})
