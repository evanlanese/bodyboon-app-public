import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import {
  detailsContext,
  recommendationsContext,
  trackingContext,
} from "../../app-functions/context.js";
import { NewDetailsElement } from "./children/new-details-element.js";
import { NutrientIntakeElement } from "./children/nutrient-intake-element.js";
import { ManageDetailsElement } from "./children/manage-details-element.js";

export class TrackingElement extends LitElement {
  static properties = {
    details: { type: Array },
    nutrientTotals: { type: Array },
    recommendations: { type: Array },
    recommendationsConsumer: { type: Object },
    trackingConsumer: { type: Object },
  };

  constructor() {
    super();
    this.detailsConsumer = new ContextConsumer(this, {
      context: detailsContext,
      subscribe: true,
    });
    this.recommendationsConsumer = new ContextConsumer(this, {
      context: recommendationsContext,
      subscribe: true,
    });
    this.trackingConsumer = new ContextConsumer(this, {
      context: trackingContext,
      subscribe: true,
    });
  }

  async willUpdate(changedProperties) {
    if (this.recommendationsConsumer.value) {
      this.recommendations = this.recommendationsConsumer.value;
    }

    if (this.trackingConsumer.value) {
      this.nutrientTotals = [this.trackingConsumer.value];
    }

    if (this.detailsConsumer.value) {
      this.details = [...this.detailsConsumer.value];

      await this.updateComplete;
      // THIS COMPONENT MUST COMPLETE THE UPDATE TO VIEW SHADOWROOT & SET HIDDEN ATTRIBUTES
      if (!this.details.length) {
        this.shadowRoot.getElementById("div-new-user").hidden = false;
        this.shadowRoot.querySelector("new-details-element").hidden = true;
        this.shadowRoot.querySelector("nutrient-intake-element").hidden = true;
        this.shadowRoot.querySelector("manage-details-element").hidden = true;
      } else {
        this.shadowRoot.getElementById("div-new-user").hidden = true;
        this.shadowRoot.querySelector("new-details-element").hidden = true;
        this.shadowRoot.querySelector("nutrient-intake-element").hidden = false;
        this.shadowRoot.querySelector("manage-details-element").hidden = false;
      }
    }
  }

  triggerNewUserForm() {
    this.shadowRoot.getElementById("div-new-user").hidden = true;
    this.shadowRoot.querySelector("new-details-element").hidden = false;
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      word-break: break-word;
      color: rgb(238, 238, 238);
    }
    :host {
      display: grid;
      grid-template-columns: 0.5fr minmax(360px, 720px) 0.5fr;
      grid-template-rows: 1fr;
    }
    section {
      grid-column: 2 / 3;
      min-width: 360px;
      padding: 10px;
      margin: auto;
    }
    .div-log-container {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr
      grid-template-rows: 1fr;
    }
    .div-log-heading {
      grid-column: 2 / 3;
      display: grid;
      gap: 5px;
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr;
    }
    .div-flex-h2 {
      display: flex;
      gap: 11px;
      align-items: end;
    }
    .div-flex-h2 img {
      padding: 3px 0;
    }
    h2 {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    h2 span {
      font-size: 18px;
    }
    .p-log-heading {
      font-size: 14px;
      font-style: italic;
      opacity: 0.7;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .p-log-heading img {
      width: 16px;
      height: 16px;
      margin-bottom: -2px;
    }

    #div-new-user {
      padding: 20px;
      margin-top: 40px;
    }
    .div-new-user-hero-grid {
      display: grid;
      grid-template-columns: 1fr 0.5fr;
      grid-template-rows: 1fr;
      gap: 5px;
      justify-content: center;
    }
    .div-new-user-hero-grid p {
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .div-new-user-button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    button {
      cursor: pointer;
      font-size: 11px;
      background-color: rgb(34, 40, 49);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      width: 128px;
      height: 64px;
      text-transform: uppercase;
      transition-duration: 300ms;
    }
    button:hover {
      background-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }
    .p-dri-disclaimer {
      font-size: 12px;
      font-style: italic;
      letter-spacing: 0.5px;
      line-height: 16px;
      margin-top: 40px;
    }
  `;

  // ADD A WAY FOR USERS TO EDIT THEIR DETAILS!!!
  // IF PROPERTY CHANGES -> REVEAL A SAVE BUTTON...

  render() {
    return html`
      <section>
        <div class="div-log-container">
          <div class="div-log-heading">
            <div class="div-flex-h2">
              <img
                src="../../img/conditions-light.svg"
                alt="Symbol of a person"
              />
              <h2>
                T<span>odays</span> N<span>utrient</span> I<span>ntake</span>
              </h2>
            </div>
            <p class="p-log-heading">
              Log each recipe you eat during the day in
              <img
                src="../img/dining-light.svg"
                alt="Symbol of a fork and spoon"
              />
              to view progress and pinpoint missing nutrition here.<br />
              Manage your goals by navigating below the nutrient charts.
            </p>
          </div>
        </div>

        <div id="div-new-user" hidden>
          <div class="div-new-user-hero-grid">
            <p>
              Our interactive tool calculates your unique daily nutrient
              recommendations for modern planning.
            </p>
            <div class="div-new-user-button">
              <button @click=${this.triggerNewUserForm} type="button">
                Get Started
              </button>
            </div>
          </div>

          <p class="p-dri-disclaimer">
            *Calculations are based on the Dietary Reference Intakes (DRIs)
            established by the Food and Nutrition Board of the National
            Academies of Sciences, Engineering and Medicine. While this data
            represents current scientific knowledge on nutrient needs,
            individual requirements may be higher or lower than these
            recommendations.
          </p>
        </div>
        <new-details-element hidden></new-details-element>

        <nutrient-intake-element
          hidden
          .recommendations=${this.recommendations}
          .nutrientTotals=${this.nutrientTotals}
        ></nutrient-intake-element>
        <manage-details-element
          hidden
          .details=${this.details}
        ></manage-details-element>
      </section>
    `;
  }
}

customElements.define("tracking-element", TrackingElement);
