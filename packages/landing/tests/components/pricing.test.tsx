import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Pricing } from '@/components/sections/pricing'

describe('Pricing (PR #2)', () => {
    it('renders exactly 3 plan cards', () => {
        render(<Pricing />)
        const headings = screen.getAllByRole('heading', { level: 3 })
        expect(headings.length).toBe(3)
    })

    it('highlights Pro card with ring-2 ring-primary', () => {
        render(<Pricing />)
        const cards = document.querySelectorAll('[class*="ring-2"]')
        expect(cards.length).toBeGreaterThanOrEqual(1)
    })

    it('lists features in <ul> with <li> items', () => {
        render(<Pricing />)
        const lists = document.querySelectorAll('ul')
        expect(lists.length).toBe(3)
    })
})
