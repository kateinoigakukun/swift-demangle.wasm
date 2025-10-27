import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'],
    },
  },
  test: {
    projects: [
      {
        test: {
          include: ['test/smoke.test.js'],
          name: 'node',
          environment: 'node',
        },
      },
      {
        test: {
          include: ['test/smoke.browser.test.js'],
          name: 'browser',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
      },
    ],
  },
})
