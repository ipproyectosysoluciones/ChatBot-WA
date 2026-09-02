import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Container } from '@/components/ui/container'

describe('Container (PR #1)', () => {
    it('renders a div with the correct max-w-7xl mx-auto classes', () => {
        const { container } = render(<Container>Test</Container>)
        const el = container.firstChild as HTMLElement
        expect(el).not.toBeNull()
        const className = (el as HTMLElement).className
        expect(className).toContain('max-w-7xl')
        expect(className).toContain('mx-auto')
    })

    it('accepts an `as` prop for semantic HTML', () => {
        const { container } = render(<Container as="section">Test</Container>)
        const el = container.firstChild as HTMLElement
        expect(el.tagName).toBe('SECTION')
    })
})
