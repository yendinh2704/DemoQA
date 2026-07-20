import { expect, test } from '@playwright/test';
import { CheckBoxPage } from '../pages/CheckBoxPage';

test.describe('CheckBoxTests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkbox');
  });

  test('Check Home checkbox', async ({ page }) => {
    const checkBoxPage = new CheckBoxPage(page);
    await expect(checkBoxPage.chkHome).not.toBeChecked();
    await checkBoxPage.clickHomeCheckBox();
    await checkBoxPage.clickExpandHome();
    await expect(checkBoxPage.chkHome).toBeChecked();
    await expect(checkBoxPage.chkDesktop).toBeChecked();
    await expect(checkBoxPage.chkDocuments).toBeChecked();
    await expect(checkBoxPage.chkDownloads).toBeChecked();
    const actualResult = await checkBoxPage.getActualResult();
    expect(actualResult).toBe('You have selected : home desktop documents downloads notes commands workspace office wordFile excelFile react angular veu public private classified general');


   
  });

});
