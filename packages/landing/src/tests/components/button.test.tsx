import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import fs from 'node:fs'
import path from 'node:path'

const SRC_ROOT = path.resolve(__dirname, '../..')

describe('Button (PR #1)', () => {
    it('renders as a <button> element', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts variant prop: default', () => {
        render(<Button variant="default">Default</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts variant prop: secondary', () => {
        render(<Button variant="secondary">Secondary</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts variant prop: outline', () => {
        render(<Button variant="outline">Outline</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts variant prop: ghost', () => {
        render(<Button variant="ghost">Ghost</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts size prop: sm', () => {
        render(<Button size="sm">Small</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts size prop: default', () => {
        render(<Button size="default">Default</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts size prop: lg', () => {
        render(<Button size="lg">Large</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('sets aria-disabled when disabled', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not use raw hex colors in className', () => {
        const src = fs.readFileSync(path.join(SRC_ROOT, 'components/ui/button.tsx'), 'utf8')
        expect(src).not.toMatch(/#[0-9a-fA-F]{3,6}/)
    })
})
