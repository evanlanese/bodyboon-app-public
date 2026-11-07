import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { emailContext } from "../../app-functions/context.js";
import { LogoutElement } from "../logout/logout-element.js";

export class SettingsElement extends LitElement {
  static properties = {
    username: { type: String },
    domain: { type: String },
  };

  constructor() {
    super();
    this.emailConsumer = new ContextConsumer(this, {
      context: emailContext,
      subscribe: true,
    });

    this.username = undefined;
    this.domain = undefined;
  }

  async willUpdate() {
    if (this.emailConsumer.value) {
      const splitEmail = this.emailConsumer.value.split("@");
      this.username = splitEmail[0];
      this.domain = splitEmail[1];
    }
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      color: rgb(14, 14, 14);
    }
    :host {
      display: grid;
      grid-template-columns: 0.5fr minmax(360px, 500px) 0.5fr;
      grid-template-rows: 1fr;
    }
    section {
      grid-column: 2 / 3;
      padding: 60px;
      margin: 20px;
      border: 1px solid white;
      border-radius: 5px;
    }
    button {
      cursor: pointer;
      font-size: 12px;
      text-transform: uppercase;
      line-height: 22px;
      letter-spacing: 0.5px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      width: 100%;
      min-height: 44px;
      padding: 0px 16px;
      transition: 0.4s;
    }
    button::first-letter {
      font-size: 14px;
    }
    button:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    button:focus {
      border: 1px solid rgb(14, 14, 14);
    }
  `;

  render() {
    return html`
      <section>
        <div>
          <a
            target="_blank"
            title="Stripe customer billing portal."
            aria-label="Navigate to your Stripe billing portal."
            href="${process.env.STRIPE_BILLING_PORTAL}?prefilled_email"
            ="${this.username}%40${this.domain}"
          >
            <button type="button">Billing Details</button>
          </a>
        </div>

        <logout-element></logout-element>
      </section>
    `;
  }
}

customElements.define("settings-element", SettingsElement);
