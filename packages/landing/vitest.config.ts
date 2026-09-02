import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        include: [
            'tests/components/**/*.test.{ts,tsx}',
            'tests/seo/**/*.test.ts',
            'tests/integration/**/*.test.ts',
            'src/tests/**/*.test.{ts,tsx}',
        ],
        exclude: ['tests/e2e/**', 'node_modules'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/components/**/*.tsx'],
        },
    },
})
