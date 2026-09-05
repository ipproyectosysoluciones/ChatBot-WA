import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Cta from '@/components/sections/cta'
import { Features } from '@/components/sections/features'
import Hero from '@/components/sections/hero'
import { Pricing } from '@/components/sections/pricing'

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Hero />
                <Features />
                <Pricing />
                <Cta />
            </main>
            <Footer />
        </div>
    )
}
