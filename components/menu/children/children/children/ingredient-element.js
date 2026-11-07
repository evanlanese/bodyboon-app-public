import { LitElement, html, css } from "lit";
import { LogIngredientElement } from "./children/log-ingredient-element.js";
import { AnalysisIngredientElement } from "./children/analysis-ingredient-element.js";
import { ListIngredientElement } from "./children/list-ingredient-element.js";
import { SearchIngredientElement } from "./children/search-ingredient-element.js";
import { ResultsIngredientElement } from "./children/results-ingredient-element.js";
import { startButtonLoadingAnimation } from "../../../../../app-functions/animations.js";

export class IngredientElement extends LitElement {
  static properties = {
    menu: { type: Array },
    categoryindex: { type: Number },
    recipeindex: { type: Number },
    recipe: { type: String },
    ingredients: { type: Array },
    intervalId: { type: Number },
    searchIngredientResults: { type: Array },
    disabled: { type: Boolean },
    listIngredientText: { type: Boolean },
    triggerIngredientSearchButton: { type: Boolean },
    resetIngredientSearchButton: { type: Boolean },
  };

  constructor() {
    super();
    this.intervalId = undefined;

    this.addEventListener("select-ingredient", async (event) => {
      const description = event.detail.description;
      const gramWeight = event.detail.gramWeight;
      const portionDescription = event.detail.portionDescription;
      if (event.detail.amount > 99) {
        event.detail.amount = 99;
      }
      const amount = event.detail.amount;
      const ingredients =
        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients;

      // ADDING THE FIRST INGREDIENT
      if (!ingredients.length) {
        ingredients.push({
          description: description,
          details: [
            {
              amount: amount,
              gramWeight: gramWeight,
              portionDescription: portionDescription,
              totalWeight: amount * gramWeight,
            },
          ],
        });
        this.ingredients = [...ingredients];

        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
          this.ingredients;

        const options = {
          detail: {
            menu: this.menu,
          },
          bubbles: true,
          composed: true,
        };

        await this.updateComplete;
        this.dispatchEvent(new CustomEvent("saved", options));
        return;
      }

      // ADDING PORTIONS TO AN EXISTING INGREDIENT
      if (
        ingredients.find((ingredient) => ingredient.description === description)
      ) {
        let ingredient = ingredients.filter(
          (ingredient) => ingredient.description === description,
        );

        if (
          ingredient[0].details.find(
            (item) => item["portionDescription"] === portionDescription,
          )
        ) {
          let detail = ingredient[0].details.find(
            (item) => item["portionDescription"] === portionDescription,
          );

          detail.amount += amount;
          if (detail.amount > 99) {
            detail.amount = 99;
          }
          detail.totalWeight = detail.amount * gramWeight;
          detail = { ...detail };
          this.ingredients = [...ingredients];

          this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
            this.ingredients;

          const options = {
            detail: {
              menu: this.menu,
            },
            bubbles: true,
            composed: true,
          };

          await this.updateComplete;
          this.dispatchEvent(new CustomEvent("saved", options));
          return;
        }

        ingredient[0].details.push({
          amount: amount,
          gramWeight: gramWeight,
          portionDescription: portionDescription,
          totalWeight: amount * gramWeight,
        });

        this.ingredients = [...ingredients];

        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
          this.ingredients;

        const options = {
          detail: {
            menu: this.menu,
          },
          bubbles: true,
          composed: true,
        };

        await this.updateComplete;
        this.dispatchEvent(new CustomEvent("saved", options));
        return;
      }

      // ADDING A NEW INGREDIENT TO LIST
      ingredients.push({
        description: description,
        details: [
          {
            amount: amount,
            gramWeight: gramWeight,
            portionDescription: portionDescription,
            totalWeight: amount * gramWeight,
          },
        ],
      });

      this.ingredients = [...ingredients];

      this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
        this.ingredients;

      this.updateUserMenuDB();
    });

    this.addEventListener("delete-ingredient", async (event) => {
      const ingredientindex = event.detail.ingredientindex;

      this.menu[this.categoryindex].recipes[
        this.recipeindex
      ].ingredients.splice(ingredientindex, 1);

      this.ingredients = [
        ...this.menu[this.categoryindex].recipes[this.recipeindex].ingredients,
      ];

      this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
        this.ingredients;

      this.updateUserMenuDB();
    });

    this.addEventListener("increase-portion-amount", async (event) => {
      const ingredientindex = event.detail.ingredientindex;
      const portionindex = event.detail.portionindex;

      const portion =
        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients[
          ingredientindex
        ].details[portionindex];

      portion.amount += 1;
      if (portion.amount > 99) {
        portion.amount = 99;
      }
      portion["totalWeight"] += portion["gramWeight"];

      this.ingredients = [
        ...this.menu[this.categoryindex].recipes[this.recipeindex].ingredients,
      ];

      this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
        this.ingredients;

      this.updateUserMenuDB();
    });

    this.addEventListener("decrease-portion-amount", async (event) => {
      const ingredientindex = event.detail.ingredientindex;
      const portionindex = event.detail.portionindex;

      const portion =
        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients[
          ingredientindex
        ].details[portionindex];

      portion.amount -= 1;
      portion["totalWeight"] -= portion["gramWeight"];

      if (portion.amount === 0) {
        this.menu[this.categoryindex].recipes[this.recipeindex].ingredients[
          ingredientindex
        ].details.splice(portionindex, 1);

        const details =
          this.menu[this.categoryindex].recipes[this.recipeindex].ingredients[
            ingredientindex
          ].details;
        if (!details.length) {
          this.menu[this.categoryindex].recipes[
            this.recipeindex
          ].ingredients.splice(ingredientindex, 1);
        }
      }

      this.ingredients = [
        ...this.menu[this.categoryindex].recipes[this.recipeindex].ingredients,
      ];

      this.menu[this.categoryindex].recipes[this.recipeindex].ingredients =
        this.ingredients;

      this.updateUserMenuDB();
    });

    this.addEventListener("log-ingredients", async (event) => {
      const button = event.detail.button;
      const element = event.detail.element;
      this.logIngredients(button, element);
    });

    this.addEventListener("analyze-ingredients", async (event) => {
      const button = event.detail.button;
      const element = event.detail.element;
      this.analyzeIngredients(button, element);
    });
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("menu")) {
      if (
        !this.menu[this.categoryindex].recipes[this.recipeindex].ingredients
          .length
      ) {
        this.disabled = true;
      }
    }

    if (changedProperties.has("ingredients")) {
      if (this.ingredients.length) {
        this.disabled = false;
      }
    }

    if (changedProperties.has("resetIngredientSearchButton")) {
      if (!this.resetIngredientSearchButton) {
        return;
      }
      if (this.triggerIngredientSearchButton) {
        this.triggerIngredientSearch();
      }
    }
  }

  async updateUserMenuDB() {
    const options = {
      detail: {
        menu: this.menu,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("update-menu", options));
  }

  async logIngredients(button, element) {
    const recipe = this.menu[this.categoryindex].recipes[this.recipeindex];
    this.intervalId = startButtonLoadingAnimation(button, element);

    const analysisButton = this.shadowRoot.querySelector(
      "analysis-ingredient-element",
    );
    analysisButton.disabled = true;

    const options = {
      detail: {
        recipe: recipe,
        intervalId: this.intervalId,
        logButton: button,
        analysisButton: analysisButton,
        element: element,
        textContent: "Log Intake",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("log-recipe", options));
  }

  async analyzeIngredients(button, element) {
    const ingredients =
      this.menu[this.categoryindex].recipes[this.recipeindex].ingredients;
    this.intervalId = startButtonLoadingAnimation(button, element);

    const logButton = this.shadowRoot.querySelector("log-ingredient-element");
    logButton.disabled = true;

    const options = {
      detail: {
        category: this.menu[this.categoryindex].category,
        recipe: this.menu[this.categoryindex].recipes[this.recipeindex].name,
        ingredients: ingredients,
        intervalId: this.intervalId,
        analysisButton: button,
        logButton: logButton,
        element: element,
        textContent: "Analyze Benefits",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("analysis-ingredients", options));
  }

  triggerIngredientSearch() {
    this.triggerIngredientSearchButton = !this.triggerIngredientSearchButton;
    this.listIngredientText = !this.listIngredientText;
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
      color: rgb(238, 238, 238);
    }
    section {
      background-color: rgb(57, 62, 70);
      padding: 5px;
      margin: -1px 5px 5px 5px;
    }
    .div-section {
      margin: auto;
    }
    .div-flex {
      display: flex;
      gap: 5px;
      justify-content: end;
    }

    button {
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      padding: 16px;
      height: 64px;
      margin-bottom: 2px;
      transition-duration: 300ms;
    }
    button:disabled img,
    .p-disabled {
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
  `;

  render() {
    return html`
      <section>
        <div class="div-section">
          <div class="div-flex">
            <button
              id="btn-search-ingredients"
              type="button"
              @click=${this.triggerIngredientSearch}
              aria-label="Button to toggle on/off ${this
                .recipe}'s ingredient search function"
            >
              ${!this.triggerIngredientSearchButton
                ? html`ADD AN INGREDIENT`
                : html`SEARCH AN INGREDIENT`}
            </button>

            <log-ingredient-element
              ?disabled=${this.disabled}
              recipe=${this.recipe}
            >
            </log-ingredient-element>

            <analysis-ingredient-element
              ?disabled=${this.disabled}
              recipe=${this.recipe}
            >
            </analysis-ingredient-element>
          </div>

          <list-ingredient-element
            .ingredients=${!this.menu[this.categoryindex].recipes[
              this.recipeindex
            ].ingredients
              ? []
              : this.menu[this.categoryindex].recipes[this.recipeindex]
                  .ingredients}
            .listIngredientText=${this.listIngredientText}
          ></list-ingredient-element>

          <div
            ?hidden=${!this.triggerIngredientSearchButton}
            id="div-search-container"
          >
            <search-ingredient-element></search-ingredient-element>

            <results-ingredient-element
              .searchIngredientResults=${this.searchIngredientResults}
              .recipe=${this.recipe}
            ></results-ingredient-element>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("ingredient-element", IngredientElement);
