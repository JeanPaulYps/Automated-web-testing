import { expect, test } from "@playwright/test";

test("Example", async ({ page }) => {
  await page.goto("/");
  const addToBasketButton = await page
    .locator('[data-qa="product-button"]')
    .first();

  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  await expect(addToBasketButton).toHaveText(/Add to Basket/);
  await addToBasketButton.click();

  await expect(addToBasketButton).toHaveText(/Remove from Basket/i);
  await expect(basketCounter).toHaveText("1");

  const checkoutLink = page.getByRole("link", { name: "Checkout" });
  await checkoutLink.click();
  await page.waitForURL('/basket');
  await page.pause();
});
