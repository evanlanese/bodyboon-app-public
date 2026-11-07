import { LitElement, html, css } from "lit";
import { FirstRecipeElement } from "./children/first-recipe-element.js";
import { NewRecipeElement } from "./children/new-recipe-element.js";
import { ExpandRecipeElement } from "./children/expand-recipe-element.js";
import { OptionsRecipeElement } from "./children/options-recipe-element.js";
import { RenameRecipeElement } from "./children/rename-recipe-element.js";
import { DeleteRecipeElement } from "./children/delete-recipe-element.js";
import { RepositionRecipeElement } from "./children/reposition-recipe-element.js";
import { IngredientElement } from "./children/ingredient-element.js";

export class RecipeElement extends LitElement {
  static properties = {
    menu: { type: Array },
    categoryindex: { type: Number },
    recipeindex: { type: Number },
    triggerRepositionButtons: { type: Boolean },
    disableExpandRecipeElement: { type: Boolean },
    disableRecipeMenuButton: { type: Boolean },
    searchIngredientResults: { type: Array },
    resetRecipeMenuButtons: { type: Boolean },
    cancelNewRecipeForm: { type: String },
    resetIngredientSearchButton: { type: Boolean },
  };

  constructor() {
    super();
    this.menu = [];

    this.addEventListener("close-hanging-recipe-menus", (event) => {
      let recipeindex;

      if (event.detail) {
        recipeindex = event.detail.recipeindex;
      }

      const optionRecipeElements = this.shadowRoot.querySelectorAll(
        "options-recipe-element",
      );

      if (!recipeindex) {
        optionRecipeElements.forEach(
          (element) => (element.closeHangingRecipeMenus = true),
        );
        return;
      }

      optionRecipeElements.forEach((element) => {
        if (element.recipeindex === recipeindex) {
          return;
        }
        element.closeHangingRecipeMenus = true;
      });
    });

    this.addEventListener("expand-recipe", async (event) => {
      const recipeindex = event.detail.recipeindex;
      let params;

      // INGREDIENTS TO EXPAND
      const ingredientElementId = `parent-recipe-${recipeindex}`;
      const ingredientElementToExpand =
        this.shadowRoot.getElementById(ingredientElementId);

      // HIDE IF SELECTED IS ALREADY VISIBLE
      if (!ingredientElementToExpand.hidden) {
        params = `expand-recipe-element[recipeindex="${recipeindex}"]`;
        const expandRecipeButton = this.shadowRoot.querySelector(params);
        expandRecipeButton.src = "../img/arrow_right-light.svg";
        ingredientElementToExpand.hidden = true;

        await this.updateComplete;
        this.dispatchEvent(
          new CustomEvent("close-hanging-recipe-menus", {
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }

      // RESET ALL ARROWS
      const expandRecipeButtons = this.shadowRoot.querySelectorAll(
        "expand-recipe-element",
      );
      expandRecipeButtons.forEach(
        (element) => (element.src = "../img/arrow_right-light.svg"),
      );

      // HIDE ALL RECIPES THAT DONT MATCH RECIPEINDEX
      const ingredientElements =
        this.shadowRoot.querySelectorAll("ingredient-element");
      ingredientElements.forEach((element) => {
        if (ingredientElementToExpand.id === element.id) {
          params = `expand-recipe-element[recipeindex="${recipeindex}"]`;
          const expandRecipeButton = this.shadowRoot.querySelector(params);
          expandRecipeButton.src = "../img/arrow_down-light.svg";
          ingredientElementToExpand.hidden = false;
          return;
        }
        element.hidden = true;
      });

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("close-hanging-recipe-menus", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.addEventListener("reposition-recipe", async (event) => {
      const categoryindex = event.detail.categoryindex;
      const recipeindex = event.detail.recipeindex;
      const direction = event.detail.direction;

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("close-hanging-recipe-menus", {
          bubbles: true,
          composed: true,
        }),
      );

      this.resetArrowImagesAndHideIngredientElements();

      if (direction === "up") {
        this.moveRecipeUp(recipeindex);
      } else {
        this.moveRecipeDown(recipeindex);
      }

      this.updateUserMenuDB();
    });

    this.addEventListener("remove-new-recipe-form", () => {
      this.removeNewRecipeForm();
    });

    this.addEventListener("add-recipe", (event) => {
      const categoryindex = event.detail.categoryindex;
      const recipe = event.detail.recipe;

      this.menu[categoryindex].recipes.push({
        name: recipe.trim(),
        ingredients: [],
      });

      this.updateUserMenuDB();
    });

    this.addEventListener("add-rename-recipe-form", (event) => {
      const recipeindex = event.detail.recipeindex;

      const deleteRecipeElement = this.shadowRoot.querySelector(
        "delete-recipe-element",
      );
      if (deleteRecipeElement) {
        this.removeDeleteRecipeForm();
      }

      this.resetArrowImagesAndHideIngredientElements();
      this.addRenameRecipeForm(recipeindex);

      this.shadowRoot.getElementById("btn-reposition-recipe").disabled = true;
      this.shadowRoot.getElementById("btn-new-recipe").disabled = true;
      this.shadowRoot
        .querySelector(".p-reposition-text")
        .classList.add("p-disabled");
      this.shadowRoot
        .querySelector(".p-new-recipe-text")
        .classList.add("p-disabled");
    });

    this.addEventListener("remove-rename-recipe-form", (event) => {
      const recipeindex = event.detail.recipeindex;
      this.removeRenameRecipeForm(recipeindex);

      this.shadowRoot.getElementById("btn-new-recipe").disabled = false;
      this.shadowRoot
        .querySelector(".p-new-recipe-text")
        .classList.remove("p-disabled");

      if (this.menu[this.categoryindex].recipes.length < 2) {
        return;
      }

      this.shadowRoot.getElementById("btn-reposition-recipe").disabled = false;
      this.shadowRoot
        .querySelector(".p-reposition-text")
        .classList.remove("p-disabled");
    });

    this.addEventListener("rename-recipe", (event) => {
      const categoryindex = event.detail.categoryindex;
      const recipeindex = event.detail.recipeindex;
      const name = event.detail.input;
      this.menu[categoryindex].recipes[recipeindex].name = name;

      this.updateUserMenuDB();
    });

    this.addEventListener("delete-recipe", async (event) => {
      const categoryindex = event.detail.categoryindex;
      const recipeindex = event.detail.recipeindex;

      this.menu[categoryindex].recipes = this.menu[
        categoryindex
      ].recipes.toSpliced(recipeindex, 1);

      this.updateUserMenuDB();
    });

    this.addEventListener("add-delete-recipe-form", async (event) => {
      const recipeindex = event.detail.recipeindex;
      const name = event.detail.name;

      // REMOVE ANY PENDING RENAME RECIPE ELEMENTS
      const renameRecipeElements = this.shadowRoot.querySelectorAll(
        "rename-recipe-element",
      );
      if (renameRecipeElements.length) {
        renameRecipeElements.forEach((element) => {
          const currentElementIndex = Number(element.recipeindex);
          this.removeRenameRecipeForm(currentElementIndex);
        });
      }

      this.addDeleteRecipeForm(recipeindex, name);

      this.shadowRoot.getElementById("btn-reposition-recipe").disabled = true;
      this.shadowRoot.getElementById("btn-new-recipe").disabled = true;
    });

    this.addEventListener("remove-delete-recipe-form", async () => {
      this.removeDeleteRecipeForm();

      this.shadowRoot.getElementById("btn-new-recipe").disabled = false;

      if (this.menu[this.categoryindex].recipes.length < 2) {
        return;
      }

      this.shadowRoot.getElementById("btn-reposition-recipe").disabled = false;
    });
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("menu")) {
      if (!this.menu.length) {
        return;
      }

      this.menu = [...this.menu];

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("close-hanging-recipe-menus", {
          bubbles: true,
          composed: true,
        }),
      );
    }

    if (changedProperties.has("resetRecipeMenuButtons")) {
      if (this.resetRecipeMenuButtons) {
        await this.updateComplete;
        this.dispatchEvent(
          new CustomEvent("close-hanging-recipe-menus", {
            bubbles: true,
            composed: true,
          }),
        );

        const element = this.shadowRoot.querySelector("new-recipe-element");
        if (element) {
          element.setAttribute("cancelNewRecipeForm", this.cancelNewRecipeForm);
          this.cancelNewRecipeForm = "true";
          await this.updateComplete;
          this.cancelNewRecipeForm = "false";
        }

        if (this.triggerRepositionButtons) {
          this.repositionRecipes();
        }
      }
    }
  }

  resetArrowImagesAndHideIngredientElements() {
    const expandRecipeButtons = this.shadowRoot.querySelectorAll(
      "expand-recipe-element",
    );
    expandRecipeButtons.forEach(
      (element) => (element.src = "../img/arrow_right-light.svg"),
    );

    const ingredientElements =
      this.shadowRoot.querySelectorAll("ingredient-element");
    ingredientElements.forEach((element) => (element.hidden = true));
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

  async repositionRecipes() {
    this.triggerRepositionButtons = !this.triggerRepositionButtons;
    this.disableExpandRecipeElement = !this.disableExpandRecipeElement;

    if (!this.triggerRepositionButtons) {
      this.resetIngredientSearchButton = true;
      await this.updateComplete;
      this.resetIngredientSearchButton = false;
    }

    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("close-hanging-recipe-menus", {
        bubbles: true,
        composed: true,
      }),
    );

    const recipeMenuButtons = this.shadowRoot.querySelectorAll(
      "options-recipe-element",
    );
    recipeMenuButtons.forEach((button) => {
      button.hidden ? (button.hidden = false) : (button.hidden = true);
    });

    this.resetArrowImagesAndHideIngredientElements();

    const newRecipeButton = this.shadowRoot.getElementById("btn-new-recipe");
    newRecipeButton.disabled
      ? (newRecipeButton.disabled = false)
      : (newRecipeButton.disabled = true);
    this.shadowRoot
      .querySelector(".p-new-recipe-text")
      .classList.toggle("p-disabled");
  }

  moveRecipeUp(recipeindex) {
    if (recipeindex == 0) {
      return;
    }

    const recipe = { ...this.menu[this.categoryindex].recipes[recipeindex] };
    let recipes = this.menu[this.categoryindex].recipes.toSpliced(
      recipeindex,
      1,
    );
    recipes = recipes.toSpliced(recipeindex - 1, 0, recipe);
    this.menu[this.categoryindex].recipes = [...recipes];
  }

  moveRecipeDown(recipeindex) {
    const recipe = { ...this.menu[this.categoryindex].recipes[recipeindex] };
    let recipes = this.menu[this.categoryindex].recipes.toSpliced(
      recipeindex,
      1,
    );
    recipes = recipes.toSpliced(recipeindex + 1, 0, recipe);
    this.menu[this.categoryindex].recipes = [...recipes];
  }

  createNewRecipe() {
    if (this.shadowRoot.querySelector("new-recipe-element")) {
      this.removeNewRecipeForm();
      return;
    }

    this.addNewRecipeForm();
  }

  addNewRecipeForm() {
    this.shadowRoot.getElementById("btn-reposition-recipe").disabled = true;
    this.shadowRoot
      .querySelector(".p-reposition-text")
      .classList.add("p-disabled");
    this.resetArrowImagesAndHideIngredientElements();
    this.disableExpandRecipeElement = true;
    this.disableRecipeMenuButton = true;

    const section = this.shadowRoot.querySelector(".div-recipe-container");
    const element = document.createElement("new-recipe-element");
    element.setAttribute("categoryindex", this.categoryindex);
    element.classList.add("new-recipe-form");
    section.prepend(element);
  }

  removeNewRecipeForm() {
    this.resetArrowImagesAndHideIngredientElements();
    this.disableExpandRecipeElement = false;
    this.disableRecipeMenuButton = false;

    this.shadowRoot.querySelector("new-recipe-element").remove();

    if (this.menu[this.categoryindex].recipes.length < 2) {
      return;
    }

    this.shadowRoot.getElementById("btn-reposition-recipe").disabled = false;
    this.shadowRoot
      .querySelector(".p-reposition-text")
      .classList.remove("p-disabled");
  }

  addRenameRecipeForm(recipeindex) {
    // RESET ANY CURRENTLY PENDING RENAMES
    const currentRenameElement = this.shadowRoot.querySelector(
      "rename-recipe-element",
    );
    if (currentRenameElement) {
      const currentElementIndex = currentRenameElement.recipeindex;
      this.removeRenameRecipeForm(currentElementIndex);
    }

    // HIDE DIV CATEGORY BUTTON CONTAINER
    const params = `expand-recipe-element[recipeindex="${recipeindex}"]`;
    const expandRecipeButton = this.shadowRoot.querySelector(params);
    const recipe = expandRecipeButton.recipe;
    expandRecipeButton.hidden = true;

    // HIDE OPTIONS BUTTON
    const optionsParams = `options-recipe-element[recipeindex="${recipeindex}"]`;
    const optionsRecipeButton = this.shadowRoot.querySelector(optionsParams);
    optionsRecipeButton.hidden = true;

    // CREATE RENAME ELEMENT WITH NECESSARY ATTRIBUTES
    const newElementId = `rename-recipe-${recipeindex}`;
    const renameRecipeElement = document.createElement("rename-recipe-element");
    renameRecipeElement.setAttribute("id", newElementId);
    renameRecipeElement.setAttribute("categoryindex", this.categoryindex);
    renameRecipeElement.setAttribute("recipeindex", recipeindex);
    renameRecipeElement.setAttribute("recipe", recipe);

    // APPEND PARENT DIV WITH RENAME ELEMENT
    const elementParentDivId = `expand-recipe-${recipeindex}`;
    const elementParentDiv = this.shadowRoot.getElementById(elementParentDivId);
    elementParentDiv.append(renameRecipeElement);
  }

  removeRenameRecipeForm(recipeindex) {
    const elementId = `rename-recipe-${recipeindex}`;
    const currentRenameElement = this.shadowRoot.getElementById(elementId);
    currentRenameElement.remove();

    const optionsParams = `options-recipe-element[recipeindex="${recipeindex}"]`;
    const optionsRecipeButton = this.shadowRoot.querySelector(optionsParams);
    optionsRecipeButton.hidden = false;

    const params = `expand-recipe-element[recipeindex="${recipeindex}"]`;
    const expandRecipeButton = this.shadowRoot.querySelector(params);
    expandRecipeButton.hidden = false;
  }

  addDeleteRecipeForm(recipeindex, name) {
    const section = this.shadowRoot.querySelector("section");
    section.hidden = true;

    const currentDeleteRecipeElement = this.shadowRoot.querySelector(
      "delete-recipe-element",
    );
    if (currentDeleteRecipeElement) {
      currentDeleteRecipeElement.remove();
    }

    const deleteRecipeElement = document.createElement("delete-recipe-element");
    deleteRecipeElement.setAttribute("categoryindex", this.categoryindex);
    deleteRecipeElement.setAttribute("recipeindex", recipeindex);
    deleteRecipeElement.setAttribute("recipe", name);
    this.shadowRoot.prepend(deleteRecipeElement);
  }

  removeDeleteRecipeForm() {
    const section = this.shadowRoot.querySelector("section");
    section.hidden = false;

    const deleteRecipeElement = this.shadowRoot.querySelector(
      "delete-recipe-element",
    );
    deleteRecipeElement.remove();
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    section {
      margin: auto;
    }
    .div-buttons-container {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
    }
    .div-buttons-container img {
      width: 28px;
      height: 28px;
    }
    button {
      cursor: pointer;
      background-color: rgb(57, 62, 70);
      border: 1px solid;
      border-color: transparent;
      width: 64px;
      height: 64px;
      transition-duration: 300ms;
    }
    button:disabled img,
    .p-disabled {
      opacity: 0.5;
    }
    button:disabled:hover {
      background-color: rgb(57, 62, 70);
    }
    button:disabled:focus {
      background-color: rgb(57, 62, 70);
    }
    button:hover {
      background-color: rgb(34, 40, 49);
      border-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(34, 40, 49);
      border-color: rgb(0, 173, 181);
    }
    .p-reposition-text,
    .p-new-recipe-text {
      font-size: 8px;
      font-style: italic;
      line-height: 8px;
      text-align: center;
      margin-top: 2px;
    }

    .div-recipe-container {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 5px 0;
    }
    article {
      display: flex;
      padding: 0 5px;
    }
    .div-expand-recipe {
      width: 100%;
    }
    .new-recipe-form {
      padding: 20px;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-buttons-container">
          <div>
            <button
              ?disabled=${this.menu[this.categoryindex].recipes.length < 2}
              id="btn-reposition-recipe"
              type="button"
              @click=${this.repositionRecipes}
              aria-label="Button to rearrange ${this.menu[this.categoryindex]
                .category}'s recipes"
            >
              <img
                src="../../img/priority-light.svg"
                alt="Rearrangement symbol"
              />
            </button>
            <p
              class="p-reposition-text ${this.menu[this.categoryindex].recipes
                .length < 2
                ? "p-disabled"
                : null}"
            >
              REPOSITION<br />RECIPES
            </p>
          </div>

          <div>
            <button
              ?disabled=${!this.menu[this.categoryindex].recipes.length}
              id="btn-new-recipe"
              type="button"
              @click=${this.createNewRecipe}
              aria-label="Button to create a new recipe in ${this.menu[
                this.categoryindex
              ].category}"
            >
              <img src="../../img/add_box-light.svg" alt="Addition symbol" />
            </button>
            <p
              class="p-new-recipe-text ${!this.menu[this.categoryindex].recipes
                .length
                ? "p-disabled"
                : null}"
            >
              CREATE<br />RECIPE
            </p>
          </div>
        </div>

        <div class="div-recipe-container">
          ${!this.menu[this.categoryindex].recipes.length
            ? html`<first-recipe-element
                .categoryindex=${this.categoryindex}
              ></first-recipe-element>`
            : this.menu[this.categoryindex].recipes.map(
                (object, recipeindex) => {
                  return html`
                    <article>
                      <div
                        id="expand-recipe-${recipeindex}"
                        class="div-expand-recipe"
                      >
                        <!--  ►  -->
                        <expand-recipe-element
                          recipeindex=${recipeindex}
                          recipe=${object.name}
                          .disableExpandRecipeElement=${this
                            .disableExpandRecipeElement}
                        >
                        </expand-recipe-element>
                      </div>

                      <!-- ... -->
                      <options-recipe-element
                        recipeindex=${recipeindex}
                        recipe=${object.name}
                        .disableRecipeMenuButton=${this.disableRecipeMenuButton}
                      >
                      </options-recipe-element>

                      <!-- ↑↓ -->
                      <reposition-recipe-element
                        ?hidden=${!this.triggerRepositionButtons}
                        recipeindex=${recipeindex}
                        recipe=${object.name}
                      >
                      </reposition-recipe-element>
                    </article>

                    <ingredient-element
                      hidden
                      id="parent-recipe-${recipeindex}"
                      .menu=${this.menu}
                      .categoryindex=${this.categoryindex}
                      .recipeindex=${recipeindex}
                      recipe=${object.name}
                      .searchIngredientResults=${this.searchIngredientResults}
                      .resetIngredientSearchButton=${this
                        .resetIngredientSearchButton}
                    >
                    </ingredient-element>
                  `;
                },
              )}
        </div>
      </section>
    `;
  }
}

customElements.define("recipe-element", RecipeElement);
