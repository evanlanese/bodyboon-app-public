import { LitElement, html, css } from "lit";

export class SearchIngredientElement extends LitElement {
  constructor() {
    super();
  }

  async submitSearchInput(event) {
    event.preventDefault();
    const input = event.target.input.value.trim();

    if (input.length < 3) {
      return;
    }

    event.submitter.disabled = true;

    const options = {
      detail: {
        button: event.submitter,
        input: input,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("search-ingredients", options));
  }

  async clearSearchInput() {
    const input = this.shadowRoot.getElementById("input");
    input.value = "";
    input.focus();

    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent("clear-search-results", {
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
    label {
      color: rgb(238, 238, 238);
      font-size: 18px;
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
    button:disabled {
      opacity: 0.5;
    }
    button:disabled:hover {
      background-color: rgb(242, 242, 242);
      border-color: rgb(242, 242, 242);
      color: rgb(14, 14, 14);
    }
    button:disabled:focus {
      background-color: rgb(242, 242, 242);
      border-color: rgb(242, 242, 242);
      color: rgb(14, 14, 14);
    }
  `;

  render() {
    return html`
      <form @submit=${this.submitSearchInput}>
        <label for="input">SEARCH AN INGREDIENT</label>
        <input
          required
          size="30"
          placeholder="find a food"
          type="search"
          name="input"
          id="input"
          autocomplete="off"
          minlength="3"
          maxlength="30"
        />
        <div class="div-form-buttons">
          <button
            type="submit"
            aria-label="Button to submit a new ingredient search"
          >
            SEARCH
          </button>
          <button
            type="button"
            @click=${this.clearSearchInput}
            aria-label="Button to clear ingredient input & search results"
          >
            CLEAR ALL
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("search-ingredient-element", SearchIngredientElement);
