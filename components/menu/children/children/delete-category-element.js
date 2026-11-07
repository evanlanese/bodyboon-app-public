import { LitElement, html, css } from "lit";

export class DeleteCategoryElement extends LitElement {
  static properties = {
    categoryindex: { type: String },
    categoryObject: { type: String },
  };

  constructor() {
    super();
  }

  async submitDeletedCategory(event) {
    event.preventDefault();
    const options = {
      detail: {
        categoryindex: this.categoryindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("delete-category", options));
    this.dispatchEvent(new CustomEvent("remove-delete-category-form", options));
  }

  async removeDeleteCategoryForm() {
    const options = {
      detail: {
        categoryindex: this.categoryindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("remove-delete-category-form", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    form {
      background-color: rgb(34, 40, 49);
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 375px;
      padding: 20px;
      border: 0.5px solid rgb(110, 110, 110);
      margin: 20px auto;
    }
    .div-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: auto;
    }
    h3 {
      font-size: 22px;
      font-weight: 300;
      word-break: break-all;
      color: rgb(238, 238, 238);
    }
    p {
      font-size: 16px;
      text-align: end;
      color: rgb(238, 238, 238);
    }
    span {
      color: red;
      font-size: 16px;
      font-weight: 600;
    }
    label {
      color: rgb(238, 238, 238);
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 24px;
    }
    .div-form-buttons {
      display: flex;
      gap: 5px;
    }
    button {
      cursor: pointer;
      font-size: 14px;
      color: rgb(14, 14, 14);
      line-height: 22px;
      width: 100%;
      min-height: 44px;
      padding: 0px 16px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      margin-top: 10px;
      transition: 0.4s;
    }
    button:hover {
      background-color: rgb(57, 62, 70);
      border-color: rgb(34, 40, 49);
      color: rgb(238, 238, 238);
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
      color: rgb(238, 238, 238);
    }
  `;

  render() {
    const meal = JSON.parse(this.categoryObject);
    let count = 0;
    meal.recipes.map((recipe) => count++);

    return html`
      <form @submit=${this.submitDeletedCategory}>
        <div class="div-text">
          <h3>${meal.category}</h3>
          ${!meal.recipes.length ? "" : html`<p>${count}X RECIPES</p>`}
        </div>
        <label for="category">PLEASE <span>CONFIRM DELETION</span></label>
        <div class="div-form-buttons">
          <button
            type="submit"
            aria-label="Button to confirm deletion of the ${meal.category} category"
          >
            CONFIRM
          </button>
          <button
            type="button"
            @click=${this.removeDeleteCategoryForm}
            aria-label="Button to cancel the deletion of the ${meal.category} category"
          >
            CANCEL
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("delete-category-element", DeleteCategoryElement);
