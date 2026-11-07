import { LitElement, html, css } from "lit";
import {
  getAuth,
  validatePassword,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";
import { displayErrorMessage } from "../../../app-functions/error-handling.js";
import { confirmPasswordMatch } from "../../../app-functions/validate-input.js";

export class CreatePasswordElement extends LitElement {
  static properties = {
    email: { type: String },
    _hideErrorHTML: { type: Boolean },
    _userMessage: { type: String },
  };

  constructor() {
    super();
    this.email = "";
    this._hideErrorHTML = true;
    this._userMessage = "";
  }

  async handleSubmit(event) {
    event.preventDefault();
    const input = event.target;
    const password = input.password.value.trim();
    const confirmPassword = input["confirm-password"].value.trim();
    const auth = getAuth();
    const element = this.shadowRoot.getElementById("btn-submit");
    const buttonText = "SUBMIT PASSWORD";
    const interval = startButtonLoadingAnimation(element, element);
    let displayMessage;
    let status;
    let user;
    let request;
    let response;
    let result;

    if (!confirmPasswordMatch(password, confirmPassword)) {
      console.info("Error: CreatePasswordElement passwords do not match");
      displayMessage = "The passwords you entered do not match.";
      endButtonLoadingAnimation(interval, element, element, buttonText);
      this._hideErrorHTML = false;
      this._userMessage = displayErrorMessage(displayMessage);
      return;
    }

    try {
      status = await validatePassword(auth, password);
      console.info("Promise completed: validatePassword()");
    } catch (error) {
      console.info(
        `Error: CreatePasswordElement invalid password. ${error.message}`,
      );
      displayMessage = `Please enter a valid password. ${error.message}`;
      endButtonLoadingAnimation(interval, element, element, buttonText);
      this._hideErrorHTML = false;
      this._userMessage = displayErrorMessage(displayMessage);
      return;
    }

    /* https://cloud.google.com/identity-platform/docs/password-policy */
    /* const currentPolicy = status.passwordPolicy;
    console.log(currentPolicy); */

    if (!status.isValid) {
      if (!status.containsUppercaseLetter) {
        displayMessage = "Passwords must contain one uppercase letter [A-Z]";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
      if (!status.containsLowercaseLetter) {
        displayMessage = "Passwords must contain one lowercase letter [a-z]";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
      if (!status.containsNonAlphanumericCharacter) {
        displayMessage =
          "Passwords must contain one non-alphanumeric special character";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
      if (!status.containsNumericCharacter) {
        displayMessage = "Passwords must contain one numeric character [0-9]";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
      if (!status.meetsMinPasswordLength) {
        displayMessage =
          "Passwords must be a minimum of 12 characters in length";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
      if (!status.meetsMaxPasswordLength) {
        displayMessage =
          "Passwords may not exceed a maximum of 18 characters in length";
        console.info(displayMessage);
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }
    }

    /* Google Security: For sign-in to succeed, the email address must match the address to which the sign-in link was originally sent. */
    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        await signInWithEmailLink(auth, this.email, window.location.href);
        console.info("Promise completed: signInWithEmailLink()");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            console.info(`
              Error: CreatePasswordElement invalid email address
              ${error}
            `);
            displayMessage = "Please enter a valid email address.";
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          case "auth/invalid-login-credentials":
            console.info(`
              Error: CreatePasswordElement invalid username or password. ${error}
            `);
            displayMessage = `Invalid username or password. ${error.message}`;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          default:
            console.info(`
              Error: CreatePasswordElement an unexpected error occurred:
              ${error}
            `);
            displayMessage = `An unexpected error occurred: ${error.message}`;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;
        }
      }
    }

    user = auth.currentUser;

    if (user) {
      const { accessToken } = user;

      request = new Request("/signup/auth/password", {
        method: "POST",
        headers: {
          "Token-Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          confirmPassword: confirmPassword,
        }),
      });

      try {
        response = await fetch(request);
        console.info("Fetch completed: /signup/auth/password");
      } catch (error) {
        console.info(`
          Error: CreatePasswordElement failed to fetch: /signup/auth/password
          ${error}
        `);
        displayMessage = error.message;
        endButtonLoadingAnimation(interval, element, element, buttonText);
        this._hideErrorHTML = false;
        this._userMessage = displayErrorMessage(displayMessage);
        return;
      }

      result = await response.json();

      if (result.message) {
        switch (result.message) {
          case "auth/invalid-access-token":
            console.info(
              `CreatePasswordElement ${result.message}\n${result.code}\n${result.error}`,
            );
            endButtonLoadingAnimation(interval, element, element, buttonText);
            window.location.replace("/signup");
            return;

          case "(400) Error: The passwords entered do not match":
            console.info("CreatePasswordElement", result.message);
            displayMessage = result.message;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          case "(500) Error: An unexpected error occurred":
            console.info(
              `CreatePasswordElement ${result.message}\n${result.code}\n${result.error}`,
            );
            displayMessage = `An unexpected error occurred. ${result.error}`;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          case "(201) Authentication password has been set":
            console.log(result.message);
            break;

          default:
            console.info(`
              Unknown Error: CreatePasswordElement an unexpected error occurred. /signup/auth/password
            `);
            displayMessage =
              "Unknown Error: CreatePasswordElement an unexpected error occurred. /signup/auth/password.";
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;
        }
      }

      /* Refresh tokens expire if a major account change is detected for the user including events like password or email address updates. So we must log back in after our update to persist the session into the next component. https://firebase.google.com/docs/auth/admin/manage-sessions */

      try {
        await signInWithEmailAndPassword(auth, this.email, password);
        console.info("Logged in");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            console.info(`
            Error: CreatePasswordElement invalid email address
            ${error}
          `);
            displayMessage = "Please enter a valid email address.";
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          case "auth/invalid-login-credentials":
            console.info(`
            Error: CreatePasswordElement invalid username or password. ${error}
          `);
            displayMessage = `Invalid username or password. ${error.message}`;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;

          default:
            console.info(`
            Error: CreatePasswordElement an unexpected error occurred:
            ${error}
          `);
            displayMessage = `An unexpected error occurred: ${error.message}`;
            endButtonLoadingAnimation(interval, element, element, buttonText);
            this._hideErrorHTML = false;
            this._userMessage = displayErrorMessage(displayMessage);
            return;
        }
      }
      endButtonLoadingAnimation(interval, element, element, buttonText);
      window.location.replace("/signup/creation");
    } else {
      endButtonLoadingAnimation(interval, element, element, buttonText);
      console.info(
        "Error: CreatePasswordElement Signup session expired. Send a new sign-up email and try again",
      );
      window.location.replace("/signup");
    }
  }

  viewLoginPassword(event) {
    event.preventDefault();
    const input = this.shadowRoot.getElementById("password");
    const img = this.shadowRoot.getElementById("img-visiblity");

    if (img.getAttribute("alt") === "⏿") {
      img.setAttribute("src", "../../img/visibility.svg");
      img.setAttribute("alt", "✗");
      input.setAttribute("type", "text");
    } else {
      img.setAttribute("src", "../../img/visibility_off.svg");
      img.setAttribute("alt", "⏿");
      input.setAttribute("type", "password");
    }
  }

  static styles = css`
    * {
      font-weight: 500;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    form {
      display: flex;
      overflow-x: hidden;
      flex-direction: column;
      max-width: 375px;
      margin: 0px auto;
    }
    label {
      font-size: 11px;
      color: rgb(110, 110, 110);
      letter-spacing: 0.5px;
      line-height: 16px;
    }
    #div-pwd-input {
      position: relative;
    }
    .div-input {
      min-height: 44px;
      padding: 11px 0;
    }
    input {
      font-size: 16px;
      color: rgb(110, 110, 110);
      line-height: 22px;
      outline: none;
      border: none;
      border-bottom: 0.5px solid rgb(110, 110, 110);
      width: 100%;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    input:focus {
      border-bottom: 1px solid black;
    }
    button {
      cursor: pointer;
      font-size: 14px;
      color: rgb(14, 14, 14);
      line-height: 22px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      width: 100%;
      min-height: 44px;
      padding: 0px 16px;
      margin-top: 10px;
      transition: 0.4s;
    }
    button:focus {
      border: 1px solid rgb(14, 14, 14);
      outline: none;
    }
    #btn-submit:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    #btn-view-password {
      font-size: 22px;
      text-align: center;
      background: transparent;
      position: absolute;
      top: 11px;
      right: 10px;
      width: 42px;
      height: 42px;
      padding: 0;
      margin: -7px;
    }
    .div-confirm-pwd {
      padding-top: 11px;
    }
    .p-email-address {
      font-size: 16px;
      padding: 11px 0;
    }
    #div-page-error {
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: 12px auto;
    }
    .btn-close-window {
      background-color: transparent;
      position: absolute;
      top: -5px;
      right: -5px;
      width: 42px;
      height: 42px;
      padding: 0;
      margin: -7px;
    }
    .p-error-message {
      font-size: 16px;
      font-weight: 400;
      color: rgb(206, 44, 48);
      line-height: 22px;
      text-align: center;
      padding: 4px;
      margin: 0;
    }
  `;

  render() {
    return html`
      <div id="div-page-error" ?hidden=${this._hideErrorHTML}>
        <button
          class="btn-close-window"
          @click=${() => {
            this._hideErrorHTML = true;
          }}
          aria-label="Button to close the error window"
          type="button"
        >
          ✗
        </button>

        <p class="p-error-message">${this._userMessage}</p>
      </div>

      <form @submit=${this.handleSubmit}>
        <p class="p-email-address">${this.email}</p>

        <label for="password">PASSWORD</label>
        <div id="div-pwd-input" class="div-input">
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            autocomplete="off"
            minlength="12"
            maxlength="32"
          />
          <button
            id="btn-view-password"
            type="button"
            aria-label="Show password button"
            @click=${this.viewLoginPassword}
          >
            <img
              id="img-visiblity"
              src="../../img/visibility_off.svg"
              alt="⏿"
            />
          </button>
        </div>

        <div class="div-confirm-pwd">
          <label for="confirm-password">CONFIRM PASSWORD</label>
          <div class="div-input">
            <input
              required
              type="password"
              placeholder="Confirm your password"
              name="confirm-password"
              id="confirm-password"
              autocomplete="off"
              minlength="12"
              maxlength="32"
            />
          </div>
        </div>

        <button
          id="btn-submit"
          type="submit"
          aria-label="Submit password button"
        >
          SUBMIT PASSWORD
        </button>
      </form>
    `;
  }
}

customElements.define("create-password-element", CreatePasswordElement);
