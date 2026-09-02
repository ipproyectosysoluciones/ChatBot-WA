import type * as React from 'react'
import { Zap, Shield, Globe, Code2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface FeatureItem {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    description: string
}

const features: FeatureItem[] = [
    {
        icon: Zap,
        title: 'Lightning Fast Setup',
        description:
            'Get your WhatsApp chatbot running in minutes with our zero-config CLI. No complex setup or manual configuration required.',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description:
            'Built with security-first architecture. End-to-end encryption, rate limiting, and audit logging included out of the box.',
    },
    {
        icon: Globe,
        title: 'Multi-Platform Support',
        description:
            'Seamlessly connect with WhatsApp, Facebook Messenger, Instagram, and more. One codebase, unlimited channels.',
    },
    {
        icon: Code2,
        title: 'Developer Friendly',
        description:
            'TypeScript-first with full type safety. Clean APIs, comprehensive documentation, and extensive examples to get you started.',
    },
]

function FeatureCard({ icon: Icon, title, description }: FeatureItem) {
    return (
        <Card title={title} description={description} className="group cursor-default">
            <div className="mt-2">
                <Icon
                    className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                />
            </div>
        </Card>
    )
}

export function Features() {
    return (
        <section id="features" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Everything you need to ship faster
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Powerful features designed for developers and businesses who need to deploy WhatsApp chatbots at
                        scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    )
}
