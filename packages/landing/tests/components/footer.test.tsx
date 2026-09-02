import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/footer'

describe('Footer (PR #3)', () => {
    it('renders <footer> semantic element', () => {
        const { container } = render(<Footer />)
        expect(container.querySelector('footer')).toBeInTheDocument()
    })

    it('renders copyright with current year', () => {
        render(<Footer />)
        const year = new Date().getFullYear()
        expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    })

    it('has external links with target="_blank" and rel="noopener noreferrer"', () => {
        render(<Footer />)
        const extern = document.querySelectorAll('a[target="_blank"]')
        expect(extern.length).toBeGreaterThanOrEqual(1)
    })
})
