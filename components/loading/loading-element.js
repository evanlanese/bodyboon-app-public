import { LitElement, html, css } from "lit";

export class LoadingElement extends LitElement {
  static properties = {
    color: { type: String },
    background: { type: String },
    border: { type: String },
  };

  constructor() {
    super();
    this.color = "rgb(14, 14, 14)";
    this.background = "transparent";
    this.border = "rgb(14, 14, 14)";
  }

  static styles = css`
    * {
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    #loading-zone {
      display: flex;
      gap: 22px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50vh;
    }
    .spinner {
      border: 2px dashed;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    h1 {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 0.5px;
    }
  `;

  render() {
    return html`
      <div id="loading-zone" style="background-color: ${this.background};">
        <div class="spinner" style="border-color: ${this.border};"></div>
        <h1 style="color: ${this.color};">LOADING BODYBOON</h1>
      </div>
    `;
  }
}

customElements.define("loading-element", LoadingElement);
