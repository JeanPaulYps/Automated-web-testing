export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.signUpEmailInput = page.getByPlaceholder("E-Mail");
    this.signUpPasswordInput = page.getByPlaceholder(/Password/i);
    this.registerButton = page.getByRole("button", {
      name: /register/i,
    });
  }

  signUpAsNewUser = async (email, password) => {
    await this.signUpEmailInput.fill(email);
    await this.signUpEmailInput.waitFor();
    await this.signUpPasswordInput.fill(password);
    await this.signUpPasswordInput.waitFor();
    await this.registerButton.click();
  };
}
