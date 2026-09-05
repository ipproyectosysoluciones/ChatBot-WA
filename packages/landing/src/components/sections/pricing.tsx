import { Check } from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface PricingPlan {
    name: string
    price: string
    description: string
    features: string[]
    ctaText: string
    ctaHref: string
    highlighted?: boolean
    badge?: string
}

const plans: PricingPlan[] = [
    {
        name: 'Free',
        price: '$0',
        description: 'Perfect for getting started and exploring the platform.',
        features: ['1 WhatsApp bot', '1,000 messages/month', 'Basic analytics', 'Community support'],
        ctaText: 'Get Started',
        ctaHref: '#cta',
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '$29',
        description: 'Best for growing businesses and production deployments.',
        features: [
            'Unlimited WhatsApp bots',
            '50,000 messages/month',
            'Advanced analytics',
            'Priority support',
            'Custom workflows',
            'Webhooks & integrations',
        ],
        ctaText: 'Start Pro Trial',
        ctaHref: 'https://github.com/leifermendez/bot-whatsapp',
        highlighted: true,
        badge: 'Most Popular',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Dedicated infrastructure and premium support for large-scale operations.',
        features: [
            'Unlimited everything',
            'Dedicated infrastructure',
            'SLA-backed support',
            'Custom integrations',
            'White-label options',
            'Onboarding assistance',
        ],
        ctaText: 'Contact Sales',
        ctaHref: 'mailto:sales@builderbot.ai',
        highlighted: false,
    },
]

function PricingCard({ plan }: { plan: PricingPlan }) {
    return (
        <Card
            title={plan.name}
            description={plan.description}
            footer={
                <a
                    href={plan.ctaHref}
                    className={
                        'inline-block w-full rounded-lg bg-primary text-center text-primary-foreground font-medium px-4 py-3 shadow-sm transition-colors hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                    }
                >
                    {plan.ctaText}
                </a>
            }
            className={plan.highlighted ? 'ring-2 ring-primary shadow-md bg-surface' : 'bg-surface shadow-md'}
        >
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">{plan.price}</span>
                {plan.name !== 'Enterprise' && <span className="text-sm text-muted-foreground">/month</span>}
            </div>
            {plan.badge && (
                <div className="mb-4">
                    <Badge variant="default">{plan.badge}</Badge>
                </div>
            )}
            <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-foreground">{feature}</span>
                    </li>
                ))}
            </ul>
        </Card>
    )
}

export function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Choose the plan that fits your needs. Start free, upgrade when you grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    )
}
