import { Page, Locator } from '@playwright/test';
export class PracticeFormPage {
    readonly txtFirstName;
    readonly txtLastName;
    readonly txtEmail
    // readonly rdGender;
    readonly txtMobile;
    readonly txtDateOfBirth;
    readonly txtSubjects;
    // readonly chkHobbies;
    readonly txtPicture;
    readonly txtCurrentAddress;
    readonly cbState;
    readonly cbCity;
    rdGenderAndHobbiesXpath: string = 'xpath=//*[text()="@param"]/preceding-sibling::input';
    readonly btnSubmit;

    constructor(public readonly page: Page) {
    this.txtFirstName = page.locator('#firstName');
    this.txtLastName = page.locator('#lastName');
    this.txtEmail = page.locator('#userEmail');
    this.txtMobile = page.locator('#userNumber');
    this.txtDateOfBirth = page.locator('#dateOfBirthInput');
    this.txtSubjects = page.locator('#subjectsInput');
    this.txtPicture = page.locator('#uploadPicture');
    this.txtCurrentAddress = page.locator('#currentAddress');
    this.cbState = page.locator('xpath=//*[@id="state"]//input');
    this.cbCity = page.locator('xpath=//*[@id="city"]//input');
    this.btnSubmit = page.locator('#submit');
    }

    async goto() {
        await this.page.goto('/automation-practice-form');
    }

    async inputData(firstName: string, lastName: string, email: string, gender: string, mobile: string, dateOfBirth: string, subjects: string, hobbies: string, pictureName: string, currentAddress: string, state: string, city: string) {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        const rdGender = await this.getLocatorByText(this.rdGenderAndHobbiesXpath, gender);
        await rdGender.click();
        await this.txtMobile.fill(mobile);
        await this.inputDateOfBirth(dateOfBirth);
        await this.page.waitForTimeout(5000);
        await this.inputComboBoxWithMultiValues(this.txtSubjects, subjects);
        await this.clickOnHobbies(this.rdGenderAndHobbiesXpath, hobbies);
        await this.inputComboBoxWithSingleValue(this.cbState, state);
        await this.inputComboBoxWithSingleValue(this.cbCity, city);
        const picture = process.cwd() + '/testcases/testdata/' + pictureName;
        await this.txtPicture.setInputFiles(picture);
        await this.txtCurrentAddress.fill(currentAddress);
        await this.btnSubmit.click();        
    }

    async getLocatorByText(xpath : string, text: string) : Promise<Locator> {
        const finalXpath = xpath.replace('@param', text);
        return this.page.locator(finalXpath);

    }

    async clickOnHobbies(originalXpath: string, hobbies: string) {
       
        const hobbiesList = hobbies.split(',').map(hobby => hobby.trim());
        for (const hobby of hobbiesList) {
            const newXpath = originalXpath.replace('@param', hobby);
            await this.page.locator(newXpath).scrollIntoViewIfNeeded();
            await this.page.locator(newXpath).click();
        }
    
} 
    
     
    async inputComboBoxWithMultiValues(locator: Locator, value: string) {
        const values = value.split(',').map(v => v.trim());
        for (const val of values) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(val);
            await this.page.keyboard.press('Enter');
        }
}
    async inputComboBoxWithSingleValue(locator: Locator, value: string){
        await locator.fill(value);
        await this.page.keyboard.press('Enter');
    }

    async inputDateOfBirth(dateOfBirth: string) {
        const [day, month, year] = dateOfBirth.split(' ');
        await this.txtDateOfBirth.click();
        await this.page.locator('.react-datepicker__year-select').selectOption({ label: year });
        await this.page.locator('.react-datepicker__month-select').selectOption({ label: month });
        await this.page.locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click();
        await this.page.keyboard.press('Escape');
    }
}

    