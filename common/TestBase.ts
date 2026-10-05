import { Locator, Page } from "@playwright/test";
export class TestBase {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async gotoPage(url: string) {
        await this.page.goto(url);
    }
}