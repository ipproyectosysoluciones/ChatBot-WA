'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const REPO_URL = 'https://github.com/leifermendez/bot-whatsapp'

const NAV_LINKS = [
    { href: '#hero', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#cta', label: 'Get Started' },
] as const

const Header: React.FC = () => {
    const [scrolled, setScrolled] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY >= 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full transition-shadow duration-200',
                scrolled
                    ? 'bg-background/80 backdrop-blur shadow-lg border-b border-border'
                    : 'bg-background/0 border-b border-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <a
                        href="#hero"
                        className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                        ChatBot-WA
                    </a>

                    {/* Desktop nav */}
                    <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            GitHub
                        </a>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <span aria-hidden="true" className="sr-only">
                            Toggle navigation
                        </span>
                        {open ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile nav (collapsible) */}
                {open && (
                    <nav
                        id="mobile-nav"
                        aria-label="Mobile primary"
                        className="md:hidden flex flex-col gap-1 pb-4 pt-2 border-t border-border"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="px-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="px-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md"
                        >
                            GitHub
                        </a>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header
