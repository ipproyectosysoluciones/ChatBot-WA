import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                background: 'oklch(1 0 0)',
                foreground: 'oklch(0.145 0 0)',
                surface: 'oklch(0.97 0 0)',
                'surface-muted': 'oklch(0.95 0 0)',
                border: 'oklch(0.9 0 0)',
                primary: 'oklch(0.55 0.18 260)',
                'primary-foreground': 'oklch(0.985 0 0)',
                'muted-foreground': 'oklch(0.45 0 0)',
                success: 'oklch(0.65 0.18 145)',
                danger: 'oklch(0.6 0.22 25)',
            },
            fontFamily: {
                sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                sm: '0.375rem',
                md: '0.5rem',
                lg: '0.75rem',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
        },
    },
    plugins: [],
}

export default config
