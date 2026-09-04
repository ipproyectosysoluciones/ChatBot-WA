import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Hero from '@/components/sections/hero'

describe('Hero Section', () => {
    it('renders heading', () => {
        render(<Hero />)
        expect(screen.getByRole('heading')).toBeInTheDocument()
    })

    it('has call-to-action button', () => {
        render(<Hero />)
        expect(screen.getByRole('link', { name: /start/i })).toBeInTheDocument()
    })
})
