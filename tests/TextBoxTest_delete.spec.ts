import { test, expect } from '@playwright/test';

test('submit form with valid data', async ({ page }) => {
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
 //TC01: submit form with valid data and verify the output

test('submit form with email dont have @', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'john.doeexample.com');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Oak Ave');
    await page.click('#submit');
    await expect(page.locator('#output')).not.toBeVisible();
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
}

);

//TC02: submit form with email dont have @ and verify that the red border appears around the email field and the output is not displayed

test('submit form with email dont have domain name', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'john.doe@example');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Oak Ave');
    await page.click('#submit');
    await expect(page.locator('#output')).not.toBeVisible();
    await expect(page.locator('#userEmail')).toHaveClass(/field-error/);
}

);

//TC03: submit form with email dont have domain name and verify that the red border appears around the email field and the output is not displayed

