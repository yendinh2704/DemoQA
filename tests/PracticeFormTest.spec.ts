import { expect, test } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import * as path from 'path';
import { ThanksForSubmittingPage } from '../pages/ThanksForSubmittingPage';


test.describe('Practice Form Test', () => {
  let practiceFormPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.goto();
  });

  test('Submit data successfully', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const gender = 'Male';
    const mobile = '1234567890';
    const dateOfBirth = '01 January 1990';
    const subjects = 'Maths, Physics';
    const hobbies = 'Sports, Reading';
    const pictureName = 'images.png';
    const currentAddress = '123 Main St';
    const state = 'NCR';
    const city = 'Delhi';
    await practiceFormPage.inputData(firstName, lastName, email, gender, mobile, dateOfBirth, subjects, hobbies, pictureName, currentAddress, state, city);
    
    const thanksForSubmittingPage = new ThanksForSubmittingPage(practiceFormPage.page);
    const actualStudentName = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Student Name');
    await expect(actualStudentName, firstName + ' ' + lastName);
    const actualEmail = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Student Email');
    await expect(actualEmail, email);
    const actualGender = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Gender');
    await expect(actualGender, gender);
    const actualMobile = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Mobile');
    await expect(actualMobile, mobile);
    const actualDateOfBirth = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Date of Birth');
    const firstSpaceIndex:number = dateOfBirth.indexOf(' ');
    const secondSpaceIndex = dateOfBirth.indexOf(' ',firstSpaceIndex+1);
    const expectedDateOfBirth = dateOfBirth.replace(dateOfBirth[secondSpaceIndex],',');
    await expect(actualDateOfBirth, expectedDateOfBirth);
    const actualSubjects = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Subjects');
    await expect(actualSubjects, subjects);
    const actualHobbies = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Hobbies');
    await expect(actualHobbies, hobbies);
    const actualPictureName = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Picture')
    await expect(actualPictureName, pictureName);
    const actualAddress = await thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'Address');
    await expect(actualAddress, currentAddress);
    const actualStateAndCity = thanksForSubmittingPage.getLocatorByText(thanksForSubmittingPage.lblValueXpath, 'State and City');
    await expect(actualStateAndCity, state + ' ' + city);  
  });
    // add assertions or form submission steps here
  });
