import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport";
import { Navigation } from "./Navigation";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.navigation = new Navigation(page);
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    const button = await this.addButtons.nth(index);
    await expect(button).toHaveText(/Add to Basket/i);
    let basketCountBeforeAdding = "";
    // Desktop viewport only
    if (isDesktopViewport(this.page)) {
      basketCountBeforeAdding = await this.navigation.getBasketCount();
    }
    await button.click();
    await expect(button).toHaveText(/Remove from basket/i);
    const basketCountAfterAdding = await this.navigation.getBasketCount();
    if (isDesktopViewport(this.page)) {
      expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }
  };

  sortByCheapest = async () => {
    await this.productTitle.first();
    const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();

    await this.sortDropdown.selectOption("price-asc");
    const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
  };
}
