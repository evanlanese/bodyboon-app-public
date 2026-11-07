import { LitElement, html, css } from "lit";

export class ListIngredientElement extends LitElement {
  static properties = {
    ingredients: { type: Array },
    listIngredientText: { type: Boolean },
  };

  constructor() {
    super();
  }

  async deleteIngredient(event) {
    event.preventDefault();
    const ingredientindex = Number(event.target.dataset.ingredientindex);

    const options = {
      detail: {
        ingredientindex: ingredientindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("delete-ingredient", options));
  }

  async increasePortionAmount(event) {
    event.preventDefault();
    const ingredientindex = Number(event.target.dataset.ingredientindex);
    const portionindex = Number(event.target.dataset.portionindex);

    const options = {
      detail: {
        ingredientindex: ingredientindex,
        portionindex: portionindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("increase-portion-amount", options));
  }

  async decreasePortionAmount(event) {
    event.preventDefault();
    const ingredientindex = Number(event.target.dataset.ingredientindex);
    const portionindex = Number(event.target.dataset.portionindex);

    const options = {
      detail: {
        ingredientindex: ingredientindex,
        portionindex: portionindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("decrease-portion-amount", options));
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
    section {
      display: grid;
      grid-template-columns: 0.25fr minmax(320px, 4fr) 0.25fr;
      grid-template-rows: 1fr;
      margin: 10px auto;
    }
    .p-no-results {
      grid-column: 2 / 3;
      font-style: italic;
      text-align: center;
      opacity: 0.5;
      padding: 10px 0;
    }
    article {
      grid-column: 2 / 3;
      padding: 0 5px;
    }
    article:hover {
      background-color: rgb(34, 40, 49);
    }

    .div-ingredient-description {
      display: flex;
      gap: 5px;
      justify-content: space-between;
      align-items: center;
      padding-left: 7px;
    }
    .div-ingredient-heading {
      display: flex;
      gap: 8px;
    }
    .p-recipe-count {
      font-size: 10px;
      padding-top: 2px;
    }
    .p-ingredient {
      font-size: 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .p-ingredient span {
      font-size: 14px;
    }
    .btn-close {
      font-size: 18px;
      font-weight: 300;
      background-color: transparent;
      padding: 7px 10px 0px 14px;
      border: none;
      margin-bottom: 10px;
      transition-duration: 300ms;
    }

    .div-details-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      padding-left: 36px;
      padding-bottom: 5px;
      margin: auto;
    }

    .div-details {
      display: flex;
      gap: 5px;
      align-items: start;
      padding-top: 5px;
    }
    .p-amount {
      font-size: 16px;
      word-break: keep-all;
    }
    .p-portion-desc {
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    .div-increment-container {
      display: grid;
      grid-template-columns: 1fr 89px;
      grid-template-rows: 1fr;
      gap: 10px;
    }
    .p-total-grams {
      font-size: 14px;
      font-style: italic;
      text-align: end;
    }

    .div-increment-buttons {
      display: flex;
      gap: 5px;
    }
    .btn-increase,
    .btn-decrease {
      font-size: 24px;
      background-color: transparent;
      width: 42px;
      height: 32px;
      border: 1px solid rgba(110, 110, 110, 0.5);
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

    .btn-decrease {
      padding-bottom: 4px;
    }
    .btn-increase:hover,
    .btn-decrease:hover {
      background-color: rgb(57, 62, 70);
    }
    button {
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <section>
        ${!this.ingredients.length
          ? html`<p class="p-no-results">
              ${!this.listIngredientText ? html`NO CURRENT INGREDIENTS` : null}
            </p>`
          : null}
        ${this.ingredients.map((ingredient, ingredientindex) => {
          return html`
            <article>
              <div class="div-ingredient-description">
                <div class="div-ingredient-heading">
                  <p class="p-recipe-count">${ingredientindex + 1}</p>
                  <p class="p-ingredient">
                    ${ingredient.description[0]}<span
                      >${ingredient.description.slice(1)}</span
                    >
                  </p>
                </div>
                <button
                  class="btn-close"
                  data-ingredientindex=${ingredientindex}
                  type="button"
                  @click=${this.deleteIngredient}
                  aria-label="Button to remove the ${ingredient.description} ingredient"
                >
                  X
                </button>
              </div>
              ${ingredient.details.map((detail, portionindex) => {
                return html`
                  <div class="div-details-container">
                    <div class="div-details">
                      <p class="p-amount">${detail.amount}X</p>
                      <p class="p-portion-desc">
                        ${detail["portionDescription"]}
                      </p>
                    </div>

                    <div class="div-increment-container">
                      <p class="p-total-grams">
                        ${detail["totalWeight"]}g<br />
                        total
                      </p>

                      <div class="div-increment-buttons">
                        <button
                          ?disabled=${detail.amount >= 99}
                          class="btn-increase"
                          data-ingredientindex=${ingredientindex}
                          data-portionindex=${portionindex}
                          type="button"
                          @click=${this.increasePortionAmount}
                          aria-label="Button to increase the portion amount of ${detail[
                            "portionDescription"
                          ]}"
                        >
                          +
                        </button>

                        <button
                          class="btn-decrease"
                          data-ingredientindex=${ingredientindex}
                          data-portionindex=${portionindex}
                          type="button"
                          @click=${this.decreasePortionAmount}
                          aria-label="Button to decrease the portion amount of ${detail[
                            "portionDescription"
                          ]}"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                `;
              })}
            </article>
          `;
        })}
      </section>
    `;
  }
}

customElements.define("list-ingredient-element", ListIngredientElement);
