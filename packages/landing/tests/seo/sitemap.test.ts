import { describe, it, expect } from 'vitest'

import sitemap from '@/app/sitemap'

describe('Sitemap (PR #4)', () => {
    it('exports root / with priority 1.0', async () => {
        const result = await sitemap()
        expect(result.length).toBeGreaterThanOrEqual(1)
        const root = result.find((r) => r.url.includes('https://chatbot-wa.vercel.app/'))
        expect(root?.priority).toBe(1.0)
    })
})
