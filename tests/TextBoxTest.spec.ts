// @ts-ignore
const { TextBoxPage } = require('../pages/TextBoxPage');
import { test } from '@playwright/test';

test.describe('TextBoxTests', () => {
  let textBoxPage: any;
  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

   test.afterEach(async () => {
    await textBoxPage.removeAll();
  });

  test ('Submit successfully', async () => {
    await textBoxPage.inputData('John Doe', 'john.doe@example.com', '123 Main St', '456 Oak Ave');  
//todo: verify the output
  });

  
});