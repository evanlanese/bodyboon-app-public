import { LitElement, html, css } from "lit";

export class AnalysisIngredientElement extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    recipe: { type: String },
  };

  constructor() {
    super();
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("disabled")) {
      const p = this.shadowRoot.querySelector("p");
      if (!p) {
        return;
      }

      if (this.disabled) {
        p.classList.add("p-disabled");
      } else {
        p.classList.remove("p-disabled");
      }
    }
  }

  async analyzeIngredients(event) {
    event.preventDefault();
    const element = this.shadowRoot.querySelector("p");

    const options = {
      detail: {
        button: event.submitter,
        element: element,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("analyze-ingredients", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      color: rgb(238, 238, 238);
    }
    button {
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      width: 64px;
      height: 64px;
      border: 1px solid;
      border-color: rgb(34, 40, 49);
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

    p {
      font-size: 8px;
      font-style: italic;
      line-height: 8px;
      text-align: center;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .p-disabled {
      opacity: 0.5;
    }
  `;

  render() {
    return html`
      <form @submit=${this.analyzeIngredients}>
        <button
          ?disabled=${this.disabled}
          type="submit"
          aria-label="Button to view the nutritional analysis of ${this
            .recipe}'s ingredients"
        >
          <img
            src="../img/experiment-light.svg"
            alt="A person being inspected"
          />
        </button>

        <p class="${this.disabled ? "p-disabled" : null}">
          Analyze<br />Benefits
        </p>
      </form>
    `;
  }
}

customElements.define("analysis-ingredient-element", AnalysisIngredientElement);
