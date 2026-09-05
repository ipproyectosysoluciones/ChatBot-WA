import { Button } from '@/components/ui/button'

const REPO_URL = 'https://github.com/leifermendez/bot-whatsapp'

export default function Hero() {
    return (
        <section id="hero" className="w-full bg-surface-muted py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl">
                        Build WhatsApp Chatbots Powered by AI — Open Source
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        Create, deploy, and scale intelligent WhatsApp bots with BuilderBot. TypeScript-first,
                        production-ready, and free forever.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button size="lg">
                            <a href="#cta">Start now</a>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            as="a"
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </Button>
                    </div>

                    {/* Decorative visual element */}
                    <div
                        className="mt-8 w-full max-w-3xl h-48 rounded-xl bg-surface border border-border flex items-center justify-center"
                        aria-hidden="true"
                    >
                        <span className="text-muted-foreground text-sm font-mono">ChatBot-WA Framework Preview</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
