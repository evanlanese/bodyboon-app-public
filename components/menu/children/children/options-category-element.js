import { LitElement, html, css } from "lit";

export class OptionsCategoryElement extends LitElement {
  static properties = {
    categoryindex: { type: String },
    category: { type: String },
    closeCategoryMenu: { type: String },
    disableCategoryMenuButton: { type: Boolean },
  };

  constructor() {
    super();
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("closeCategoryMenu")) {
      if (this.closeCategoryMenu) {
        this.shadowRoot.querySelector(".div-menu").hidden = true;
        this.closeCategoryMenu = false;
      }
    }
  }

  async triggerMenuWindow() {
    const currentCategoryOptionsMenu =
      this.shadowRoot.querySelector(".div-menu");
    currentCategoryOptionsMenu.hidden
      ? (currentCategoryOptionsMenu.hidden = false)
      : (currentCategoryOptionsMenu.hidden = true);

    const options = {
      detail: {
        categoryindex: this.categoryindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("close-hanging-category-menus", options),
    );
  }

  async addRenameCategoryForm() {
    this.shadowRoot.querySelector(".div-menu").hidden = true;

    const options = {
      detail: {
        categoryindex: this.categoryindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("add-rename-category-form", options));
  }

  async addDeleteCategoryForm() {
    this.shadowRoot.querySelector(".div-menu").hidden = true;

    const options = {
      detail: {
        categoryindex: this.categoryindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("add-delete-category-form", options));
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
    .btn-category-options {
      background-color: rgb(34, 40, 49);
      width: 60px;
      padding: 18px 14px;
    }
    .btn-category-options:hover {
      background-color: rgb(57, 62, 70);
    }
    .btn-category-options,
    .btn-menu {
      border: 1px solid;
      border-color: rgb(34, 40, 49);
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
      background-color: rgb(34, 40, 49);
    }
    button:focus {
      background-color: rgb(34, 40, 49);
      border-color: rgb(0, 173, 181);
    }

    .div-menu {
      pointer-events: none;
      position: relative;
    }
    .div-menu-window {
      pointer-events: auto;
      background-color: rgb(34, 40, 49);
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
      background-color: rgb(57, 62, 70);
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
        ?disabled=${this.disableCategoryMenuButton}
        class="btn-category-options"
        @click=${this.triggerMenuWindow}
        type="button"
        aria-label="Button to expand the ${this.category} category options"
      >
        <img src="../img/more_vert-light.svg" alt="Symbol of three dots" />
      </button>

      <div hidden class="div-menu">
        <div class="div-menu-window">
          <button
            class="btn-menu"
            type="button"
            @click=${this.addRenameCategoryForm}
            aria-label="Button to rename the ${this.category} category"
          >
            <span>RENAME</span><br />
            ${this.category}
          </button>
          <button
            class="btn-menu"
            type="button"
            aria-label="Button to delete the ${this.category} category"
            @click=${this.addDeleteCategoryForm}
          >
            <span>DELETE</span><br />
            ${this.category}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("options-category-element", OptionsCategoryElement);
