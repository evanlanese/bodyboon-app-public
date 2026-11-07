import { LitElement, html, css } from "lit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogoElement } from "../logo/logo-element.js";
import { MonthlySubFormElement } from "./forms/monthly-sub-form.js";
import { AnnualFormElement } from "./forms/annual-form-element.js";
import { displayErrorMessage } from "../../app-functions/error-handling.js";

export class StripeCheckoutElement extends LitElement {
  static properties = {
    _hideErrorHTML: { type: Boolean },
    _userMessage: { type: String },
    clearInterval: { type: Boolean },
  };

  constructor() {
    super();
    this._hideErrorHTML = true;
    this._userMessage = "";

    this.addEventListener("checkout", async (event) => {
      const priceId = event.detail.priceId;
      const auth = getAuth();
      const user = auth.currentUser;
      let displayMessage;
      let request;
      let response;
      let result;

      if (user) {
        const { accessToken } = user;

        request = new Request("/payment/stripe/session", {
          method: "POST",
          headers: {
            "Token-Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: priceId,
          }),
        });

        try {
          response = await fetch(request);
          console.info("Successful fetch: /payment/stripe/session");
        } catch (error) {
          console.info(`
            Error: StripeCheckoutElement failed to fetch: /payment/stripe/session
            ${error}
          `);
          displayMessage = error.message;
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          this.clearInterval = true;
          return;
        }

        result = await response.json();

        if (result.message) {
          switch (result.message) {
            case "(400) Critical Error: Invalid product price id":
              console.info("StripeCheckoutElement", result.message);
              displayMessage = result.message;
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              this.clearInterval = true;
              return;

            case "auth/invalid-access-token":
              console.info(
                `StripeCheckoutElement ${result.message}\n${result.code}\n${result.error}`,
              );
              this.clearInterval = true;
              window.location.replace("/login");
              return;

            case "(500) Error: An unexpected error occurred":
              console.info(
                `StripeCheckoutElement ${result.message}\n${result.code}\n${result.error}`,
              );
              displayMessage = result.message;
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              this.clearInterval = true;
              return;

            case "(500) Error: No user document found during create checkout session":
              console.info(
                "Error: StripeCheckoutElement No user document found to create a checkout session",
              );
              this.clearInterval = true;
              window.location.pathname = "/signup/creation";
              return;

            case "(500) Error: No payment customer found during create checkout session":
              console.info(
                "Error: StripeCheckoutElement Payment customer not found",
              );
              this.clearInterval = true;
              window.location.pathname = "/signup/creation";
              return;

            case "(201) Successfully created a checkout session":
              console.info(result.message);
              this.clearInterval = true;
              window.location = result.url;
              return;

            default:
              console.info(`
                Error: StripeCheckoutElement an unexpected error occurred:
                ${error}
              `);
              displayMessage = result.message;
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              this.clearInterval = true;
              return;
          }
        }
      } else {
        console.info("Error: Authorization expired. Log back in");
        this.clearInterval = true;
        window.location.replace("/login");
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        return;
      } else {
        console.info("Error: Authorization expired. Log back in");
        window.location.pathname = "/login";
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  planSelection(event) {
    event.preventDefault();
    const id = event.target.id;
    let element;

    if (id === "btn-yearly-plan") {
      element = this.shadowRoot.getElementById("btn-yearly-plan");
      element.classList.add("div-selected-plan");
      element = this.shadowRoot.getElementById("btn-monthly-plan");
      element.classList.remove("div-selected-plan");
      element = this.shadowRoot.getElementById("div-monthly-plan").hidden =
        true;
      element = this.shadowRoot.getElementById("div-annual-plan").hidden =
        false;
    }
    if (id === "btn-monthly-plan") {
      element = this.shadowRoot.getElementById("btn-monthly-plan");
      element.classList.add("div-selected-plan");
      element = this.shadowRoot.getElementById("btn-yearly-plan");
      element.classList.remove("div-selected-plan");
      element = this.shadowRoot.getElementById("div-annual-plan").hidden = true;
      element = this.shadowRoot.getElementById("div-monthly-plan").hidden =
        false;
    }
  }

  static styles = css`
    * {
      font-size: 14px;
      font-weight: 400;
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
      padding: 11px;
    }
    .div-navigation-bar {
      padding: 11px 22px;
    }
    .div-main {
      max-width: 375px;
      padding-top: 11px;
      margin: auto;
    }
    h1 {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
      margin-bottom: 66px;
    }
    h3 {
      text-align: center;
      margin-top: 44px;
    }
    p {
      font-size: 16px;
      text-align: center;
      margin: 0px;
    }
    button {
      cursor: pointer;
      font-size: 11px;
      color: rgb(14, 14, 14);
      line-height: 18px;
      background-color: transparent;
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      width: 85px;
      transition: 0.4s;
      margin: 1px;
    }
    button:focus {
      color: white;
      background-color: rgb(14, 14, 14);
      outline: none;
    }
    .div-selected-plan {
      color: rgb(14, 14, 14);
      background-color: rgb(242, 242, 242);
      border-color: rgb(14, 14, 14);
      border-style: solid;
      border-width: 1px;
    }
    .div-subscription-options {
      max-width: 375px;
      padding-bottom: 44px;
      margin: auto;
    }
    .div-subscription-buttons {
      display: flex;
      justify-content: end;
    }
    .div-lit-elements {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }
    .div-additional-facts {
      max-width: 375px;
      margin: auto;
    }
    ul {
      margin-top: 22px;
    }
    li {
      font-style: italic;
      line-height: 22px;
    }
    #div-page-error {
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: auto auto 44px auto;
    }
    #div-page-error a {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
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
      max-width: 375px;
      padding-top: 8px;
      padding-bottom: 16px;
      margin: 0;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-container">
          <div class="div-navigation-bar">
            <logo-element></logo-element>
          </div>

          <div class="div-main">
            <div>
              <h1>
                Happiness is simple.<br />
                Eat Great.
              </h1>

              <div id="div-page-error" ?hidden=${this._hideErrorHTML}>
                <button
                  class="btn-close-window"
                  @click=${() => {
                    this._hideErrorHTML = true;
                  }}
                  aria-label="Button to close the error window"
                >
                  ✗
                </button>
                <p class="p-error-message">${this._userMessage}</p>
                <a
                  title="The log in page."
                  aria-label="Navigate to the log in page."
                  href="/login"
                  >⤾ LOG IN</a
                >
              </div>

              <div class="div-subscription-options">
                <div class="div-subscription-buttons">
                  <button
                    id="btn-yearly-plan"
                    class="div-selected-plan"
                    @click=${this.planSelection}
                    aria-label="Button to filter checkout options by yearly subscription plan"
                  >
                    YEARLY
                  </button>
                  <button
                    id="btn-monthly-plan"
                    @click=${this.planSelection}
                    aria-label="Button to filter checkout options by months subscription plan"
                  >
                    MONTHLY
                  </button>
                </div>
              </div>

              <div class="div-lit-elements">
                <div id="div-annual-plan">
                  <annual-form-element
                    .clearInterval=${this.clearInterval}
                  ></annual-form-element>
                </div>
                <div id="div-monthly-plan" hidden>
                  <monthly-sub-element
                    .clearInterval=${this.clearInterval}
                  ></monthly-sub-element>
                </div>
              </div>

              <h3>Membership Features</h3>

              <div class="div-additional-facts">
                <ul>
                  <li><span>Analyze and track the nutrition of any recipe during your day.</span></li>
                  <li><span>Make edits on the fly using our simplified user interface.</span></li>
                  <li><span>Receive exclusive insight into your particular set of circumstances & diet.</span></li>
                  <li><span>Access our service on any mobile or web platform.</span></li>
                </ul>
              </div>

              <h3>Advanced Nutrition Data</h3>

              <div class="div-additional-facts">
                <ul>
                  <li><span>Our data represents the current in scientific knowledge on physical nutrient needs.</span></li>
                  <li><span>Every entry is verified for accuracy.</span></li>
                  <li><span>Checkmark 44x essential nutrients & thousands of ingredients to choose from.</span></li>
                  <li><span>Personalized dietary recommendations based on individual age, height, sex, weight & activity level.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("stripe-checkout-element", StripeCheckoutElement);
