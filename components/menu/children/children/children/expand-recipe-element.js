import { LitElement, html, css } from "lit";

export class ExpandRecipeElement extends LitElement {
  static properties = {
    recipeindex: { type: Number },
    recipe: { type: String },
    src: { type: String },
    disableExpandRecipeElement: { type: Boolean },
  };

  constructor() {
    super();
    this.src = "../img/arrow_right-light.svg";
  }

  async triggerExpandRecipe() {
    const options = {
      detail: {
        recipeindex: this.recipeindex,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("expand-recipe", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      overflow: none;
      color: rgb(238, 238, 238);
    }
    button {
      cursor: pointer;
      background-color: rgb(57, 62, 70);
      border: 1px solid;
      border-color: transparent;
      width: 100%;
      height: 100%;
      padding: 5px;
      transition-duration: 300ms;
    }
    button:disabled img {
      opacity: 0;
    }
    button:disabled:hover,
    button:disabled:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(34, 40, 49);
    }
    button:hover {
      background-color: rgb(34, 40, 49);
      border-color: rgb(57, 62, 70);
    }
    button:focus {
      background-color: rgb(34, 40, 49);
      border-color: rgb(0, 173, 181);
    }
    div {
      display: grid;
      grid-template-columns: 18px 1fr;
      grid-template-rows: 1fr;
      align-items: center;
    }
    img {
      width: 18px;
      height: 18px;
    }
    p {
      font-size: 16px;
      letter-spacing: 1.2px;
      word-break: break-all;
    }
  `;

  render() {
    return html`
      <button
        ?disabled=${this.disableExpandRecipeElement}
        type="button"
        @click=${this.triggerExpandRecipe}
        aria-label="Button to expand ${this.recipe}'s list of recipes"
      >
        <div>
          <img src=${this.src} alt="A dropdown arrow" />
          <p>${this.recipe}</p>
        </div>
      </button>
    `;
  }
}

customElements.define("expand-recipe-element", ExpandRecipeElement);
