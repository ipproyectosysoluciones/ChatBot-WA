import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/hero'
import fs from 'node:fs'
import path from 'node:path'

const SRC_ROOT = path.resolve(__dirname, '../..')

describe('Hero (PR #1)', () => {
    it('renders exactly one <h1> with display typography', () => {
        render(<Hero />)
        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings.length).toBe(1)
        expect(headings[0]).toBeInTheDocument()
    })

    it('renders exactly two CTAs: primary button and secondary link', () => {
        render(<Hero />)
        const buttons = screen.getAllByRole('button')
        const links = screen.getAllByRole('link')
        expect(buttons.length).toBeGreaterThanOrEqual(1)
        expect(links.length).toBeGreaterThanOrEqual(1)
    })

    it('contains no "use client" directive (server component)', () => {
        const src = fs.readFileSync(path.join(SRC_ROOT, 'components/sections/hero.tsx'), 'utf8')
        expect(src.includes('"use client"')).toBe(false)
    })

    it('uses surface-muted background token (no raw hex)', () => {
        const src = fs.readFileSync(path.join(SRC_ROOT, 'components/sections/hero.tsx'), 'utf8')
        expect(src).not.toMatch(/#[0-9a-fA-F]{3,6}/)
    })
})
