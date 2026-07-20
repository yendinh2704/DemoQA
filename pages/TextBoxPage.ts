
import type { Locator, Page } from '@playwright/test';

export class TextBoxPage {
    readonly txtFullName;
    readonly txtEmail;
    readonly txtCurrentAddress;
    readonly txtPermanentAddress;
    readonly btnSubmit;
    readonly lblName;
    readonly lblEmail;
    readonly lblCurrentAddress;
    readonly lblPermanentAddress; 

  constructor(public readonly page: Page) {
    this.txtFullName = page.locator('#userName');
    this.txtEmail = page.locator('#userEmail');
    this.txtCurrentAddress = page.locator('#currentAddress');
    this.txtPermanentAddress = page.locator('#permanentAddress');
    this.btnSubmit = page.locator('#submit');
    this.lblName = page.locator('#name');
    this.lblEmail = page.locator('#email');
    this.lblCurrentAddress = page.locator('xpath=//p[@id="currentAddress"]');
    this.lblPermanentAddress = page.locator('xpath=//p[@id="permanentAddress"]');
  }

  async goto() {
    await this.page.goto('/text-box');
  }
  
  async inputData(name: string, email: string, currentAddress: string, permanentAddress: string) {
    await this.txtFullName.fill(name);
    await this.txtEmail.fill(email);
    await this.txtCurrentAddress.fill(currentAddress);
    await this.txtPermanentAddress.fill(permanentAddress);
    await this.btnSubmit.click();
  }

  async getTextByLocator(locator: string | Locator): Promise<string> {
    const targetLocator = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const originalText = await targetLocator.textContent() || '';

    if (originalText !== '') {
      const index = originalText.indexOf(':');
      return index >= 0 ? originalText.substring(index + 1).trim() : originalText.trim();
    }

    return '';
  }
}
