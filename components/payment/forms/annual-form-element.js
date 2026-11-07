import { LitElement, html, css } from "lit";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";

export class AnnualFormElement extends LitElement {
  static properties = {
    _priceId: { type: String },
    _interval: { type: Number },
    clearInterval: { type: Boolean },
  };

  constructor() {
    super();
    this._priceId = process.env.ANNUAL_PRICE_ID;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("clearInterval")) {
      if (this.clearInterval) {
        const element = this.shadowRoot.getElementById("btn-checkout");
        const buttonText = "CHECKOUT";
        endButtonLoadingAnimation(this._interval, element, element, buttonText);
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const priceId = event.target.priceId.value;
    const element = this.shadowRoot.getElementById("btn-checkout");
    this._interval = startButtonLoadingAnimation(element, element);

    const options = {
      detail: {
        priceId: priceId,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("checkout", options));
  }

  static styles = css`
    * {
      font-weight: 500;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    form {
      max-width: 375px;
      margin: auto;
      overflow: hidden;
    }
    .div-grid {
      display: grid;
      gap: 33px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      margin-bottom: 11px;
    }
    button {
      cursor: pointer;
      font-size: 16px;
      color: rgb(14, 14, 14);
      line-height: 22px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 2px;
      padding: 42px 42px;
      transition: 0.4s;
    }
    button:focus {
      border: 2px solid black;
      outline: none;
    }
    button:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    .div-price-grid {
      display: grid;
      grid-gap: 4px;
      justify-content: center;
      grid-template-columns: 10px 36px 24px;
      grid-template-rows: 56px 40px;
      row-gap: 4px;
    }
    .p-usd-symbol {
      font-size: 24px;
      font-weight: 300;
      padding-top: 4px;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    .p-usd-price {
      font-size: 64px;
      font-weight: 300;
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
    .div-usd-decimal {
      display: flex;
      align-items: end;
      margin-left: -4px;
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }
    .p-usd-decimal {
      align-items: end;
      font-size: 14px;
      font-weight: 300;
      padding-bottom: 4px;
    }
    .p-usd-month {
      font-size: 16px;
      text-align: end;
      margin-top: 8px;
      margin-right: 3px;
      grid-column: 1 / 4;
      grid-row: 2 / 3;
    }
    .div-descriptors-container {
      height: 50px;
    }
    .div-descriptors {
      font-size: 11px;
      line-height: 16px;
      text-align: center;
    }
    .p-savings {
      font-size: 13px;
    }
    span {
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="div-grid">
          <div>
            <input type="hidden" name="priceId" value=${this._priceId} />

            <button
              id="btn-checkout"
              type="submit"
              aria-label="Checkout button for an annual subscription"
            >
              CHECKOUT
            </button>
          </div>

          <div>
            <div class="div-price-grid">
              <p class="p-usd-symbol">$</p>
              <p class="p-usd-price">6</p>
              <div class="div-usd-decimal">
                <p class="p-usd-decimal">.45</p>
              </div>
              <p class="p-usd-month">/month</p>
            </div>
          </div>
        </div>

        <div class="div-descriptors-container">
          <div class="div-grid">
            <div class="div-descriptors">
              <p>CANCEL AT ANY TIME.</p>
            </div>

            <div class="div-descriptors">
              <p class="p-savings">Save <span>25%</span></p>
              <p class="p-savings"><span>$77.40</span> BILLED ANNUALLY</p>
              <p>YEARLY MEMBERSHIP</p>
            </div>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define("annual-form-element", AnnualFormElement);
