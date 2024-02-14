import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
    this.signUpButton = page.locator('[data-qa="go-to-signup-button"]');
    
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    const prices = allPriceTexts.map((element) => {
      const priceWithoutDollarSign = element.replace("$", "");
      return parseInt(priceWithoutDollarSign);
    });
    const smallestPrice = Math.min(...prices);
    const smallestPriceIndex = prices.indexOf(smallestPrice);
    await this.basketItemRemoveButton.nth(smallestPriceIndex).click();

    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/);
  };

}
