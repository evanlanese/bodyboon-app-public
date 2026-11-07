import { LitElement, html, css } from "lit";
import { ConfirmEmailElement } from "./forms/confirm-email-element.js";
import { CreatePasswordElement } from "./forms/create-password-element.js";
import { TermsAndPrivacyElement } from "../tos/terms-privacy-element.js";
import { GoogleTermsElement } from "../tos/google-terms-element.js";

export class AuthCreationElement extends LitElement {
  static properties = {
    email: { type: String },
  };

  constructor() {
    super();
    this.email = "";

    this.addEventListener("confirmed-email", (event) => {
      this.email = event.detail.email;
      this.hideEmailConfirmationForm();
    });
  }

  hideEmailConfirmationForm() {
    this.shadowRoot.getElementById("div-email-element").hidden = true;
    this.shadowRoot.getElementById("div-password-element").hidden = false;
  }

  displayEmailConfirmationForm() {
    this.shadowRoot.getElementById("div-email-element").hidden = false;
    this.shadowRoot.getElementById("div-password-element").hidden = true;
  }

  firstUpdated() {
    this.email = window.localStorage.getItem("emailForSignIn");

    if (!this.email) {
      this.displayEmailConfirmationForm();
      /* show btn-back as a way back to email confirmation page during password creation */
      this.shadowRoot.getElementById("btn-back").hidden = false;
      return;
    }

    this.hideEmailConfirmationForm();
    /* show btn-home if no email confirmation is necessary */
    this.shadowRoot.getElementById("btn-home").hidden = false;
    window.localStorage.removeItem("emailForSignIn");
  }

  static styles = css`
    * {
      font-size: 14px;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    a,
    .btn-back {
      font-weight: 500;
      color: rgb(14, 14, 14);
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: none;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
    }
    #btn-back {
      cursor: pointer;
      border: none;
      background-color: transparent;
    }
    section {
      padding-top: 66px;
      height: 100%;
      min-height: 100vh;
    }
    .div-container {
      min-height: 100%;
      padding: 33px;
      padding-bottom: 0px;
    }
    .div-flex-column {
      display: flex;
      flex-direction: column;
    }
    .div-navigation-bar {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      margin: 10px 0;
    }
    .div-main {
      max-width: 375px;
      padding: 33px 0;
      margin: auto;
    }
    h2 {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
    }
    p {
      color: rgb(110, 110, 110);
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
    }
    .div-password-policy {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: auto;
    }
    ul {
      margin-top: -10px;
    }
    li {
      font-style: italic;
      line-height: 18px;
    }
  `;

  render() {
    return html`
      <section id="div-email-element" class="div-container" hidden>
        <logo-element></logo-element>

        <div class="center">
          <div class="div-flex-column">
            <h2>Security Confirmation.</h2>
            <p>
              Please re-confirm your email address to finish the sign up
              process:
            </p>

            <confirm-email-element></confirm-email-element>
          </div>
        </div>
      </section>

      <section id="div-password-element" class="div-container" hidden>
        <div class="div-flex-column">
          <div class="div-navigation-bar">
            <button
              hidden
              id="btn-back"
              aria-label="Navigate to the email confirmation page."
              @click=${() => {
                this.displayEmailConfirmationForm();
              }}
            >
              ⤾ BACK TO EMAIL CONFIRMATION
            </button>
            <logo-element></logo-element>
          </div>

          <div class="div-main">
            <div class="div-flex-column">
              <h2>Create your Account Password.</h2>

              <div class="div-password-policy">
                <p>Passwords must contain:</p>
                <ul>
                  <li><span>one uppercase letter [A-Z]</span></li>
                  <li><span>one lowercase letter [a-z]</span></li>
                  <li><span>one non-alphanumeric special character</span></li>
                  <li><span>one numeric character [0-9]</span></li>
                  <li><span>be between 12 - 18 characters in length</span></li>
                </ul>
              </div>

              <create-password-element
                .email=${this.email}
              ></create-password-element>

              <terms-privacy-element></terms-privacy-element>

              <google-terms-element></google-terms-element>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("auth-creation-element", AuthCreationElement);
