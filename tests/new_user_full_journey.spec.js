import test from "@playwright/test";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { Navigation } from "../page-objects/Navigation";
import { ProductsPage } from "../page-objects/ProductsPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { v4 as uuidv4 } from "uuid";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/DeliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails } from "../data/PaymentDetails";

test("New user full end-to-end test journey", async ({ page }) => {
  const productPage = new ProductsPage(page);
  const navigation = new Navigation(page);
  const checkout = new Checkout(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const deliveryDetails = new DeliveryDetails(page);
  const paymentPage = new PaymentPage(page);

  await productPage.visit();
  await productPage.sortByCheapest();
  await productPage.addProductToBasket(0);
  await productPage.addProductToBasket(1);
  await productPage.addProductToBasket(2);

  await navigation.goToCheckout();
  // await page.pause();

  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  await loginPage.moveToSignUp();

  const email = `${uuidv4()}@gmail.com`;
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  await deliveryDetails.fillDetails(userAddress);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();

  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.completePayment()

  await page.pause();
});
