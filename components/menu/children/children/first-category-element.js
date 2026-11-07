import { LitElement, html, css } from "lit";

export class FirstCategoryElement extends LitElement {
  constructor() {
    super();
  }

  async saveNewCategory(event) {
    event.preventDefault();
    const category = event.target.category.value;

    const options = {
      detail: {
        category: category,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("add-category", options));
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
    label {
      color: rgb(238, 238, 238);
      font-size: 18px;
      letter-spacing: 0.5px;
      line-height: 24px;
      padding-bottom: 10px;
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
    return html`
      <form @submit=${this.saveNewCategory}>
        <label for="category">CREATE YOUR FIRST CATEGORY</label>
        <input
          required
          type="text"
          placeholder="enter a category name"
          name="category"
          id="category"
          autocomplete="off"
          minlength="3"
          maxlength="30"
          aria-label="Field to type in a new category name"
        />
        <button
          type="submit"
          aria-label="Button to submit the creation of a new category"
        >
          SUBMIT
        </button>
      </form>
    `;
  }
}

customElements.define("first-category-element", FirstCategoryElement);
