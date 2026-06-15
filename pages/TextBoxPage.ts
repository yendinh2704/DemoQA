
import type { Page } from '@playwright/test';

export class TextBoxPage {
    readonly txtFullName;
    readonly txtEmail;
    readonly txtCurrentAddress;
    readonly txtPermanentAddress;
    readonly btnSubmit;

  constructor(public readonly page: Page) {
    this.txtFullName = page.locator('#userName');
    this.txtEmail = page.locator('#userEmail');
    this.txtCurrentAddress = page.locator('#currentAddress');
    this.txtPermanentAddress = page.locator('#permanentAddress');
    this.btnSubmit = page.locator('#submit');
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
}