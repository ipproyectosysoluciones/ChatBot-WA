/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    verbose: true,
    cache: true,
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/__tests__/test-setup-mock.ts'],
}

export default config
