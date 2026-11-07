import { LitElement, html, css } from "lit";
import { LogoElement } from "../logo/logo-element.js";

export class NotFoundElement extends LitElement {
  static styles = css`
    * {
      font-size: 14px;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
    }
    header {
      padding: 33px;
    }
    main {
      height: 100%;
    }
    section {
      min-height: 100%;
      padding: 33px;
    }
    .flex-column {
      display: flex;
      flex-direction: column;
    }
    .center {
      max-width: 375px;
      padding: 66px 0;
      margin: auto;
    }
    a {
      font-size: 32px;
      font-weight: 500;
      color: rgb(14, 14, 14);
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: none;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
    }
    h1 {
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      line-height: 36px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      margin-bottom: 44px;
    }
    button {
      cursor: pointer;
      font-size: 14px;
      color: rgb(14, 14, 14);
      line-height: 22px;
      background-color: rgb(242, 242, 242);
      border-color: transparent;
      border-style: solid;
      border-width: 2px;
      width: 100%;
      min-height: 44px;
      padding: 0px 16px;
      margin: 10px auto auto auto;
      transition: 0.4s;
    }
    button:focus {
      border: 2px solid rgb(14, 14, 14);
      outline: none;
    }
    button:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <logo-element></logo-element>
      </header>

      <main>
        <section>
          <div class="center">
            <div>
              <h1>Error: 404</h1>

              <p>Sorry, we can't find that page.</p>

              <a
                title="The front page."
                aria-label="Navigate to the front page."
                href="/"
                ><button type="button">BODYBOON HOME</button></a
              >
            </div>
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define("not-found-element", NotFoundElement);