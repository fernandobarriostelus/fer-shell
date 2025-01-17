import nextJest from 'next/jest'
import { loadEnvConfig } from '@next/env'

const createJestConfig = nextJest()

const config = {
  rootDir: '.',
  moduleNameMapper: {
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/styles/(.*)': '<rootDir>/src/styles/$1'
  },
  collectCoverageFrom: [
    'src/**',
    '!src/components/{App,Document}/**',
    '!src/pages/**',
    '!src/middleware.js'
  ],
  setupFilesAfterEnv: ['@testing-library/react', '@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/cypress'],
  transformIgnorePatterns: ['/node_modules/(?!(@telus)/)']
}

loadEnvConfig(config.rootDir)

module.exports = createJestConfig(config)
