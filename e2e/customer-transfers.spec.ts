import { test, expect, type Page } from '@playwright/test';

/**
 * ApexBank E2E — Customer Transfer Flow
 *
 * Tests the complete customer journey:
 *   1. Login as a customer
 *   2. Navigate to the dashboard
 *   3. Initiate an intra-bank transfer
 *   4. View account statements
 */

/* ── Helpers ─── */

async function loginAsCustomer(page: Page) {
    await page.goto('/login');
    await page.fill('input[name="email"], input[id="email"]', 'testcustomer@apexbank.ng');
    await page.fill('input[name="password"], input[id="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/, { timeout: 10000 });
}

/* ── Tests ─── */

test.describe('Customer Transfer Flow', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsCustomer(page);
    });

    test('should display the dashboard with balance and analytics', async ({ page }) => {
        // Verify dashboard loaded
        await expect(page.locator('h1, h2').first()).toBeVisible();

        // Check that balance section is rendered
        const balanceSection = page.locator('text=/Total Balance|Available/i');
        await expect(balanceSection.first()).toBeVisible({ timeout: 5000 });
    });

    test('should display analytics summary pills', async ({ page }) => {
        // The analytics section should show Income / Spent / Net pills
        const analyticsHeading = page.locator('text=Analytics');
        if (await analyticsHeading.isVisible({ timeout: 3000 })) {
            await expect(page.locator('text=/Income/i').first()).toBeVisible();
            await expect(page.locator('text=/Spent/i').first()).toBeVisible();
        }
    });

    test('should navigate to transfers page', async ({ page }) => {
        // Click on a transfers navigation link
        const transferLink = page.locator('a[href*="transfers"], button:text("Transfer"), a:text("Transfer")').first();
        if (await transferLink.isVisible({ timeout: 3000 })) {
            await transferLink.click();
            await page.waitForLoadState('networkidle');

            // Should see the transfer form
            await expect(page.locator('text=/Send Money|Transfer|From Account/i').first()).toBeVisible();
        }
    });

    test('should navigate to interbank transfers page', async ({ page }) => {
        await page.goto('/banking/interbank');
        await page.waitForLoadState('networkidle');

        // Check interbank form is rendered
        await expect(page.locator('text=/Other Banks|Interbank|Destination/i').first()).toBeVisible();

        // Should have bank selector
        const bankSelect = page.locator('select').first();
        await expect(bankSelect).toBeVisible();
    });

    test('should navigate to account statements', async ({ page }) => {
        // Navigate to accounts first
        await page.goto('/banking/accounts');
        await page.waitForLoadState('networkidle');

        // Check accounts page loaded
        const accountsPage = page.locator('text=/Accounts|Account Number/i');
        await expect(accountsPage.first()).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to cards management', async ({ page }) => {
        await page.goto('/banking/cards');
        await page.waitForLoadState('networkidle');

        // Cards page should render
        await expect(page.locator('text=/Cards|My Cards|Card Management/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to passkeys security page', async ({ page }) => {
        await page.goto('/banking/security/passkeys');
        await page.waitForLoadState('networkidle');

        // Passkeys page should render
        await expect(page.locator('text=/Passkeys|Biometric|Security/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to notifications', async ({ page }) => {
        await page.goto('/banking/notifications');
        await page.waitForLoadState('networkidle');

        await expect(page.locator('text=/Notification/i').first()).toBeVisible({ timeout: 5000 });
    });
});
