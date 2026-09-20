import { Given, When, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { HomePage } from '../pages/HomePage';

setDefaultTimeout(60 * 1000);
let browser: Browser;
let page: Page;
let resultsPage: Page;
let homePage: HomePage;

Given('I am on the ticket booking homepage', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://www.cheapoair.com/');
  homePage = new HomePage(page);
});

When('I select from {string} to {string} and dates {string} and {string}', async function (from, to, depart, ret) {
  await homePage.fillToCity(to);
  await homePage.selectDepartDate(depart);
  await homePage.selectReturnDate(ret);
  await homePage.clickDone();
});

When('I click done and search', async function () {
  resultsPage = await homePage.search();
  await resultsPage.waitForTimeout(5000);
  await resultsPage.locator('#contractindex_0').getByRole('button', { name: 'Select' }).click();
  console.log("Flight Selected!");
  await resultsPage.waitForTimeout(3000);
});

After(async function () {
  if (resultsPage) await resultsPage.close();
  if (page) await page.close();
  if (browser) await browser.close();
});