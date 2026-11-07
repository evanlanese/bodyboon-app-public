import { LitElement, html, css } from "lit";

export class ErrorElement extends LitElement {
  static properties = {
    displayError: { type: String },
  };
  constructor() {
    super();
    this.displayError = "";
  }

  static styles = css`
    p {
      color: red;
      font-size: 18px;
      font-weight: 600;
      padding: 20px;
    }
  `;

  render() {
    return html` <p>${this.displayError}</p> `;
  }
}

customElements.define("error-element", ErrorElement);
