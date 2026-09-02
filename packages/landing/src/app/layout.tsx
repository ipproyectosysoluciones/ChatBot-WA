import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'ChatBot-WA — AI-Powered WhatsApp Chatbot Framework',
    description:
        'Build, deploy, and scale WhatsApp chatbots with AI. Open-source, TypeScript-first framework, ready for production from day one.',
    alternates: {
        canonical: 'https://chatbot-wa.vercel.app/',
    },
    openGraph: {
        type: 'website',
        title: 'ChatBot-WA — AI-Powered WhatsApp Chatbot Framework',
        description:
            'Build, deploy, and scale WhatsApp chatbots with AI. Open-source, TypeScript-first framework, ready for production from day one.',
        url: 'https://chatbot-wa.vercel.app/',
        siteName: 'ChatBot-WA',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'ChatBot-WA — AI-Powered WhatsApp Chatbot Framework',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ChatBot-WA — AI-Powered WhatsApp Chatbot Framework',
        description:
            'Build, deploy, and scale WhatsApp chatbots with AI. Open-source, TypeScript-first framework, ready for production from day one.',
        images: ['/og-image.jpg'],
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="bg-background text-foreground antialiased font-sans min-h-screen">
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'SoftwareApplication',
                            name: 'ChatBot-WA',
                            description: 'AI-Powered WhatsApp Chatbot Framework',
                            applicationCategory: 'DeveloperApplication',
                            operatingSystem: 'TypeScript',
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'USD',
                            },
                        }),
                    }}
                />
            </body>
        </html>
    )
}
