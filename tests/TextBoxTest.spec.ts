import { expect, test } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';

test.describe('TextBoxTests', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

  test ('Submit successfully', async () => {
    const fullName = 'John Doe';  
    const email = 'john.doe@example.com';
    const currentAddress = '123 Main St';
    const permanentAddress = '456 Oak Ave';
    await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
    const actualName: string = await textBoxPage.getTextByLocator(textBoxPage.lblName);
    const actualEmail: string = await textBoxPage.getTextByLocator(textBoxPage.lblEmail);
    const actualCurrentAddress: string = await textBoxPage.getTextByLocator(textBoxPage.lblCurrentAddress);
    const actualPermanentAddress: string = await textBoxPage.getTextByLocator(textBoxPage.lblPermanentAddress);
     expect(actualName).toBe(fullName);
     expect(actualEmail).toBe(email);
     expect(actualCurrentAddress).toBe(currentAddress);
     expect(actualPermanentAddress).toBe(permanentAddress);
  });

  
});