import { LitElement, html, css } from "lit";

export class ConfirmEmailElement extends LitElement {
  constructor() {
    super();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value.trim().toLowerCase();

    const options = {
      detail: { email: email },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("confirmed-email", options));
  }

  static styles = css`
    * {
      font-weight: 500;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    form {
      display: flex;
      overflow-x: hidden;
      flex-direction: column;
      max-width: 375px;
      margin: 0px auto;
    }
    label {
      font-size: 11px;
      color: rgb(110, 110, 110);
      letter-spacing: 0.5px;
      line-height: 16px;
    }
    .div-input {
      min-height: 44px;
      padding: 11px 0;
    }
    input {
      font-size: 16px;
      color: rgb(110, 110, 110);
      line-height: 22px;
      outline: none;
      border: none;
      border-bottom: 0.5px solid rgb(110, 110, 110);
      width: 100%;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    input:focus {
      border-bottom: 1px solid black;
    }
    button {
      cursor: pointer;
      font-size: 14px;
      color: rgb(14, 14, 14);
      line-height: 22px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      width: 100%;
      min-height: 44px;
      padding: 0px 16px;
      margin-top: 10px;
      transition: 0.4s;
    }
    button:focus {
      border: 1px solid rgb(14, 14, 14);
      outline: none;
    }
    button:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
  `;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label for="email">EMAIL ADDRESS</label>
        <div class="div-input">
          <input
            required
            type="email"
            placeholder="Email address"
            name="email"
            id="email"
            autocomplete="off"
            minlength="10"
            maxlength="64"
          />
        </div>

        <button
          type="submit"
          aria-label="Button to confirm email during sign up."
        >
          CONFIRM EMAIL
        </button>
      </form>
    `;
  }
}

customElements.define("confirm-email-element", ConfirmEmailElement);
