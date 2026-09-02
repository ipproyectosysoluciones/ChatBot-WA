import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/header'

// Mock window.scrollTo
const scrollToMock = vi.fn()
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true })

describe('Header (PR #3)', () => {
    beforeEach(() => {
        scrollToMock.mockClear()
        window.scrollTo = scrollToMock
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders brand link pointing to #hero', () => {
        render(<Header />)
        const brand = screen.getByText('ChatBot-WA')
        expect(brand).toBeInTheDocument()
        expect(brand).toHaveAttribute('href', '#hero')
    })

    it('renders navigation anchors: #features and #pricing', () => {
        render(<Header />)
        expect(screen.getByText('Features')).toHaveAttribute('href', '#features')
        expect(screen.getByText('Pricing')).toHaveAttribute('href', '#pricing')
    })

    it('renders mobile toggle button', () => {
        render(<Header />)
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    })
})
