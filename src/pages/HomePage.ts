import { Page } from 'playwright';

export class HomePage {
  constructor(private page: Page) {}

  // === EXACT LOCATORS FROM CODEGEN ===
  get fromCityLabel() { return this.page.getByText('MAA - Chennai, India'); }
  get fromInputBox() { return this.page.locator('.airport-location-v2.single-line'); }
  get whereToInput() { return this.page.getByPlaceholder('Where to?'); }
  get departBtn() { return this.page.getByRole('button', { name: 'Depart' }); }
  get returnHeader() { return this.page.locator('.return-header'); }
  get closeCalendarBtn() { return this.page.locator('#closeCalendar'); } // This is your Done
  get travelerBtn() { return this.page.getByRole('button', { name: 'Traveler' }); }
  get searchBtn() { return this.page.getByRole('button', { name: 'Search' }); }

  async fillToCity(city: string) {
    await this.whereToInput.click();
    await this.whereToInput.fill(city);
    // Select Delhi from dropdown that appears
    await this.page.getByText('DEL - New Delhi').first().click();
  }

  async selectDepartDate(day: string) {
    await this.departBtn.click();
    await this.page.getByRole('button', { name: `${day} November` }).click();
  }

  async selectReturnDate(day: string) {
    await this.returnHeader.click();
    await this.page.getByRole('button', { name: `${day} December` }).click();
  }

  async clickDone() {
    await this.closeCalendarBtn.click();
  }

  async addTravelers() {
    await this.travelerBtn.click();
    await this.page.getByRole('button', { name: 'Add SENIORS' }).click();
    await this.page.getByRole('button', { name: 'Add CHILD' }).click();
    await this.page.getByRole('combobox').selectOption('5');
    await this.page.getByRole('button', { name: 'Add IS' }).click();
    await this.page.getByRole('button', { name: 'Add IL' }).click();
    await this.page.getByRole('button', { name: 'Done' }).click();
  }

  async search() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.searchBtn.click();
    const newPage = await popupPromise;
    return newPage;
  }

//   async search() {
//     await this.searchBtn.click();

//     await this.page.waitForLoadState('domcontentloaded');

//     return this.page;
// }

}