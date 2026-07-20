import { Page, Locator } from '@playwright/test'; 

export class ThanksForSubmittingPage {
    readonly lblValueXpath: string = '//*[text()="@param"]/following-sibling::td';

    constructor(public readonly page: Page) {}

    async getLocatorByText(xpath : string, text: string) : Promise<Locator> {
            const finalXpath = xpath.replace('@param', text);
            return this.page.locator(finalXpath);
    }
}