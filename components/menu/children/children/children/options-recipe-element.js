import { LitElement, html, css } from "lit";

export class OptionsRecipeElement extends LitElement {
  static properties = {
    recipeindex: { type: String },
    recipe: { type: String },
    closeAllRecipeMenus: { type: Boolean },
    closeHangingRecipeMenus: { type: Boolean },
    disableRecipeMenuButton: { type: Boolean },
  };

  constructor() {
    super();
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("closeHangingRecipeMenus")) {
      if (this.closeHangingRecipeMenus) {
        this.shadowRoot.querySelector(".div-menu").hidden = true;
        this.closeHangingRecipeMenus = false;
      }
    }
  }

  async triggerMenuWindow() {
    const currentRecipeOptionsMenu = this.shadowRoot.querySelector(".div-menu");
    currentRecipeOptionsMenu.hidden
      ? (currentRecipeOptionsMenu.hidden = false)
      : (currentRecipeOptionsMenu.hidden = true);

    const options = {
      detail: {
        recipeindex: this.recipeindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("close-hanging-recipe-menus", options));
  }

  async addRenameRecipeForm() {
    this.shadowRoot.querySelector(".div-menu").hidden = true;

    const options = {
      detail: {
        recipeindex: this.recipeindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("add-rename-recipe-form", options));
  }

  async addDeleteRecipeForm() {
    this.shadowRoot.querySelector(".div-menu").hidden = true;

    const options = {
      detail: {
        recipeindex: this.recipeindex,
        name: this.recipe,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("add-delete-recipe-form", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      color: rgb(238, 238, 238);
      height: 100%;
    }
    .btn-recipe-options {
      background-color: rgb(57, 62, 70);
      width: 60px;
      padding: 18px 14px;
    }
    .btn-recipe-options:hover {
      background-color: rgb(34, 40, 49);
      border-color: rgb(57, 62, 70);
    }
    .btn-recipe-options:focus {
      border-color: rgb(0, 173, 181);
    }
    .btn-recipe-options,
    .btn-menu {
      border: 1px solid;
      border-color: transparent;
      transition-duration: 300ms;
      word-break: break-all;
    }
    button {
      cursor: pointer;
      width: 100%;
    }
    button:disabled img {
      opacity: 0.5;
    }
    button:disabled:hover,
    button:disabled:focus {
      background-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }

    .div-menu {
      pointer-events: none;
      position: relative;
    }
    .div-menu-window {
      pointer-events: auto;
      background-color: rgb(57, 62, 70);
      position: absolute;
      top: -100%;
      right: 100%;
      display: flex;
      gap: 2px;
      z-index: 50;
      width: 250px;
      padding: 0 2px;
    }
    .btn-menu {
      background-color: rgb(34, 40, 49);
      font-size: 10px;
    }
    span {
      font-size: 14px;
      font-weight: 700;
    }
    .btn-menu:hover {
      background-color: rgb(238, 238, 238);
      font-size: 0px;
    }
    .btn-menu:hover span {
      color: rgb(34, 40, 49);
    }
  `;

  render() {
    return html`
      <button
        ?disabled=${this.disableRecipeMenuButton}
        class="btn-recipe-options"
        @click=${this.triggerMenuWindow}
        type="button"
        aria-label="Button to expand the ${this.recipe} recipe options"
      >
        <img src="../img/more_vert-light.svg" alt="Symbol of three dots" />
      </button>

      <div hidden class="div-menu">
        <div class="div-menu-window">
          <button
            class="btn-menu"
            type="button"
            @click=${this.addRenameRecipeForm}
            aria-label="Button to rename the ${this.recipe} recipe"
          >
            <span>RENAME</span><br />
            ${this.recipe}
          </button>
          <button
            class="btn-menu"
            type="button"
            aria-label="Button to delete the ${this.recipe} recipe"
            @click=${this.addDeleteRecipeForm}
          >
            <span>DELETE</span><br />
            ${this.recipe}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("options-recipe-element", OptionsRecipeElement);
