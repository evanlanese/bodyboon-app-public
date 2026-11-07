import { LitElement, html, css } from "lit";
import { LogoElement } from "../logo/logo-element.js";
import { SignupFormElement } from "./forms/signup-form-element.js";
import { GoogleTermsElement } from "../tos/google-terms-element.js";

export class SignupElement extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    * {
      font-size: 14px;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    a {
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
      text-align: center;
      margin: 10px 0;
    }
    .div-main {
      padding: 66px 0;
    }
    h1 {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
      margin-bottom: 44px;
    }
  `;

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
              <h1>Create Your Account</h1>

              <signup-form-element></signup-form-element>

              <google-terms-element></google-terms-element>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("signup-element", SignupElement);
