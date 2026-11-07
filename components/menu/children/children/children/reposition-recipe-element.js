import { LitElement, html, css } from "lit";

export class RepositionRecipeElement extends LitElement {
  static properties = {
    recipeindex: { type: String },
    recipe: { type: String },
  };

  constructor() {
    super();
  }

  async moveRecipeUp() {
    const options = {
      detail: {
        recipeindex: this.recipeindex,
        direction: "up",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("reposition-recipe", options));
  }

  async moveRecipeDown() {
    const options = {
      detail: {
        recipeindex: this.recipeindex,
        direction: "down",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("reposition-recipe", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      outline: none;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    div {
      display: flex;
      gap: 1px;
      height: 100%;
      padding: 0 2px;
    }
    button {
      cursor: pointer;
      background-color: rgb(57, 62, 70);
      padding: 16px;
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      transition-duration: 300ms;
    }
    button:hover {
      background-color: rgb(34, 40, 49);
      border-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(34, 40, 49);
      border-color: rgb(0, 173, 181);
    }
  `;

  render() {
    return html`
      <div>
        <button
          type="button"
          @click=${this.moveRecipeUp}
          aria-label="Button to shift ${this.recipe} up one position"
        >
          <img
            src="../img/arrow_circle_up-light.svg"
            alt="Symbol for up arrow"
          />
        </button>

        <button
          type="button"
          @click=${this.moveRecipeDown}
          aria-label="Button to shift ${this.recipe} down one position"
        >
          <img
            src="../img/arrow_circle_down-light.svg"
            alt="Symbol for down arrow"
          />
        </button>
      </div>
    `;
  }
}

customElements.define("reposition-recipe-element", RepositionRecipeElement);
