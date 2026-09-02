import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function NotFound() {
    return (
        <main className="bg-surface-muted text-foreground min-h-screen flex items-center">
            <Container className="text-center py-16 md:py-24 lg:py-32">
                <p className="text-caption font-medium tracking-wide text-primary">404</p>
                <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                    The page you are looking for does not exist or has been moved. Head back to the home page to keep
                    exploring ChatBot-WA.
                </p>
                <div className="mt-10">
                    <Button as="a" href="/" variant="default" size="default">
                        Back to home
                    </Button>
                </div>
            </Container>
        </main>
    )
}
