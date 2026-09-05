import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Features } from '@/components/sections/features'

describe('Features (PR #2)', () => {
    it('renders an <h2> heading', () => {
        render(<Features />)
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders exactly 4 feature cards', () => {
        render(<Features />)
        const headings = screen.getAllByRole('heading', { level: 3 })
        expect(headings.length).toBe(4)
    })

    it('renders decorative icons with aria-hidden', () => {
        render(<Features />)
        const icons = document.querySelectorAll('svg[aria-hidden="true"]')
        expect(icons.length).toBeGreaterThanOrEqual(4)
    })

    it('uses responsive grid: collapses to single column on mobile', () => {
        const { container } = render(<Features />)
        const grid = container.querySelector('.grid')
        expect(grid?.className).toContain('grid-cols-1')
        expect(grid?.className).toContain('md:grid-cols-2')
        expect(grid?.className).toContain('lg:grid-cols-4')
    })
})
