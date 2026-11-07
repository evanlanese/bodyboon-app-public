import { LitElement, html, css } from "lit";

export class ResultsIngredientElement extends LitElement {
  static properties = {
    searchIngredientResults: { type: Array },
    recipe: { type: String },
  };

  constructor() {
    super();
    this.searchIngredientResults = [];
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("searchIngredientResults")) {
      if (!this.searchIngredientResults.length) {
        return;
      }
    }
  }

  async selectIngredient(event) {
    event.preventDefault();
    let portionDetails;

    const description = event.submitter.dataset.description;
    portionDetails = this.shadowRoot.getElementById(description).value;
    // example: portionDetails = "225#1 cup, mashed"
    const amount = event.target.input.value;

    portionDetails = portionDetails.split("#");
    const gramWeight = portionDetails[0];
    const portionDescription = portionDetails[1];

    const options = {
      detail: {
        description: description,
        gramWeight: Number(gramWeight),
        portionDescription: portionDescription,
        amount: Number(amount),
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("select-ingredient", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      outline: none;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      word-break: break-word;
      text-wrap: wrap;
      scrollbar-color: rgba(34, 40, 49, 0.7) transparent;
      scrollbar-width: thin;
    }
    section {
      min-width: 340px;
      max-width: fit-content;
      max-height: 500px;
      overflow-y: scroll;
      padding: 5px;
      margin: 12px auto;
    }

    .p-no-results {
      font-style: italic;
      text-align: center;
      text-transform: uppercase;
      opacity: 0.5;
      padding: 10px 0;
    }
    .p-no-results span {
      font-size: 14px;
    }

    form {
      margin: 24px auto;
    }
    .div-ingredient-amount {
      display: flex;
      align-items: end;
    }
    .div-input {
      display: flex;
      gap: 2px;
      align-items: start;
      margin: 5px;
    }
    label {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;
      padding-top: 1px;
    }
    input {
      color: rgb(238, 238, 238);
      font-size: 24px;
      width: 52px;
      background-color: rgb(57, 62, 70);
      border: 1px solid transparent;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:hover,
    input:focus {
      background-color: rgb(238, 238, 238);
      color: rgb(34, 40, 49);
      border: 1px solid rgb(0, 173, 181);
      margin-right: 25px;
    }
    .p-description {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-bottom: 6px;
      margin-left: -25px;
    }
    .p-description span {
      font-size: 20px;
    }

    .div-portion-options {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .p-portion-size {
      font-size: 14px;
      font-weight: 300;
      text-transform: uppercase;
      padding-bottom: 5px;
    }
    select {
      color: rgb(34, 40, 49);
      cursor: pointer;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      padding: 6px 3px;
      width: 100%;
    }

    .div-form-button {
      display: flex;
      justify-content: end;
      width: 100%;
    }
    button {
      color: rgb(238, 238, 238);
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      width: 50%;
      padding: 16px 0;
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      border-radius: 5px;
      margin-top: 8px;
      transition-duration: 300ms;
    }
    button:hover {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }
  `;

  render() {
    return html`
      <section>
        ${!this.searchIngredientResults.length
          ? html`<p class="p-no-results">
              N<span>o</span> c<span>urrent</span> s<span>earch</span> r<span
                >esults</span
              >
            </p>`
          : this.searchIngredientResults.map((object, index) => {
              return html`
                <form @submit=${this.selectIngredient}>
                  <div class="div-ingredient-amount">
                    <div class="div-input">
                      <label for=${index}>X</label>
                      <input
                        value="1"
                        required
                        autocomplete="off"
                        placeholder="#"
                        min="1"
                        max="99"
                        id=${index}
                        type="number"
                        name="input"
                      />
                    </div>

                    <p class="p-description">
                      ${object.description[0]}<span
                        >${object.description.slice(1)}</span
                      >
                    </p>
                  </div>

                  <p class="p-portion-size">PORTION SIZE:</p>
                  <select id=${object.description}>
                    <option value="100#100 grams">100 grams</option>
                    ${object.foodPortions.map((food) => {
                      return html`
                        <option
                          value="${food.gramWeight}#${food.portionDescription}"
                        >
                          ${food.portionDescription} (${food.gramWeight} grams)
                        </option>
                      `;
                    })}
                  </select>

                  <div class="div-form-button">
                    <button
                      data-description=${object.description}
                      type="submit"
                      aria-label="Button to add the selected ingredient to ${this
                        .recipe}"
                    >
                      ADD INGREDIENT
                    </button>
                  </div>
                </form>
              `;
            })}
      </section>
    `;
  }
}

customElements.define("results-ingredient-element", ResultsIngredientElement);
