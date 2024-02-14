import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.mobileBurgerButton = page.locator('[data-qa="burger-button"]');
  }

  getBasketCount = async () => {
    const basketCount = await this.basketCounter.innerText();
    return parseInt(basketCount);
  };

  goToCheckout = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerButton.click();
    }
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
