import { Page } from "@playwright/test";

export class CheckBoxPage {
    readonly chkHome;
    readonly iconExpandHome;
    readonly chkDesktop;
    readonly chkDocuments;
    readonly chkDownloads;
    readonly lblResult;
    
    constructor(public readonly page: Page) {
        this.chkHome = page.locator('xpath=//span[@title="Home"]/preceding-sibling::span[@role="checkbox"]');
        this.iconExpandHome = page.locator('xpath=//span[@title="Home"]/preceding-sibling::span[@role="checkbox"]/preceding-sibling::span[1]');
        this.chkDesktop = page.locator('xpath=//span[@title="Desktop"]/preceding-sibling::span[@role="checkbox"]');
        this.chkDocuments = page.locator('xpath=//span[@title="Documents"]/preceding-sibling::span[@role="checkbox"]');
        this.chkDownloads = page.locator('xpath=//span[@title="Downloads"]/preceding-sibling::span[@role="checkbox"]');
        this.lblResult = page.locator('xpath=//div[@id="result"]/span');
    }
    
    async clickExpandHome() {
        await this.iconExpandHome.click();
    }

    async clickHomeCheckBox() {
        await this.chkHome.click();
    }

    async getActualResult(): Promise<string> {
        let result: string = "";
        const count = await this.lblResult.count();
        for (let i = 0; i < count; i++) {
            const text = await this.lblResult.nth(i).textContent();
            if (text) {
                result += text + " ";
            }
        }
        return result.trim();
    }
}