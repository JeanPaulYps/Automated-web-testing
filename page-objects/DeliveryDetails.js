import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder(/First name/i);
    this.lastNameField = page.getByPlaceholder(/Last name/i);
    this.streetField = page.getByPlaceholder(/Street/i);
    this.postCodeField = page.getByPlaceholder(/Post code/i);
    this.cityField = page.getByPlaceholder(/City/i);
    this.countryField = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.getByRole("button", {
      name: /Save address for next time/i,
    });
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostCode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );
    this.paymentButton = page.getByRole("button", {
      name: /Continue to payment/i,
    });
  }

  fillDetails = async ({
    firstName,
    lastName,
    street,
    postCode,
    city,
    country,
  }) => {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.streetField.fill(street);
    await this.postCodeField.fill(postCode);
    await this.cityField.fill(city);
    await this.countryField.selectOption(country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();
    console.log(addressCountBeforeSaving);
    await this.saveAddressButton.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );
    await this.savedAddressFirstName.first();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(
      await this.firstNameField.inputValue()
    );
    expect(await this.savedAddressLastName.first().innerText()).toBe(
      await this.lastNameField.inputValue()
    );
    expect(await this.savedAddressStreet.first().innerText()).toBe(
      await this.streetField.inputValue()
    );
    expect(await this.savedAddressCity.first().innerText()).toBe(
      await this.cityField.inputValue()
    );
    expect(await this.savedAddressPostCode.first().innerText()).toBe(
      await this.postCodeField.inputValue()
    );
    expect(await this.savedAddressCountry.first().innerText()).toBe(
      await this.countryField.inputValue()
    );
  };

  continueToPayment = async () => {
    await this.paymentButton.click();
    await this.page.waitForURL("/payment");
  };
}
