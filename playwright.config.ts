import { defineConfig, devices } from '@playwright/test';

/**
 * ApexBank E2E Test Configuration — Phase 15.2
 *
 * Tests multi-role flows: customer transfers, admin approvals,
 * and cross-cutting security concerns.
 */
export default defineConfig({
    testDir: './e2e',
    fullyParallel: false, // Banking tests have state dependencies
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    timeout: 30000,

    use: {
        baseURL: process.env.APP_URL || 'http://localhost:8000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 14'] },
        },
    ],

    /* Start dev server before tests */
    webServer: process.env.CI
        ? undefined
        : {
              command: 'php artisan serve --port=8000',
              port: 8000,
              reuseExistingServer: !process.env.CI,
              timeout: 30000,
          },
});
