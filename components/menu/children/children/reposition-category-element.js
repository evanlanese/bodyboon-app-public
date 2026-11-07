import { LitElement, html, css } from "lit";

export class RepositionCategoryElement extends LitElement {
  static properties = {
    categoryindex: { type: String },
    category: { type: String },
  };

  constructor() {
    super();
  }

  async moveCategoryUp() {
    const options = {
      detail: {
        categoryindex: Number(this.categoryindex),
        direction: "up",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("reposition-category", options));
  }

  async moveCategoryDown() {
    const options = {
      detail: {
        categoryindex: Number(this.categoryindex),
        direction: "down",
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("reposition-category", options));
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
    }
    button {
      cursor: pointer;
      background-color: rgb(57, 62, 70);
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      padding: 16px;
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
          @click=${this.moveCategoryUp}
          aria-label="Button to shift ${this.category} up one position"
        >
          <img
            src="../img/arrow_circle_up-light.svg"
            alt="Symbol for up arrow"
          />
        </button>

        <button
          type="button"
          @click=${this.moveCategoryDown}
          aria-label="Button to shift ${this.category} down one position"
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

customElements.define("reposition-category-element", RepositionCategoryElement);
