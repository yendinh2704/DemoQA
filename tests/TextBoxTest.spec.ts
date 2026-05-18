import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'john.doe@example.com');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Oak Ave');
    await page.click('#submit');
    await expect(page.locator('#name')).toContainText('John Doe');
    await expect(page.locator('#email')).toContainText('john.doe@example.com');
    await expect(page.locator('xpath=//p[@id="currentAddress"]')).toContainText('123 Main St');
    await expect(page.locator('xpath=//p[@id="permanentAddress"]')).toContainText('456 Oak Ave');
});
 