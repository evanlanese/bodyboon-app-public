import { LitElement, html, css } from "lit";

export class DeleteRecipeElement extends LitElement {
  static properties = {
    categoryindex: { type: String },
    recipeindex: { type: String },
    recipe: { type: String },
  };

  constructor() {
    super();
  }

  async submitDeletedRecipe(event) {
    event.preventDefault();
    const options = {
      detail: {
        categoryindex: Number(this.categoryindex),
        recipeindex: Number(this.recipeindex),
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("delete-recipe", options));

    this.dispatchEvent(new CustomEvent("remove-delete-recipe-form", options));
  }

  async removeDeleteRecipeForm() {
    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("remove-delete-recipe-form", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    form {
      background-color: rgb(57, 62, 70);
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
      background-color: rgb(34, 40, 49);
      border-color: rgb(57, 62, 70);
      color: rgb(238, 238, 238);
    }
    button:focus {
      background-color: rgb(34, 40, 49);
      border-color: rgb(0, 173, 181);
      color: rgb(238, 238, 238);
    }
  `;

  render() {
    return html`
      <form @submit=${this.submitDeletedRecipe}>
        <div class="div-text">
          <h3>${this.recipe}</h3>
        </div>
        <label for="recipe">PLEASE <span>CONFIRM DELETION</span></label>
        <div class="div-form-buttons">
          <button
            type="submit"
            aria-label="Button to confirm deletion of ${this.recipe} recipe"
          >
            CONFIRM
          </button>
          <button
            type="button"
            @click=${this.removeDeleteRecipeForm}
            aria-label="Button to cancel the deletion of ${this.recipe} recipe"
          >
            CANCEL
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("delete-recipe-element", DeleteRecipeElement);
