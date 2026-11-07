import { LitElement, html, css } from "lit";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../../app-functions/animations.js";

export class NewDetailsElement extends LitElement {
  static properties = {
    gender: { type: String },
    childing: { type: String },
    activity: { type: String },
    intervalId: { type: Number },
  };

  constructor() {
    super();
    this.gender = "";
    this.childing = "none";
    this.activity = "";
    this.intervalId = undefined;
  }

  async willUpdate(changedProperties) {
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

  async editGender(event) {
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
    }
  }

  editChilding(event) {
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

  async updateUserDetailsDB(
    detailsButton,
    intervalId,
    textContent,
    gender,
    childing,
    activity,
    age,
    weight,
    feet,
    inches,
  ) {
    const options = {
      detail: {
        detailsButton: detailsButton,
        intervalId: intervalId,
        textContent: textContent,
        gender: gender,
        childing: childing,
        activity: activity,
        age: age,
        weight: weight,
        feet: feet,
        inches: inches,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("update-details", options));
  }

  saveUserDetails(event) {
    event.preventDefault();
    const gender = this.gender;
    const childing = this.childing;
    const activity = this.activity;
    const age = Number(event.target.age.value);
    const weight = Number(event.target.weight.value);
    const feet = Number(event.target.feet.value);
    const inches = Number(event.target.inches.value);
    const detailsButton = event.submitter;
    const textContent = detailsButton.textContent;
    this.intervalId = startButtonLoadingAnimation(detailsButton, detailsButton);

    this.updateUserDetailsDB(
      detailsButton,
      this.intervalId,
      textContent,
      gender,
      childing,
      activity,
      age,
      weight,
      feet,
      inches,
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof this.intervalId === "number") {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    section {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    form {
      display: grid;
      grid-template-columns: 1fr;
      padding: 40px 0;
    }
    .div-gender-container {
      display: flex;
      gap: 5px;
      margin: auto;
    }
    .div-childing-container {
      padding-top: 5px;
    }
    .div-childing-buttons {
      display: flex;
      gap: 3px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
    button {
      color: rgb(238, 238, 238);
      cursor: pointer;
      font-size: 11px;
      background-color: rgb(34, 40, 49);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      width: 128px;
      height: 32px;
      transition-duration: 300ms;
    }
    button:disabled {
      opacity: 0.5;
    }
    button:disabled:hover {
      background-color: rgb(34, 40, 49);
    }
    button:disabled:focus {
      background-color: rgb(34, 40, 49);
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
    .div-gender-container button {
      text-transform: uppercase;
    }
    .div-childing-buttons button {
      width: 261px;
      text-transform: uppercase;
    }

    .div-activity-level-container {
      display: flex;
      flex-direction: column;
      grid-gap: 5px;
      padding: 10px 0;
    }
    .div-activity-level-button {
      margin: auto;
    }
    #btn-sedentary,
    #btn-low,
    #btn-active,
    #btn-very {
      width: 261px;
      height: 62px;
    }
    .p-activity-button {
      font-size: 11px;
      letter-spacing: 0.5px;
      pointer-events: none;
    }
    span {
      font-size: 10px;
      font-style: italic;
      font-weight: 300;
    }

    .div-age-weight-height-container {
      display: flex;
      gap: 15px;
      margin: auto;
    }
    fieldset {
      font-size: 12px;
      border: none;
    }
    legend {
      text-transform: uppercase;
      padding: 2px 10px;
      border: 1px solid;
      border-color: rgba(0, 173, 181, 0.5);
      border-radius: 5px;
      margin-bottom: 1px;
    }
    .div-height-input {
      display: flex;
    }

    input {
      font-size: 14px;
      color: rgb(110, 110, 110);
      line-height: 22px;
      width: 48px;
      padding-left: 3px;
      border: none;
      border-radius: 5px;
      margin: 0 1px;
      outline: none;
    }
    .div-form-button {
      margin: 30px auto;
    }
    #btn-save-form {
      text-transform: uppercase;
      width: 128px;
      height: 54px;
    }
  `;

  render() {
    return html`
      <section>
        <form @submit=${this.saveUserDetails}>
          <div class="div-gender-container">
            <button
              id="btn-male"
              value="male"
              type="button"
              @click=${this.editGender}
              aria-label="Button to select male gender"
            >
              Male
            </button>
            <button
              id="btn-female"
              value="female"
              type="button"
              @click=${this.editGender}
              aria-label="Button to select female gender"
            >
              Female
            </button>
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
                NOT PREGNANT OR LACTATING
              </button>
              <button
                id="btn-pregnant1st"
                value="pregnant1st"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in first trimester"
              >
                PREGNANT: 1ST TRIMESTER
              </button>
              <button
                id="btn-pregnant2nd"
                value="pregnant2nd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in second trimester"
              >
                PREGNANT: 2ND TRIMESTER
              </button>
              <button
                id="btn-pregnant3rd"
                value="pregnant3rd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are pregnant in third trimester"
              >
                PREGNANT: 3RD TRIMESTER
              </button>
              <button
                id="btn-lactating1st"
                value="lactating1st"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are lactating between zero to six months"
              >
                LACTATING: 0-6 MONTHS
              </button>
              <button
                id="btn-lactating2nd"
                value="lactating2nd"
                type="button"
                @click=${this.editChilding}
                aria-label="Button to select you are lactating more than seven months"
              >
                LACTATING: OVER 7 MONTHS
              </button>
            </div>
          </div>

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
                  SEDENTARY<br />
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
                  LOW ACTIVE<br />
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
                  ACTIVE<br />
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
                  VERY ACTIVE<br />
                  <span>"45-60 minutes of vigorous activity"</span>
                </p>
              </button>
            </div>
          </div>

          <div class="div-age-weight-height-container">
            <fieldset>
              <legend>Age</legend>

              <div>
                <input
                  required
                  placeholder="year"
                  autocomplete="off"
                  step="0.1"
                  min="0.1"
                  max="99"
                  type="number"
                  name="age"
                  id="age"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Weight</legend>

              <div>
                <input
                  required
                  placeholder="lbs"
                  autocomplete="off"
                  min="1"
                  max="999"
                  type="number"
                  name="weight"
                  id="weight"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Height</legend>

              <div class="div-height-input">
                <div>
                  <input
                    required
                    placeholder="feet"
                    autocomplete="off"
                    min="1"
                    max="8"
                    type="number"
                    name="feet"
                    id="feet"
                  />
                </div>
                <div>
                  <input
                    required
                    placeholder="inch"
                    autocomplete="off"
                    min="0"
                    max="11"
                    type="number"
                    name="inches"
                    id="inches"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <div class="div-form-button">
            <button
              ?disabled=${!this.gender.length || !this.activity.length}
              id="btn-save-form"
              type="submit"
              aria-label="Button to save selected personal details"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    `;
  }
}

customElements.define("new-details-element", NewDetailsElement);
