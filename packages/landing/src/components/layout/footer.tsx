import type * as React from 'react'

const REPO_URL = 'https://github.com/leifermendez/bot-whatsapp'
const DOCS_URL = 'https://builderbot.vercel.app/'
const TWITTER_URL = 'https://twitter.com/builderbot'
const LINKEDIN_URL = 'https://www.linkedin.com/company/builderbot'

const PROJECT_LINKS = [
    { href: '#features', label: 'Features', external: false },
    { href: '#pricing', label: 'Pricing', external: false },
    { href: REPO_URL, label: 'GitHub', external: true },
] as const

const RESOURCE_LINKS = [
    { href: DOCS_URL, label: 'Documentation', external: true },
    { href: `${REPO_URL}#readme`, label: 'Getting Started', external: true },
    { href: `${REPO_URL}/issues`, label: 'Support', external: true },
] as const

const SOCIAL_LINKS = [
    { href: REPO_URL, label: 'GitHub' },
    { href: TWITTER_URL, label: 'Twitter' },
    { href: LINKEDIN_URL, label: 'LinkedIn' },
] as const

const Footer: React.FC = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full bg-surface-muted border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Column 1: Brand */}
                    <div>
                        <a
                            href="#hero"
                            className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            ChatBot-WA
                        </a>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Open-source framework to build, deploy, and scale WhatsApp chatbots with AI.
                            TypeScript-first and production-ready.
                        </p>
                    </div>

                    {/* Column 2: Project links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Project</h3>
                        <ul className="mt-3 space-y-2">
                            {PROJECT_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Resources + Connect/socials */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
                        <ul className="mt-3 space-y-2">
                            {RESOURCE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h3 className="mt-6 text-sm font-semibold text-foreground">Connect</h3>
                        <ul className="mt-3 flex flex-wrap items-center gap-2">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium text-muted-foreground border border-border hover:text-primary hover:border-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom row: copyright */}
                <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {year} ChatBot-WA. Released under the MIT License.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
