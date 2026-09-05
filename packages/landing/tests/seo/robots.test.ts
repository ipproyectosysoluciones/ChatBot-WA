import { describe, it, expect } from 'vitest'

import robots from '@/app/robots'

describe('Robots (PR #4)', () => {
    it('allows all user agents', () => {
        const result = robots()
        expect(result.rules).toBeDefined()
        const rules = result.rules as Array<{ userAgent?: string; allow?: string; sitemap?: string }>
        expect(rules[0]?.userAgent).toBe('*')
        expect(rules[0]?.allow).toBe('/')
    })

    it('points to sitemap URL', () => {
        const result = robots()
        expect(result.sitemap).toContain('/sitemap.xml')
    })
})
