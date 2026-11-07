import { LitElement, html, css } from "lit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";
import { displayErrorMessage } from "../../../app-functions/error-handling.js";

export class LoginFormElement extends LitElement {
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
    const password = input.password.value.trim();
    const auth = getAuth();
    const element = this.shadowRoot.getElementById("btn-login");
    const buttonText = "LOG IN";
    const interval = startButtonLoadingAnimation(element, element);
    let displayMessage;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.info("Logged in");
      endButtonLoadingAnimation(interval, element, element, buttonText);
      window.location.pathname = "/";
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          console.info(`
            Error: LoginFormElement invalid email address
            ${error}
          `);
          displayMessage = "Please enter a valid email address.";
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        case "auth/invalid-login-credentials":
          console.info(`
            Error: LoginFormElement invalid username or password. ${error}
          `);
          displayMessage = `Invalid username or password. ${error.message}`;
          endButtonLoadingAnimation(interval, element, element, buttonText);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;

        default:
          console.info(`
            Error: LoginFormElement an unexpected error occurred:
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
      outline: none;
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
    #div-pwd-input {
      position: relative;
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
    input::-webkit-credentials-auto-fill-button {
      visibility: hidden;
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
    #btn-login:hover {
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

        <button id="btn-login" type="submit" aria-label="Log in button">
          LOG IN
        </button>
      </form>
    `;
  }
}

customElements.define("login-form-element", LoginFormElement);
