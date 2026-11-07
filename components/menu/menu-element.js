import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { menuContext, searchContext } from "../../app-functions/context.js";
import { CategoriesElement } from "./children/categories-element.js";
import { LoadingElement } from "../loading/loading-element.js";

export class MenuElement extends LitElement {
  static properties = {
    menu: { type: Array },
    triggerRepositionButtons: { type: Boolean },
    triggerNewCategoryForm: { type: Boolean },
    searchIngredientResults: { type: Array },
  };

  constructor() {
    super();
    this.menuConsumer = new ContextConsumer(this, {
      context: menuContext,
      subscribe: true,
    });
    this.searchConsumer = new ContextConsumer(this, {
      context: searchContext,
      subscribe: true,
    });

    this.menu = undefined;
    this.searchIngredientResults = [];

    this.addEventListener("enable-menu-buttons", (event) => {
      const repositionCategoriesButton = this.shadowRoot.getElementById(
        "btn-reposition-category",
      );
      const newCategoryButton =
        this.shadowRoot.getElementById("btn-new-category");
      const repositionCategoriesButtonText =
        this.shadowRoot.querySelector(".p-reposition-text");
      const newCategoryButtonText = this.shadowRoot.querySelector(
        ".p-new-category-text",
      );

      if (this.menu.length > 1) {
        repositionCategoriesButton.disabled = false;
        repositionCategoriesButtonText.classList.toggle("p-disabled");
      }
      if (this.menu.length) {
        newCategoryButton.disabled = false;
        newCategoryButtonText.classList.toggle("p-disabled");
      }
    });

    this.addEventListener("disable-menu-buttons", () => {
      const repositionCategoriesButton = this.shadowRoot.getElementById(
        "btn-reposition-category",
      );
      const newCategoryButton =
        this.shadowRoot.getElementById("btn-new-category");
      const repositionCategoriesButtonText =
        this.shadowRoot.querySelector(".p-reposition-text");
      const newCategoryButtonText = this.shadowRoot.querySelector(
        ".p-new-category-text",
      );

      repositionCategoriesButton.disabled = true;
      newCategoryButton.disabled = true;
      repositionCategoriesButtonText.classList.toggle("p-disabled");
      newCategoryButtonText.classList.toggle("p-disabled");
    });

    this.addEventListener("enable-reposition-button", () => {
      if (!this.menu || this.menu.length > 1) {
        this.shadowRoot.getElementById("btn-reposition-category").disabled =
          false;
        this.shadowRoot
          .querySelector(".p-reposition-text")
          .classList.remove("p-disabled");
      }
    });

    this.addEventListener("add-category", (event) => {
      const category = event.detail.category;
      this.menu.unshift({
        category: category.trim(),
        recipes: [],
      });

      this.updateUserMenuDB();
    });

    this.addEventListener("delete-category", async (event) => {
      const categoryindex = event.detail.categoryindex;

      this.menu = this.menu.toSpliced(categoryindex, 1);
      this.updateUserMenuDB();
    });

    this.addEventListener("rename-category", (event) => {
      const name = event.detail.input;
      const categoryindex = event.detail.categoryindex;
      this.menu[categoryindex].category = name;

      this.updateUserMenuDB();
    });
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("menu")) {
      if (!this.menu.length) {
        return;
      }
    }

    if (this.menuConsumer.value) {
      this.menu = [...this.menuConsumer.value];
      await this.updateComplete;
      this.shadowRoot.querySelector("loading-element").hidden = true;
      this.shadowRoot.querySelector("categories-element").hidden = false;
      this.shadowRoot.querySelector("section").hidden = false;
    }

    if (this.searchConsumer.value) {
      this.searchIngredientResults = this.searchConsumer.value;
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

  async repositionCategories() {
    this.triggerRepositionButtons = !this.triggerRepositionButtons;
    const newCategoryButton =
      this.shadowRoot.getElementById("btn-new-category");
    newCategoryButton.disabled
      ? (newCategoryButton.disabled = false)
      : (newCategoryButton.disabled = true);

    const newCategoryButtonText = this.shadowRoot.querySelector(
      ".p-new-category-text",
    );
    newCategoryButtonText.classList.toggle("p-disabled");
  }

  createNewCategory() {
    this.triggerNewCategoryForm = !this.triggerNewCategoryForm;
    this.shadowRoot.getElementById("btn-reposition-category").disabled = true;
    this.shadowRoot
      .querySelector(".p-reposition-text")
      .classList.add("p-disabled");
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      color: rgb(238, 238, 238);
    }
    :host {
      display: grid;
      grid-template-columns: 0.5fr minmax(360px, 720px) 0.5fr;
      grid-template-rows: 1fr;
    }
    section {
      grid-column: 2 / 3;
    }

    .div-menu-container {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      min-width: 360px;
      padding: 10px;
      margin: auto;
    }
    .div-menu-heading {
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
    span {
      font-size: 20px;
    }
    p {
      font-size: 14px;
      font-style: italic;
      opacity: 0.7;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .div-buttons-container {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    button {
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      width: 64px;
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
    .div-buttons-container img {
      width: 28px;
      height: 28px;
    }
    .p-reposition-text,
    .p-new-category-text {
      font-size: 8px;
      line-height: 8px;
      text-align: center;
      margin-top: 2px;
    }
  `;

  render() {
    return html`
      <loading-element hidden></loading-element>

      <section>
        <div class="div-menu-container">
          <div class="div-menu-heading">
            <div class="div-flex-h2">
              <img
                src="../../img/dining-light.svg"
                alt="Symbol for menu items."
              />
              <h2>Y<span>our</span> M<span>enu</span></h2>
            </div>
            <p>
              Create and track your own recipes. Then analyze the nutritional
              content to help you eat healthier.
            </p>
          </div>

          <div class="div-buttons-container">
            <div>
              <button
                ?disabled=${!this.menu || this.menu.length < 2}
                id="btn-reposition-category"
                type="button"
                @click=${this.repositionCategories}
                aria-label="Button to reposition categories"
              >
                <img
                  src="../../img/priority-light.svg"
                  alt="Rearrangement symbol"
                />
              </button>
              <p
                class="p-reposition-text ${!this.menu || this.menu.length < 2
                  ? "p-disabled"
                  : null}"
              >
                REPOSITION<br />CATEGORIES
              </p>
            </div>

            <div>
              <button
                ?disabled=${!this.menu || !this.menu.length}
                id="btn-new-category"
                type="button"
                @click=${this.createNewCategory}
                aria-label="Button to create a new category"
              >
                <img src="../../img/add_box-light.svg" alt="Addition symbol" />
              </button>
              <p
                class="p-new-category-text"
                ${!this.menu || !this.menu.length ? "p-disabled" : null}
              >
                CREATE<br />CATEGORY
              </p>
            </div>
          </div>
        </div>

        <categories-element
          hidden
          .menu=${this.menu}
          .triggerRepositionButtons=${this.triggerRepositionButtons}
          .triggerNewCategoryForm=${this.triggerNewCategoryForm}
          .searchIngredientResults=${this.searchIngredientResults}
        ></categories-element>
      </section>
    `;
  }
}

customElements.define("menu-element", MenuElement);
