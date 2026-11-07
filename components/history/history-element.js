import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { logContext } from "../../app-functions/context.js";
import { fetchUserLog } from "../../app-functions/fetch.js";

export class HistoryElement extends LitElement {
  static properties = {
    logConsumer: { type: Object },
    userLog: { type: Array },
  };

  constructor() {
    super();
    this.logConsumer = new ContextConsumer(this, {
      context: logContext,
      subscribe: true,
    });
    this.userLog = [];
  }

  willUpdate(changedProperties) {
    if (this.logConsumer.value) {
      this.userLog = [...this.logConsumer.value];
      const buttons = this.shadowRoot.querySelectorAll("button");
      buttons.forEach((button) => (button.disabled = false));
    }
  }

  async deleteLog(event) {
    const index = event.target.id;
    const userLog = this.userLog.toSpliced(index, 1);

    const buttons = this.shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = true));

    const options = {
      detail: {
        userLog: userLog,
      },
      bubbles: true,
      composed: true,
    };

    await this.updateComplete;
    this.dispatchEvent(new CustomEvent("delete-log", options));
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      word-break: break-word;
      color: rgb(238, 238, 238);
    }
    :host {
      display: grid;
      grid-template-columns: 0.5fr minmax(360px, 720px) 0.5fr;
      grid-template-rows: 1fr;
    }
    section {
      grid-column: 2 / 3;
      max-width: 540px;
      padding: 10px;
      margin: auto;
    }
    .div-history-container {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr
      grid-template-rows: 1fr;
    }
    .div-history-heading {
      grid-column: 2 / 3;
      display: grid;
      gap: 5px;
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr;
    }
    .div-flex-h2 {
      display: flex;
      gap: 11px;
      align-items: end;
    }
    .div-flex-h2 img {
      padding: 3px 0;
    }
    h2 {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    h2 span {
      font-size: 18px;
    }
    .p-history-heading {
      font-size: 14px;
      font-style: italic;
      opacity: 0.7;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .p-history-heading img {
      width: 16px;
      height: 16px;
      margin-bottom: -2px;
    }

    #div-today-logs {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin-top: 20px;
    }
    .p-no-results {
      font-style: italic;
      text-align: center;
      text-transform: uppercase;
      opacity: 0.5;
      padding: 20px 0;
    }
    .p-no-results span {
      font-size: 14px;
    }
    .div-recipe-log {
      display: grid;
      grid-template-columns: minmax(220px, 1fr) minmax(56px, 1fr) minmax(42px, 64px);
      grid-template-rows: 1fr;
      align-items: center;
      width: 100%;
      height: 64px;
      border: 1px solid;
      border-color: rgb(34, 40, 49);
      margin: auto;
    }
    .p-recipe-name {
      grid-column: 1 / 2;
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
    }
    .p-timestamp {
      grid-column: 2 / 3;
      font-size: 12px;
      text-align: center;
    }
    button {
      grid-column: 3 / 4;
      cursor: pointer;
      background-color: rgb(34, 40, 49);
      width: 100%;
      height: 100%;
      border: 3px solid;
      border-color: rgb(57, 62, 70);
      transition-duration: 300ms;
    }
    button:disabled {
      opacity: 0.5;
    }
    button:disabled:hover {
      background-color: rgb(34, 40, 49);
    }
    button:disabled:focus {
      background-color: rgb(34, 40, 49);
    }
    button:hover {
      color: rgb(0, 173, 181);
      font-weight: 700;
      background-color: rgb(57, 62, 70);
      border-color: transparent;
    }
    button:focus {
      background-color: rgb(57, 62, 70);
      border-color: rgb(0, 173, 181);
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-history-container">
          <div class="div-history-heading">
            <div class="div-flex-h2">
              <img src="../../img/history-light.svg" alt="Symbol of a clock" />
              <h2>T<span>odays</span> L<span>og</span> H<span>istory</span></h2>
            </div>
            <p class="p-history-heading">
              Any recipes from
              <img
                height="14"
                width="14"
                src="../../img/dining-light.svg"
                alt="Symbol of a fork and spoon"
              />
              that you logged today in
              <img
                height="14"
                width="14"
                src="../../img/conditions-light.svg"
                alt="Symbol of a person"
              />
              may be viewed & managed, here.
            </p>
          </div>
        </div>

        <div id="div-today-logs">
          ${!this.userLog.length
            ? html`
                <p class="p-no-results">
                  N<span>o log entered.</span> S<span>o much empty.</span>
                </p>
              `
            : this.userLog.map((recipe, index) => {
                return html`
                  <div class="div-recipe-log">
                    <p class="p-recipe-name">${recipe.name}</p>
                    <p class="p-timestamp">${recipe.timestamp}</p>
                    <button
                      id=${index}
                      type="button"
                      @click=${this.deleteLog}
                      aria-label="Button to delete selected log"
                    >
                      X
                    </button>
                  </div>
                `;
              })}
        </div>
      </section>
    `;
  }
}

customElements.define("history-element", HistoryElement);
