import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cta from '@/components/sections/cta'

describe('CTA (PR #3)', () => {
    it('renders with bg-primary background', () => {
        const { container } = render(<Cta />)
        const section = container.querySelector('section#cta')
        expect(section?.className).toContain('bg-primary')
    })

    it('contains <h2> headline', () => {
        render(<Cta />)
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders at least one CTA link', () => {
        render(<Cta />)
        expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(1)
    })
})
