import test from "@playwright/test";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";
import { MyAccountPage } from "../page-objects/MyAccount";

test("My account using cookie injection", async ({ page }) => {
  const myAccount = new MyAccountPage(page);
  const { username, password } = adminDetails;
  const loginToken = await getLoginToken(username, password);

  await page.route(
    "http://localhost:2221/api/user?id=3d28d66f-0e13-4564-b6d2-5f0ae7895011",
    async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
      });
    }
  );

  await myAccount.visit();
  await page.evaluate(
    ([tokenInsideBrowser]) => {
      document.cookie = `token=${tokenInsideBrowser}`;
    },
    [loginToken]
  );
  await myAccount.visit();
  await myAccount.waitForPageHeading();
  await myAccount.waitForErrorMessage();
});
