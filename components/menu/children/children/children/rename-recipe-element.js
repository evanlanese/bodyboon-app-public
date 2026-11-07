import { LitElement, html, css } from "lit";

export class RenameRecipeElement extends LitElement {
  static properties = {
    categoryindex: { type: String },
    recipeindex: { type: String },
    recipe: { type: String },
  };
  constructor() {
    super();
  }

  async saveNewRecipeName(event) {
    event.preventDefault();
    const input = event.target.recipe.value;

    const options = {
      detail: {
        categoryindex: Number(this.categoryindex),
        recipeindex: Number(this.recipeindex),
        input: input.trim(),
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("rename-recipe", options));

    this.dispatchEvent(new CustomEvent("remove-rename-recipe-form", options));
  }

  async removeRenameRecipeForm() {
    const options = {
      detail: {
        recipeindex: Number(this.recipeindex),
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("remove-rename-recipe-form", options));
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
    h3 {
      font-size: 18px;
      font-weight: 300;
      word-break: break-all;
    }
    label {
      color: rgb(238, 238, 238);
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 24px;
    }
    input {
      font-size: 16px;
      line-height: 22px;
      outline: none;
      width: 100%;
      padding: 7px;
      border: none;
    }
    input::placeholder {
      font-size: 14px;
      color: rgb(110, 110, 110);
    }
    input::-webkit-credentials-auto-fill-button {
      visibility: hidden;
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
      <form @submit=${this.saveNewRecipeName}>
        <h3>${this.recipe}</h3>
        <label for="recipe">EDIT RECIPE NAME</label>
        <input
          required
          type="text"
          placeholder="enter a new name"
          name="recipe"
          id="recipe"
          autocomplete="off"
          minlength="3"
          maxlength="32"
          aria-label="Field to type in a new recipe name"
        />
        <div class="div-form-buttons">
          <button
            type="submit"
            aria-label="Button to save edits to recipe name"
          >
            SAVE
          </button>
          <button
            type="button"
            @click=${this.removeRenameRecipeForm}
            aria-label="Button to cancel editing recipe name"
          >
            CANCEL
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("rename-recipe-element", RenameRecipeElement);
