import { LitElement, html, css } from "lit";
import { LogoElement } from "../logo/logo-element.js";

export class SignupSentElement extends LitElement {
  static styles = css`
    * {
      font-size: 16px;
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
      padding: 132px 0;
      max-width: 375px;
      margin: auto;
    }
    p {
      line-height: 24px;
      text-align: center;
      text-transform: uppercase;
    }
    span {
      font-size: 12px;
      font-style: italic;
      line-height: 18px;
      margin: 33px;
      text-align: center;
    }
    .logo {
      position: relative;
      border: 1px solid black;
      width: 42px;
      height: 42px;
      margin: auto;
    }
    .logo p {
      color: rgb(14, 14, 14);
      font-family: "Kalnia", serif;
      font-size: 22px;
      line-height: 30px;
      text-align: center;
      padding: 0;
      margin: 0;
    }
    .top-left {
      position: absolute;
      top: -4px;
      left: 2.5px;
    }
    .top-right {
      position: absolute;
      top: -4px;
      right: 2.5px;
    }
    .bot-left {
      position: absolute;
      bottom: -4px;
      left: 2.5px;
    }
    .bot-right {
      position: absolute;
      bottom: -4px;
      right: 2.5px;
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
              <p><b>A verification email has been sent!</b></p>
              <p>Click on the link inside to finish account creation.</p>
              <span>If no email is found, please check your spam folder.</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("signup-sent-element", SignupSentElement);
