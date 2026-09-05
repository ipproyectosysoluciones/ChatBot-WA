import { describe, it, expect } from 'vitest'

import { metadata } from '@/app/layout'

describe('SEO Metadata (PR #4)', () => {
    it('exports title containing "ChatBot-WA"', () => {
        expect(metadata.title).toContain('ChatBot-WA')
    })

    it('description length is between 120 and 160 chars', () => {
        const desc = metadata.description
        if (typeof desc === 'string') {
            expect(desc.length).toBeGreaterThanOrEqual(120)
            expect(desc.length).toBeLessThanOrEqual(160)
        }
    })

    it('includes openGraph tags', () => {
        expect(metadata.openGraph).toBeDefined()
        expect(metadata.openGraph?.title).toContain('ChatBot-WA')
    })

    it('includes twitter card tags', () => {
        expect(metadata.twitter).toBeDefined()
        expect((metadata.twitter as Record<string, unknown>)?.card).toBe('summary_large_image')
    })

    it('has JSON-LD script in layout source', () => {
        // Source-level validation: layout source contains ld+json
        const fs = require('fs')
        const src = fs.readFileSync('src/app/layout.tsx', 'utf8')
        expect(src).toContain('application/ld+json')
    })
})
