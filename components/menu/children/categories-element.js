import { LitElement, html, css } from "lit";
import { FirstCategoryElement } from "./children/first-category-element.js";
import { NewCategoryElement } from "./children/new-category-element.js";
import { ExpandCategoryElement } from "./children/expand-category-element.js";
import { OptionsCategoryElement } from "./children/options-category-element.js";
import { RenameCategoryElement } from "./children/rename-category-element.js";
import { DeleteCategoryElement } from "./children/delete-category-element.js";
import { RepositionCategoryElement } from "./children/reposition-category-element.js";
import { RecipeElement } from "./children/recipe-element.js";

export class CategoriesElement extends LitElement {
  static properties = {
    menu: { type: Array },
    triggerRepositionButtons: { type: Boolean },
    triggerNewCategoryForm: { type: Boolean },
    disableExpandCategoryElement: { type: Boolean },
    disableCategoryMenuButton: { type: Boolean },
    closeAllRecipeMenus: { type: Boolean },
    searchIngredientResults: { type: Array },
    resetRecipeMenuButtons: { type: Boolean },
  };

  constructor() {
    super();

    this.addEventListener("close-all-category-menus", () => {
      const optionCategoryElements = this.shadowRoot.querySelectorAll(
        "options-category-element",
      );
      optionCategoryElements.forEach(
        (element) => (element.closeCategoryMenu = true),
      );
    });

    this.addEventListener("close-hanging-category-menus", (event) => {
      const categoryindex = event.detail.categoryindex;

      const optionCategoryElements = this.shadowRoot.querySelectorAll(
        "options-category-element",
      );
      optionCategoryElements.forEach((element) => {
        if (element.categoryindex === categoryindex) {
          return;
        }
        element.closeCategoryMenu = true;
      });
    });

    this.addEventListener("expand-category", async (event) => {
      const categoryindex = event.detail.categoryindex;
      let params;

      // RECIPE TO EXPAND
      const recipeElementId = `parent-category-${categoryindex}`;
      const recipeElementToExpand =
        this.shadowRoot.getElementById(recipeElementId);

      // HIDE IF SELECTED IS ALREADY VISIBLE
      if (!recipeElementToExpand.hidden) {
        params = `expand-category-element[categoryindex="${categoryindex}"]`;
        const expandCategoryButton = this.shadowRoot.querySelector(params);
        expandCategoryButton.src = "../img/arrow_right-light.svg";
        recipeElementToExpand.hidden = true;

        await this.updateComplete;
        this.dispatchEvent(
          new CustomEvent("close-all-category-menus", {
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }

      // RESET ALL ARROWS
      const expandCategoryButtons = this.shadowRoot.querySelectorAll(
        "expand-category-element",
      );
      expandCategoryButtons.forEach(
        (element) => (element.src = "../img/arrow_right-light.svg"),
      );

      // HIDE ALL RECIPES THAT DONT MATCH CATEGORYINDEX
      const recipeElements = this.shadowRoot.querySelectorAll("recipe-element");
      recipeElements.forEach((element) => {
        if (recipeElementToExpand.id === element.id) {
          params = `expand-category-element[categoryindex="${categoryindex}"]`;
          const expandCategoryButton = this.shadowRoot.querySelector(params);
          expandCategoryButton.src = "../img/arrow_down-light.svg";
          recipeElementToExpand.hidden = false;
          return;
        }
        element.hidden = true;
      });

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("close-all-category-menus", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.addEventListener("reposition-category", async (event) => {
      const categoryindex = event.detail.categoryindex;
      const direction = event.detail.direction;

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("close-all-category-menus", {
          bubbles: true,
          composed: true,
        }),
      );

      this.resetChildRecipeMenuButtons();
      this.resetArrowImagesAndHideRecipeElements();

      if (direction === "up") {
        this.moveCategoryUp(categoryindex);
      } else {
        this.moveCategoryDown(categoryindex);
      }

      this.updateUserMenuDB();
    });

    this.addEventListener("remove-new-category-form", () => {
      this.resetChildRecipeMenuButtons();
      this.removeNewCategoryForm();
    });

    this.addEventListener("add-rename-category-form", async (event) => {
      const categoryindex = event.detail.categoryindex;
      this.addRenameCategoryForm(categoryindex);

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("disable-menu-buttons", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.addEventListener("remove-rename-category-form", async (event) => {
      const categoryindex = event.detail.categoryindex;
      this.removeRenameCategoryForm(categoryindex);

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("enable-menu-buttons", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.addEventListener("add-delete-category-form", async (event) => {
      const categoryindex = event.detail.categoryindex;

      // REMOVE ANY PENDING RENAME CATEGORY ELEMENTS
      const renameCategoryElements = this.shadowRoot.querySelectorAll(
        "rename-category-element",
      );
      if (renameCategoryElements.length) {
        renameCategoryElements.forEach((element) => {
          const currentElementIndex = Number(element.categoryindex);
          this.removeRenameCategoryForm(currentElementIndex);
        });
      }

      this.addDeleteCategoryForm(categoryindex);

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("disable-menu-buttons", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.addEventListener("remove-delete-category-form", async (event) => {
      const categoryindex = event.detail.categoryindex;

      const optionCategoryElements = this.shadowRoot.querySelectorAll(
        "options-category-element",
      );
      optionCategoryElements.forEach((element) => {
        if (element.categoryindex === categoryindex) {
          return;
        }
        element.closeCategoryMenu = true;
      });
      this.resetArrowImagesAndHideRecipeElements();

      this.resetChildRecipeMenuButtons();

      this.removeDeleteCategoryForm();

      await this.updateComplete;
      this.dispatchEvent(
        new CustomEvent("enable-menu-buttons", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    // GLOBAL RECIPE-ELEMENT EVENTS
    this.addEventListener("close-all-recipe-menus", async () => {
      this.triggerCloseAllRecipeMenus();
    });
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("menu")) {
      if (!this.menu.length) {
        return;
      }
    }

    if (changedProperties.has("triggerRepositionButtons")) {
      if (this.triggerRepositionButtons) {
        this.resetChildRecipeMenuButtons();

        this.disableExpandCategoryElement = true;
        this.triggerCloseAllRecipeMenus();

        const categoryMenuButtons = this.shadowRoot.querySelectorAll(
          "options-category-element",
        );
        categoryMenuButtons.forEach((button) => (button.hidden = true));

        await this.updateComplete;
        this.dispatchEvent(
          new CustomEvent("close-all-category-menus", {
            bubbles: true,
            composed: true,
          }),
        );

        this.resetArrowImagesAndHideRecipeElements();
      } else {
        this.disableExpandCategoryElement = false;

        const categoryMenuButtons = this.shadowRoot.querySelectorAll(
          "options-category-element",
        );
        categoryMenuButtons.forEach((button) => (button.hidden = false));
      }
    }

    if (changedProperties.has("triggerNewCategoryForm")) {
      this.triggerCloseAllRecipeMenus();

      if (this.shadowRoot.querySelector("new-category-element")) {
        this.removeNewCategoryForm();
        return;
      }
      this.resetChildRecipeMenuButtons();
      this.addNewCategoryForm();
    }
  }

  async resetChildRecipeMenuButtons() {
    this.resetRecipeMenuButtons = true;
    await this.updateComplete;
    this.resetRecipeMenuButtons = false;
  }

  resetArrowImagesAndHideRecipeElements() {
    const expandCategoryButtons = this.shadowRoot.querySelectorAll(
      "expand-category-element",
    );
    expandCategoryButtons.forEach(
      (element) => (element.src = "../img/arrow_right-light.svg"),
    );

    const recipeElements = this.shadowRoot.querySelectorAll("recipe-element");
    recipeElements.forEach((element) => (element.hidden = true));
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

  addNewCategoryForm() {
    this.resetArrowImagesAndHideRecipeElements();
    this.disableExpandCategoryElement = true;
    this.disableCategoryMenuButton = true;

    const section = this.shadowRoot.querySelector("section");
    const element = document.createElement("new-category-element");
    section.prepend(element);
  }

  async removeNewCategoryForm() {
    this.resetArrowImagesAndHideRecipeElements();
    this.disableExpandCategoryElement = false;
    this.disableCategoryMenuButton = false;

    this.shadowRoot.querySelector("new-category-element").remove();

    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("enable-reposition-button", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  addRenameCategoryForm(categoryindex) {
    // RESET ANY CURRENTLY PENDING RENAMES
    const currentRenameElement = this.shadowRoot.querySelector(
      "rename-category-element",
    );
    if (currentRenameElement) {
      const categoryindex = currentRenameElement.categoryindex;
      this.removeRenameCategoryForm(categoryindex);
    }

    // HIDE DIV CATEGORY BUTTON CONTAINER
    const expandParams = `expand-category-element[categoryindex="${categoryindex}"]`;
    const expandCategoryButton = this.shadowRoot.querySelector(expandParams);
    const category = expandCategoryButton.category;
    expandCategoryButton.hidden = true;

    // HIDE OPTIONS BUTTON
    const optionsParams = `options-category-element[categoryindex="${categoryindex}"]`;
    const optionsCategoryButton = this.shadowRoot.querySelector(optionsParams);
    optionsCategoryButton.hidden = true;

    // HIDE RECIPE ELEMENT
    const recipeId = `parent-category-${categoryindex}`;
    const recipeElement = this.shadowRoot.getElementById(recipeId);
    recipeElement.hidden = true;

    // CREATE RENAME ELEMENT WITH NECESSARY ATTRIBUTES
    const newElementId = `rename-category-${categoryindex}`;
    const renameCategoryElement = document.createElement(
      "rename-category-element",
    );
    renameCategoryElement.setAttribute("id", newElementId);
    renameCategoryElement.setAttribute("categoryindex", categoryindex);
    renameCategoryElement.setAttribute("category", category);

    // APPEND PARENT DIV WITH RENAME ELEMENT
    const elementParentDivId = `expand-category-${categoryindex}`;
    const elementParentDiv = this.shadowRoot.getElementById(elementParentDivId);
    elementParentDiv.append(renameCategoryElement);
  }

  removeRenameCategoryForm(categoryindex) {
    const params = `expand-category-element[categoryindex="${categoryindex}"]`;
    const expandCategoryButton = this.shadowRoot.querySelector(params);
    expandCategoryButton.hidden = false;
    expandCategoryButton.src = "../img/arrow_right-light.svg";

    const optionsParams = `options-category-element[categoryindex="${categoryindex}"]`;
    const optionsCategoryButton = this.shadowRoot.querySelector(optionsParams);
    optionsCategoryButton.hidden = false;

    const elementId = `rename-category-${categoryindex}`;
    const currentRenameElement = this.shadowRoot.getElementById(elementId);
    currentRenameElement.remove();
  }

  addDeleteCategoryForm(categoryindex) {
    const section = this.shadowRoot.querySelector("section");
    section.hidden = true;

    const deleteCategoryElement = document.createElement(
      "delete-category-element",
    );
    deleteCategoryElement.setAttribute("categoryindex", categoryindex);
    deleteCategoryElement.setAttribute(
      "categoryObject",
      JSON.stringify(this.menu[categoryindex]),
    );
    this.shadowRoot.prepend(deleteCategoryElement);
  }

  removeDeleteCategoryForm() {
    const section = this.shadowRoot.querySelector("section");
    section.hidden = false;

    const deleteCategoryElement = this.shadowRoot.querySelector(
      "delete-category-element",
    );
    deleteCategoryElement.remove();
  }

  moveCategoryUp(categoryindex) {
    if (categoryindex === 0) {
      return;
    }

    const category = { ...this.menu[categoryindex] };
    const menu = this.menu.toSpliced(categoryindex, 1);
    this.menu = menu.toSpliced(categoryindex - 1, 0, category);

    this.resetArrowImagesAndHideRecipeElements();
  }

  moveCategoryDown(categoryindex) {
    const category = { ...this.menu[categoryindex] };
    const menu = this.menu.toSpliced(categoryindex, 1);
    this.menu = menu.toSpliced(categoryindex + 1, 0, category);

    this.resetArrowImagesAndHideRecipeElements();
  }

  async triggerCloseAllRecipeMenus() {
    this.closeAllRecipeMenus = true;
    await this.updateComplete;
    this.closeAllRecipeMenus = false;
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    section {
      background-color: transparent;
      min-width: 360px;
      margin: auto;
    }
    .div-category-container {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .div-category {
      background-color: rgb(34, 40, 49);
    }
    .div-flex {
      display: flex;
    }
    .div-expand-category {
      width: 100%;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-category-container">
          ${!this.menu || !this.menu.length
            ? html`<first-category-element></first-category-element>`
            : this.menu.map((object, categoryindex) => {
                return html`
                  <div class="div-category">
                    <div class="div-flex">
                      <div
                        id="expand-category-${categoryindex}"
                        class="div-expand-category"
                      >
                        <!--  ►  -->
                        <expand-category-element
                          categoryindex=${categoryindex}
                          category=${object.category}
                          .disableExpandCategoryElement=${this
                            .disableExpandCategoryElement}
                        >
                        </expand-category-element>
                      </div>
                      <!-- ... -->
                      <options-category-element
                        categoryindex=${categoryindex}
                        category=${object.category}
                        .disableCategoryMenuButton=${this
                          .disableCategoryMenuButton}
                      >
                      </options-category-element>
                      <!-- ↑↓ -->
                      <reposition-category-element
                        ?hidden=${!this.triggerRepositionButtons}
                        categoryindex=${categoryindex}
                        category=${object.category}
                      >
                      </reposition-category-element>
                    </div>

                    <recipe-element
                      hidden
                      id="parent-category-${categoryindex}"
                      .menu=${this.menu}
                      .categoryindex=${categoryindex}
                      .recipeindex=${this.recipeindex}
                      .closeAllRecipeMenus=${this.closeAllRecipeMenus}
                      .searchIngredientResults=${this.searchIngredientResults}
                      .resetRecipeMenuButtons=${this.resetRecipeMenuButtons}
                    >
                    </recipe-element>
                  </div>
                `;
              })}
        </div>
      </section>
    `;
  }
}

customElements.define("categories-element", CategoriesElement);
