import { LitElement, html, css } from "lit";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { TermsAndPrivacyElement } from "../../tos/terms-privacy-element.js";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";
import { displayErrorMessage } from "../../../app-functions/error-handling.js";

export class SignupFormElement extends LitElement {
  static properties = {
    _hideErrorHTML: { type: Boolean },
    _userMessage: { type: String },
  };

  constructor() {
    super();
    this._hideErrorHTML = true;
    this._userMessage = "";
  }

  async handleSubmit(event) {
    event.preventDefault();
    const input = event.target;
    const email = input.email.value.trim().toLowerCase();
    const auth = getAuth();
    const actionCodeSettings = {
      url: process.env.SIGNUP_ACTION_URL,
      handleCodeInApp: true,
    };
    const element = this.shadowRoot.getElementById("btn-signup");
    const buttonText = "SIGN UP";
    const interval = startButtonLoadingAnimation(element, element);
    let displayMessage;

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      console.info("Successfully sent signup email");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          console.info(`
              Error: SignupFormElement invalid email address
              ${error}
            `);
          displayMessage = "Please enter a valid email address.";
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        case "auth/too-many-requests":
          console.info(`
              Error: SignupFormElement Failed to send. The number of requests exceeds the maximum allowed. Try again in one hour.
            `);
          displayMessage =
            "Error: The number of requests exceeds the maximum allowed. Try again in one hour.";
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        default:
          console.info(`
              Error: SignupFormElement an unexpected error occurred:
              ${error}
            `);
          displayMessage = `An unexpected error occurred: ${error.message}`;
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;
      }
    }
    window.localStorage.setItem("emailForSignIn", email);
    endButtonLoadingAnimation(interval, element, element, buttonText);
    window.location.pathname = "/signup/sent";
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
    #btn-signup:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    #div-page-error {
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: auto auto 44px auto;
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
        <label for="email">EMAIL ADDRESS</label>
        <div class="div-input">
          <input
            required
            type="email"
            placeholder="Email address"
            name="email"
            id="email"
            autocomplete="off"
            minlength="10"
            maxlength="64"
          />
        </div>

        <terms-privacy-element></terms-privacy-element>

        <button id="btn-signup" type="submit" aria-label="Sign up button">
          SIGN UP
        </button>
      </form>
    `;
  }
}

customElements.define("signup-form-element", SignupFormElement);
