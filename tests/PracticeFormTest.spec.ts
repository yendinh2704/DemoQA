import { expect, test } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import * as path from 'path';
import { ThanksForSubmittingPage } from '../pages/ThanksForSubmittingPage';
import { readDataFromCSV } from '../common/Utils';


test.describe('Practice Form Test', () => {
  let practiceFormPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.goto();
  });

     test.afterEach(async ({ page }) => {
    await page.close();
  });
  const testData = readDataFromCSV("testcase/testdata/PracticeForm_TC1.csv");
  for (const data of testData) {

  test('Submit data successfully', async () => {
    
    // const firstName = 'John';
    // const lastName = 'Doe';
    // const email = 'john.doe@example.com';
    // const gender = 'Male';
    // const mobile = '1234567890';
    // const dateOfBirth = '01 January 1990';
    // const subjects = 'Maths, Physics';
    // const hobbies = 'Sports, Reading';
    // const pictureName = 'images.png';
    // const currentAddress = '123 Main St';
    // const state = 'NCR';
    // const city = 'Delhi';
    await practiceFormPage.inputData(data.firstName??"", data.lastName??"", data.email??"", data.gender??"", data.mobile??"", data.dateOfBirth??"", data.subjects??"", data.hobbies??"", data.pictureName??"", data.currentAddress??"", data.state??"", data.city??"");
    
    const thanksForSubmittingPage = new ThanksForSubmittingPage(practiceFormPage.page);
    const actualStudentName = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Student Name');
    await expect(actualStudentName, data.firstName + ' ' + data.lastName);
    const actualEmail = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Student Email');
    await expect(actualEmail, data.email);
    const actualGender = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Gender');
    await expect(actualGender, data.gender);
    const actualMobile = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Mobile');
    await expect(actualMobile, data.mobile);
    const actualDateOfBirth = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Date of Birth');
    const firstSpaceIndex:number = data.dateOfBirth.indexOf(' ');
    const secondSpaceIndex = data.dateOfBirth.indexOf(' ',firstSpaceIndex+1);
    const expectedDateOfBirth = data.dateOfBirth.replace(data.dateOfBirth[secondSpaceIndex],',');
    await expect(actualDateOfBirth, expectedDateOfBirth);
    const actualSubjects = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Subjects');
    await expect(actualSubjects, data.subjects);
    const actualHobbies = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Hobbies');
    await expect(actualHobbies, data.hobbies);
    const actualPictureName = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Picture')
    await expect(actualPictureName, data.pictureName);
    const actualAddress = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Address');
    await expect(actualAddress, data.currentAddress);
    const actualStateAndCity = thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'State and City');
    await expect(actualStateAndCity, data.state + ' ' + data.city);  
  });
}

  test('Submit failed with blank required fields', async ({ page }) => {
    await practiceFormPage.clickSubmit();
    await expect(practiceFormPage.txtFirstName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(practiceFormPage.txtLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    const maleLabel = page.locator(practiceFormPage.rdGenderAndHobbiesXpath.replace('@param', 'Male'));
    await expect(maleLabel).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(practiceFormPage.txtMobile).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  })
})

