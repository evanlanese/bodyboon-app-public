import { LitElement, html, css } from "lit";

export class LogoElement extends LitElement {
  static properties = {
    src: { type: String },
  };
  
  constructor() {
    super();
    this.src = "/img/bb-logo-512x512-white.svg";
  }

  static styles = css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    div {
      margin: auto;
    }
    a {
      display: flex;
      justify-content: center;
      align-content: center;
    }
    img {
      width: 42px;
      height: 42px;
    }
  `;

  render() {
    return html`
      <div>
        <a
          title="Bodyboon home page."
          aria-label="Navigate to the home page of Bodyboon."
          href="/"
          ><img src=${this.src} alt="The Bodyboon logo"
        /></a>
      </div>
    `;
  }
}

customElements.define("logo-element", LogoElement);
