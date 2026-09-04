import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Container } from '@/components/ui/container'

describe('Container', () => {
    it('renders children correctly', () => {
        render(
            <Container>
                <span data-testid="child">Child content</span>
            </Container>
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        const { container } = render(
            <Container className="custom-class">
                <span>Content</span>
            </Container>
        )
        expect(container.querySelector('.custom-class')).toBeInTheDocument()
    })
})
