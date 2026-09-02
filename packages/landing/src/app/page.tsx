import Hero from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Pricing } from '@/components/sections/pricing'
import Cta from '@/components/sections/cta'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

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
