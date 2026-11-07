import { LitElement, html, css } from "lit";
import { LogoElement } from "../logo/logo-element.js";
import { RecoverFormElement } from "./forms/recover-form-element.js";
import { GoogleTermsElement } from "../tos/google-terms-element.js";

export class ForgotPasswordElement extends LitElement {
  static styles = css`
    * {
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      text-align: center;
      box-sizing: border-box;
    }
    a {
      font-size: 14px;
      font-weight: 500;
      color: rgb(14, 14, 14);
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: none;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
    }
    section {
      height: 100%;
      min-height: 100vh;
    }
    .div-container {
      min-height: 100%;
      padding: 33px;
    }
    .div-flex-column {
      display: flex;
      flex-direction: column;
    }
    .div-navigation-bar {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }
    .div-main {
      max-width: 375px;
      padding: 66px 0;
      margin: auto;
    }
    h1 {
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
      margin: 0 22px 44px 22px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <section>
        <div class="div-container div-flex-column">
          <div class="div-navigation-bar">
            <logo-element></logo-element>

            <a
              title="The log in page."
              aria-label="Navigate to the log in page."
              href="/login"
              >LOG IN</a
            >
          </div>

          <div class="div-main">
            <div class="div-flex-column">
              <h1>Forgot Password</h1>

              <p>
                Enter your account's email and we'll send you an email to reset
                the password.
              </p>

              <recover-form-element></recover-form-element>

              <google-terms-element></google-terms-element>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("forgot-password-element", ForgotPasswordElement);
