import { Button } from '@/components/ui/button'

const REPO_URL = 'https://github.com/leifermendez/bot-whatsapp'

export default function Cta() {
    return (
        <section
            id="cta"
            className="w-full bg-primary text-primary-foreground py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
                        Ready to ship your WhatsApp chatbot?
                    </h2>
                    <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl leading-relaxed">
                        Start building with ChatBot-WA today. Open source, TypeScript-first, and ready for production
                        from day one.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            variant="secondary"
                            size="lg"
                            as="a"
                            href="#hero"
                            className="bg-background text-primary hover:bg-surface border-0"
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            as="a"
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/30"
                        >
                            View on GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
