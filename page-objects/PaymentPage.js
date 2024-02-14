import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.inputDiscount = page.getByPlaceholder(/Discount code/i);
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.discountMessage = page.getByText("Discount activated!");
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.totalWithDiscount = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.creditCardOwnerField = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumberField = page.locator('[data-qa="credit-card-number"]');
    this.creditValidUntilField = page.locator('[data-qa="valid-until"]');
    this.creditCardCvcField = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  activateDiscount = async () => {
    const textDiscountCode = await this.discountCode.innerText();
    await this.inputDiscount.fill(textDiscountCode);
    await expect(await this.inputDiscount).toHaveValue(textDiscountCode);

    // await this.inputDiscount.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.inputDiscount.inputValue()).toBe(textDiscountCode);

    expect(await this.totalWithDiscount.isVisible()).toBe(false);
    expect(await this.discountMessage.isVisible()).toBe(false);

    await this.activateDiscountButton.click();
    const totalWithDollarSign = await this.totalValue.innerText();
    const total = parseInt(totalWithDollarSign.replace("$", ""));
    const totalWithDiscountAndDollarSign =
      await this.totalWithDiscount.innerText();
    const totalWithDiscount = parseInt(
      totalWithDiscountAndDollarSign.replace("$", "")
    );

    expect(totalWithDiscount).toBeLessThan(total);
  };

  fillPaymentDetails = async ({ owner, number, validUntil, cvc }) => {
    await this.creditCardOwnerField.fill(owner);
    await this.creditCardNumberField.fill(number);
    await this.creditValidUntilField.fill(validUntil);
    await this.creditCardCvcField.fill(cvc);
  };

  completePayment = async () => {
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/i);
  };
}
