import { LitElement, html, css } from "lit";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";

export class ManageDetailsElement extends LitElement {
  static properties = {
    details: { type: Array },
    gender: { type: String },
    childing: { type: String },
    age: { type: Number },
    feet: { type: Number },
    inches: { type: Number },
    weight: { type: Number },
    activity: { type: String },
    intervalId: { type: Number },
  };

  constructor() {
    super();
    this.details = [];
    this.gender = "";
    this.childing = "none";
    this.age = 0;
    this.feet = 0;
    this.inches = 0;
    this.weight = 0;
    this.activity = "";
    this.intervalId = undefined;
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("details")) {
      if (!this.details || !this.details.length) {
        return;
      }
      this.gender = this.details[0].gender;
      this.childing = this.details[0].childing;
      this.age = this.details[0].age;
      this.feet = this.details[0].feet;
      this.inches = this.details[0].inches;
      this.weight = this.details[0].weight;
      this.activity = this.details[0].activity;

      await this.updateComplete;
      return;
    }

    if (changedProperties.has("age")) {
      if (!this.age) {
        return;
      }

      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }
    if (changedProperties.has("feet")) {
      if (!this.feet) {
        return;
      }

      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }
    if (changedProperties.has("inches")) {
      if (!this.inches) {
        return;
      }

      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }
    if (changedProperties.has("weight")) {
      if (!this.weight) {
        return;
      }

      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }

    if (changedProperties.has("activity")) {
      if (!this.activity.length) {
        return;
      }

      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }

    if (changedProperties.has("gender")) {
      if (!this.gender.length) {
        return;
      }
      if (this.gender === "male") {
        const details = {
          activity: this.activity,
          gender: this.gender,
          childing: this.childing,
          age: this.age,
          weight: this.weight,
          feet: this.feet,
          inches: this.inches,
        };

        this.modifyUserDetails(details);
        // RETURN HERE BECAUSE CHILDING WILL EQUAL "NONE"
      } else {
        const details = {
          activity: this.activity,
          gender: this.gender,
          childing: this.childing,
          age: this.age,
          weight: this.weight,
          feet: this.feet,
          inches: this.inches,
        };

        this.modifyUserDetails(details);
      }
      return;
    }

    if (changedProperties.has("childing")) {
      if (!this.childing.length) {
        return;
      }
      const details = {
        activity: this.activity,
        gender: this.gender,
        childing: this.childing,
        age: this.age,
        weight: this.weight,
        feet: this.feet,
        inches: this.inches,
      };

      this.modifyUserDetails(details);
      return;
    }
  }

  async updated(changedProperties) {
    if (changedProperties.has("gender")) {
      if (!this.gender.length) {
        return;
      }

      if (this.gender === "male") {
        this.shadowRoot
          .getElementById("btn-female")
          .classList.remove("selected-button");
        this.shadowRoot
          .getElementById("btn-male")
          .classList.add("selected-button");
        this.childing = "none";
        this.shadowRoot
          .getElementById("btn-none")
          .classList.add("selected-button");
      }
      if (this.gender === "female") {
        this.shadowRoot
          .getElementById("btn-male")
          .classList.remove("selected-button");
        this.shadowRoot
          .getElementById("btn-female")
          .classList.add("selected-button");
        this.shadowRoot
          .getElementById("btn-none")
          .classList.remove("selected-button");
        let buttonId = `btn-${this.childing}`;
        this.shadowRoot
          .getElementById(buttonId)
          .classList.add("selected-button");
      }
    }

    if (changedProperties.has("activity")) {
      if (!this.activity.length) {
        return;
      }
      let buttonId = `btn-${this.activity}`;
      this.shadowRoot.getElementById(buttonId).classList.add("selected-button");
    }
  }

  async modifyUserDetails(details) {
    const options = {
      detail: {
        details: details,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("modify-details", options));
  }

  editGender(event) {
    if (this.gender === event.target.value) {
      return;
    }
    this.gender = event.target.value;
    let buttonId;

    if (this.gender === "male") {
      if (this.childing) {
        buttonId = `btn-${this.childing}`;
        this.shadowRoot
          .getElementById(buttonId)
          .classList.remove("selected-button");
      }
      this.childing = "none";
      buttonId = "btn-none";
      this.shadowRoot.getElementById(buttonId).classList.add("selected-button");

      this.shadowRoot
        .getElementById("btn-female")
        .classList.remove("selected-button");
      this.shadowRoot
        .getElementById("btn-male")
        .classList.add("selected-button");
    }

    if (this.gender === "female") {
      this.shadowRoot
        .getElementById("btn-male")
        .classList.remove("selected-button");
      this.shadowRoot
        .getElementById("btn-female")
        .classList.add("selected-button");
    }
  }

  editChilding(event) {
    if (this.childing === event.target.value) {
      return;
    }
    let buttonId;

    buttonId = `btn-${this.childing}`;
    this.shadowRoot
      .getElementById(buttonId)
      .classList.remove("selected-button");

    this.childing = event.target.value;
    buttonId = `btn-${this.childing}`;
    this.shadowRoot.getElementById(buttonId).classList.add("selected-button");
  }

  editActivity(event) {
    if (this.activity === event.target.value) {
      return;
    }
    let buttonId;

    if (this.activity) {
      buttonId = `btn-${this.activity}`;
      this.shadowRoot
        .getElementById(buttonId)
        .classList.remove("selected-button");
    }

    this.activity = event.target.value;
    buttonId = `btn-${this.activity}`;
    this.shadowRoot.getElementById(buttonId).classList.add("selected-button");
  }

  focusInput(event) {
    event.target.select();
  }

  async saveInput(event) {
    let input = event.target.value.trim();
    const name = event.target.name;

    if (input === null || input === undefined) {
      return;
    }

    if (input.length > 3) {
      return;
    }

    input = Number(input);
    // EMPTY INPUT OR STRINGS DEFAULT TO NUMBER 0

    if (name === "age" || name === "feet" || name === "weight") {
      if (!input) {
        return;
      }
    }

    if (name === "age") {
      input = Number(input.toFixed(1));

      if (input < 0 || input > 120) {
        return;
      }

      if (input > 3) {
        input = Number(input.toFixed());
      }

      if (input === this.age) {
        return;
      }

      this.age = input;
      return;
    }

    if (name === "feet") {
      input = Number(input.toFixed());

      if (input < 1 || input > 8) {
        return;
      }

      if (input === this.feet) {
        return;
      }

      this.feet = input;
      return;
    }

    if (name === "inches") {
      input = Number(input.toFixed());

      if (input < 0 || input > 11) {
        return;
      }

      if (input === this.inches) {
        return;
      }

      this.inches = input;
      return;
    }

    if (name === "weight") {
      input = Number(input.toFixed());

      if (input < 1 || input > 999) {
        return;
      }

      if (input === this.weight) {
        return;
      }

      this.weight = input;
      return;
    }
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    button {
      color: rgb(238, 238, 238);
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      transition-duration: 300ms;
    }
    button:hover {
      background-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }
    .selected-button {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }

    section {
      display: flex;
      gap: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      margin: auto;
    }

    .div-details-container {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr
      grid-template-rows: 1fr;
    }
    .div-details-heading {
      grid-column: 2 / 3;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 0 10px;
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
    .p-details-heading {
      font-size: 14px;
      font-style: italic;
      opacity: 0.7;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .p-details-heading span {
      color: rgb(0, 173, 181);
      font-size: 14px;
      font-style: normal;
    }

    form {
      display: grid;
      grid-template-columns: 1fr;
    }
    .div-activity-level-container {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 10px 0;
      min-width: 340px;
    }
    .div-activity-level-button {
      width: 100%;
      margin: auto;
    }
    #btn-sedentary,
    #btn-low,
    #btn-active,
    #btn-very {
      width: 100%;
      height: 48px;
      border-radius: 5px;
    }
    .p-activity-button {
      font-size: 13px;
      pointer-events: none;
    }
    .p-activity-button span {
      font-size: 11px;
      font-style: italic;
      font-weight: 300;
    }

    .div-top-container {
      display: flex;
      gap: 25px;
      justify-content: center;
    }
    .div-gender-button-container {
      display: flex;
      gap: 5px;
    }
    .div-gender-button-container button {
      font-size: 12px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .div-childing-container {
      padding: 10px 0;
    }
    .div-childing-buttons {
      display: flex;
      gap: 3px;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
    .div-childing-buttons button {
      font-size: 10px;
      line-height: 16px;
      letter-spacing: 0.5px;
      width: 54px;
      height: 54px;
    }

    .div-age-weight-height-container {
      display: flex;
      gap: 10px;
    }
    fieldset {
      display: flex;
      gap: 2px;
      align-items: center;
      border: none;
      padding: 3px;
    }
    label {
      font-size: 12px;
    }
    .div-height-input {
      display: flex;
      gap: 2px;
      align-items: center;
    }
    .div-feet-input,
    .div-inches-input {
      display: flex;
      gap: 2px;
      align-items: center;
    }
    input {
      cursor: pointer;
      color: rgb(238, 238, 238);
      font-size: 14px;
      line-height: 16px;
      background-color: rgb(57, 62, 70);
      padding: 8px 0;
      border: 1px solid transparent;
      border-radius: 5px;
      outline: none;
    }
    input[value] {
      text-align: end;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    input:hover,
    input:focus {
      border: 1px solid rgb(0, 173, 181);
    }
    #age {
      width: 25px;
    }
    #feet {
      width: 20px;
    }
    #inches {
      width: 20px;
    }
    #weight {
      width: 25px;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-details-container">
          <div class="div-details-heading">
            <h2>
              M<span>anage</span> D<span>ietary</span> R<span
                >ecommendations</span
              >
            </h2>
            <p class="p-details-heading">
              <span>◎</span>Your daily nutrient recommendations are calculated
              based on your age, weight, height, sex and activity levels.
            </p>
            <p class="p-details-heading">
              → Make any necessary adjustments below to ensure your
              recommendations remain up-to-date!
            </p>
          </div>
        </div>

        <form>
          <div class="div-activity-level-container">
            <div class="div-activity-level-button">
              <button
                id="btn-sedentary"
                value="sedentary"
                type="button"
                @click=${this.editActivity}
                aria-label="Button to select a sedentary activity level"
              >
                <p class="p-activity-button">
                  Sedentary<br />
                  <span>"Daily activities such as housework or gardening"</span>
                </p>
              </button>
            </div>
            <div class="div-activity-level-button">
              <button
                id="btn-low"
                value="low"
                type="button"
                @click=${this.editActivity}
                aria-label="Button to select a low activity level"
              >
                <p class="p-activity-button">
                  Low Active<br />
                  <span>"30 minutes of moderate activity"</span>
                </p>
              </button>
            </div>
            <div class="div-activity-level-button">
              <button
                id="btn-active"
                value="active"
                type="button"
                @click=${this.editActivity}
                aria-label="Button to select an active activity level"
              >
                <p class="p-activity-button">
                  Active<br />
                  <span
                    >"60 minutes of moderate activity, or 30 minutes vigorous
                    activity"</span
                  >
                </p>
              </button>
            </div>
            <div class="div-activity-level-button">
              <button
                id="btn-very"
                value="very"
                type="button"
                @click=${this.editActivity}
                aria-label="Button to select a very active activity level"
              >
                <p class="p-activity-button">
                  Very Active<br />
                  <span>"45-60 minutes of vigorous activity"</span>
                </p>
              </button>
            </div>
          </div>

          <div class="div-top-container">
            <div class="div-gender-button-container">
              <button
                id="btn-male"
                value="male"
                type="button"
                @click=${this.editGender}
                aria-label="Button to select male gender"
              >
                M
              </button>
              <button
                id="btn-female"
                value="female"
                type="button"
                @click=${this.editGender}
                aria-label="Button to select female gender"
              >
                F
              </button>
            </div>

            <div class="div-age-weight-height-container">
              <fieldset>
                <input
                  @click=${this.focusInput}
                  @input=${this.saveInput}
                  value=${this.age}
                  required
                  placeholder="#"
                  autocomplete="off"
                  step="0.1"
                  min="0.1"
                  max="99"
                  type="number"
                  name="age"
                  id="age"
                />
                <label for="age">yrs</label>
              </fieldset>

              <fieldset>
                <div class="div-height-input">
                  <div class="div-feet-input">
                    <input
                      @click=${this.focusInput}
                      @input=${this.saveInput}
                      value=${this.feet}
                      required
                      placeholder="#"
                      autocomplete="off"
                      min="1"
                      max="8"
                      type="number"
                      name="feet"
                      id="feet"
                    />
                    <label for="feet">ft</label>
                  </div>

                  <div class="div-inches-input">
                    <input
                      @click=${this.focusInput}
                      @input=${this.saveInput}
                      value=${this.inches}
                      required
                      placeholder=" #"
                      autocomplete="off"
                      min="0"
                      max="11"
                      type="number"
                      name="inches"
                      id="inches"
                    />
                    <label for="inches">in</label>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <input
                  @click=${this.focusInput}
                  @input=${this.saveInput}
                  value=${this.weight}
                  required
                  placeholder="#"
                  autocomplete="off"
                  min="1"
                  max="999"
                  type="number"
                  name="weight"
                  id="weight"
                />
                <label for="weight">lbs</label>
              </fieldset>
            </div>
          </div>

          <div
            class="div-childing-container"
            ?hidden=${this.gender === "male" || !this.gender}
          >
            <div class="div-childing-buttons">
              <button
                id="btn-none"
                class="selected-button"
                value="none"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select not pregnant or lactating"
              >
                None
              </button>
              <button
                id="btn-pregnant1st"
                value="pregnant1st"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in first trimester"
              >
                Pregnant<br />
                1st trim.
              </button>
              <button
                id="btn-pregnant2nd"
                value="pregnant2nd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in second trimester"
              >
                Pregnant<br />
                2nd trim.
              </button>
              <button
                id="btn-pregnant3rd"
                value="pregnant3rd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in third trimester"
              >
                Pregnant<br />
                3rd trim.
              </button>
              <button
                id="btn-lactating1st"
                value="lactating1st"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are lactating between zero to six months"
              >
                Lactate<br />
                0-6 mo.
              </button>
              <button
                id="btn-lactating2nd"
                value="lactating2nd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are lactating more than seven months"
              >
                Lactate<br />
                7+ mo.
              </button>
            </div>
          </div>
        </form>

        <p class="p-details-heading">
          *Our interactive tool calculates your daily nutrient recommendations
          based on the Dietary Reference Intakes (DRIs) established by the Food
          and Nutrition Board of the National Academies of Sciences, Engineering
          and Medicine. While this data represents current scientific knowledge
          on nutrient needs, individual requirements may be higher or lower than
          these recommendations.
        </p>
      </section>
    `;
  }
}

customElements.define("manage-details-element", ManageDetailsElement);
