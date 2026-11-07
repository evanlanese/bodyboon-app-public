import { LitElement, html, css } from "lit";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";
import { displayErrorMessage } from "../../../app-functions/error-handling.js";

export class RecoverFormElement extends LitElement {
  static properties = {
    _hideErrorHTML: { type: Boolean },
    _userMessage: { type: String },
    _hideSuccessHTML: { type: Boolean },
  };

  constructor() {
    super();
    this._hideErrorHTML = true;
    this._userMessage = "";
    this._hideSuccessHTML = true;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const input = event.target;
    const email = input.email.value.trim().toLowerCase();
    const auth = getAuth();
    const element = this.shadowRoot.getElementById("btn-recovery");
    const buttonText = "SEND EMAIL";
    const interval = startButtonLoadingAnimation(element, element);
    let displayMessage;

    try {
      await sendPasswordResetEmail(auth, email);
      console.info("Successfully sent password reset email");
      displayMessage = `If an account exists for ${email}, you will 
      get an email with instructions on resetting your password. 
      If it doesn't arrive, be sure to check your spam folder.`;
      endButtonLoadingAnimation(interval, element, element, buttonText);
      this._hideSuccessHTML = false;
      this._userMessage = displayErrorMessage(displayMessage);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          console.info(`
              Error: Invalid email address
              ${error}
            `);
          displayMessage = "Please enter a valid email address.";
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        case "auth/too-many-requests":
          console.info(`
              Error: Failed to send. The number of requests exceeds the maximum allowed. Try again in one hour.
            `);
          displayMessage =
            "Error: The number of requests exceeds the maximum allowed. Try again in one hour.";
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        default:
          console.info(`
              Error: An unexpected error occurred:
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

  static styles = css`
    * {
      font-weight: 500;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    a {
      font-size: 16px;
      color: rgb(14, 14, 14);
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: none;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
      padding-top: 11px;
    }
    form {
      display: flex;
      flex-direction: column;
      max-width: 375px;
      margin: 0px auto;
      overflow: hidden;
    }
    label {
      font-size: 11px;
      color: rgb(110, 110, 110);
      letter-spacing: 0.5px;
      line-height: 16px;
      text-align: start;
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
    #btn-recovery:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    #div-page-error {
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: auto auto 44px auto;
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
    #div-page-success {
      border: 1px solid rgb(25, 135, 84);
      border-radius: 5px;
      background-color: rgba(242, 242, 242, 0.3);
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: auto auto 44px auto;
    }
    .div-flex-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0px auto;
    }
    .p-success-message {
      font-size: 16px;
      font-weight: 400;
      color: rgb(14, 14, 14);
      line-height: 22px;
      text-align: center;
      padding: 4px;
      margin: 0;
    }
  `;

  render() {
    return html`
      <div id="div-page-success" ?hidden=${this._hideSuccessHTML}>
        <div class="div-flex-column">
          <button
            class="btn-close-window"
            @click=${() => {
              this._hideSuccessHTML = true;
            }}
            aria-label="Button to close the error window"
            type="button"
          >
            ✗
          </button>

          <p class="p-success-message">${this._userMessage}</p>

          <a
            title="The log in page."
            aria-label="Navigate to the log in page."
            href="/login"
            >⤾ BACK TO LOG IN</a
          >
        </div>
      </div>

      <div id="div-page-error" ?hidden=${this._hideErrorHTML}>
        <button
          class="btn-close-window"
          @click=${() => {
            this._hideErrorHTML = true;
          }}
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

        <button
          id="btn-recovery"
          type="submit"
          aria-label="Button to send password recovery email"
        >
          SEND EMAIL
        </button>
      </form>
    `;
  }
}

customElements.define("recover-form-element", RecoverFormElement);
