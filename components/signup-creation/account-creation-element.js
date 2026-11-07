import { LitElement, html, css } from "lit";
import { LogoElement } from "../logo/logo-element.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { displayErrorMessage } from "../../app-functions/error-handling.js";

export class AccountCreationElement extends LitElement {
  static properties = {
    _loadingDots: { type: String },
    _steps: { type: String },
    _stepDescription: { type: String },
    _hideErrorHTML: { type: Boolean },
    _userMessage: { type: String },
  };

  constructor() {
    super();
    this._loadingDots = "...";
    this._steps = "";
    this._stepDescription = "SETTING UP";
    this._hideErrorHTML = true;
    this._userMessage = "";
  }

  startPencilLoadingAnimation() {
    return setInterval(() => {
      this._loadingDots += ".";
      if (this._loadingDots.length > 4) {
        this._loadingDots = ".";
      }
    }, 700);
  }

  async connectedCallback() {
    super.connectedCallback();
    const auth = getAuth();
    let interval = this.startPencilLoadingAnimation();
    let displayMessage;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { accessToken } = user;
        let request;
        let response;
        let result;

        this._steps = "1 / 3";
        this._stepDescription = "ENCODING USER ACCOUNT";

        request = new Request("/signup/creation/document/user", {
          method: "POST",
          headers: {
            "Token-Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        try {
          response = await fetch(request);
          console.info("Fetch completed: /signup/creation/document/user");
        } catch (error) {
          console.info(`
            Error: AccountCreationElement failed to fetch: /signup/creation/document/user
            ${error}
          `);
          displayMessage = error.message;
          clearInterval(interval);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;
        }

        result = await response.json();

        if (result.message) {
          switch (result.message) {
            case "auth/invalid-access-token":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              clearInterval(interval);
              window.location.replace("/login");
              return;

            case "(500) Error: An unexpected error occurred":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              displayMessage = `An unexpected error occurred. ${result.error}`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(200) User document exists. Subscription is active":
              console.info(result.message);
              clearInterval(interval);
              window.location.replace("/");
              return;

            case "(200) User document exists. No customer id. Create customer account":
              console.info(result.message);
              clearInterval(interval);
              break;

            case "(400) User document exists & customer exists. Subscription is not active":
              console.info(result.message);
              clearInterval(interval);
              window.location.replace("/payment/checkout");
              return;

            case "(201) Successfully created new user document":
              console.log(result.message);
              /* document created */
              break;

            default:
              console.info(`
                Unknown Error: AccountCreationElement an unexpected error occurred. /signup/creation/document/user
              `);
              displayMessage =
                "Unknown Error: Please log back in and try again.";
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;
          }
        }

        this._steps = "2 / 3";
        this._stepDescription = "RUMMAGING CURRENT INVENTORY";

        request = new Request("/signup/creation/search/stripe", {
          method: "POST",
          headers: {
            "Token-Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        try {
          response = await fetch(request);
          console.info("Fetch completed: /signup/creation/search/stripe");
        } catch (error) {
          console.info(`
            Error: AccountCreationElement failed to fetch: /signup/creation/search/stripe 
            ${error}
          `);
          displayMessage = error.message;
          clearInterval(interval);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;
        }

        result = await response.json();

        if (result.message) {
          switch (result.message) {
            case "auth/invalid-access-token":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              clearInterval(interval);
              window.location.replace("/login");
              return;

            case "(500) Error: An unexpected error occurred":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              displayMessage = `An unexpected error occurred. ${result.error}`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(200) Search Completed. No customer found":
              console.info(result.message);
              clearInterval(interval);
              break;

            case "(500) Error: Failed to modify user document with payment customer uid":
              console.info("AccountCreationElement", result.message);
              displayMessage = `${result.message}. Please log back in and try again.`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(201) Customer account was found. Updated user document. Subscription status is not active":
              console.info(result.message);
              clearInterval(interval);
              window.location.replace("/payment/checkout");
              return;

            case "(500) Error: Failed to modify user document status to match payment subscription status":
              console.info("AccountCreationElement", result.message);
              displayMessage = `${result.message}. Please log back in and try again.`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(201) Customer account was found. Updated user document. Subscription status is active":
              console.info(result.message);
              clearInterval(interval);
              window.location.replace("/");
              return;

            default:
              console.info(`
                Unknown Error: AccountCreationElement an unexpected error occurred. /signup/creation/search/stripe
              `);
              displayMessage =
                "Unknown Error: Please log back in and try again.";
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;
          }
        }

        this._steps = "3 / 3";
        this._stepDescription = "FIRING UP ENGINES";

        request = new Request("/signup/creation/create/stripe", {
          method: "POST",
          headers: {
            "Token-Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        try {
          response = await fetch(request);
          console.info("Fetch completed: /signup/creation/create/stripe");
        } catch (error) {
          console.info(`
            Error: AccountCreationElement failed to fetch: /signup/creation/search/stripe 
            ${error}
          `);
          displayMessage = error.message;
          clearInterval(interval);
          this._hideErrorHTML = false;
          this._userMessage = displayErrorMessage(displayMessage);
          return;
        }

        result = await response.json();

        if (result.message) {
          switch (result.message) {
            case "auth/invalid-access-token":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              clearInterval(interval);
              window.location.replace("/login");
              return;

            case "(500) Error: An unexpected error occurred":
              console.info(
                `AccountCreationElement ${result.message}\n${result.code}\n${result.error}`,
              );
              displayMessage = `An unexpected error occurred. ${result.error}`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(500) Error: Failed to modify user document payment customer id":
              console.info("AccountCreationElement", result.message);
              displayMessage = `${result.message}. Please log back in and try again.`;
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;

            case "(201) Account creation completed & modified successfully":
              /* customer account created */
              console.log(result.message);
              clearInterval(interval);
              window.location.replace("/payment/checkout");
              break;

            default:
              console.info(`
                Unknown Error: AccountCreationElement an unexpected error occurred. /signup/creation/create/stripe
              `);
              displayMessage =
                "Unknown Error: Please log back in and try again.";
              clearInterval(interval);
              this._hideErrorHTML = false;
              this._userMessage = displayErrorMessage(displayMessage);
              return;
          }
        }
      } else {
        console.info("Error: Authorization expired. Log back in");
        clearInterval(interval);
        window.location.replace("/login");
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  static styles = css`
    * {
      color: rgb(14, 14, 14);
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      text-align: center;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    a {
      font-size: 18px;
      color: rgb(14, 14, 14);
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: none;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
      padding-top: 11px;
    }
    section {
      height: 100%;
      min-height: 100vh;
    }
    .div-container {
      min-height: 100%;
      padding: 22px;
    }
    .div-flex-column {
      display: flex;
      flex-direction: column;
    }
    .div-navigation-bar {
      padding-top: 66px;
    }
    .p-logo {
      margin-top: -4.2px;
    }
    .div-main {
      padding-bottom: 22px;
    }
    h1 {
      font-size: 32px;
      text-align: center;
      line-height: 36px;
      padding-bottom: 33px;
      margin: 11px 0px;
    }
    .div-flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #p-loading-dots {
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      padding-top: 5px;
    }
    .p-red p {
      color: rgb(206, 44, 48);
      line-height: 22px;
      padding: 4px;
      margin: 0;
    }
    .div-build-steps p {
      font-size: 14px;
      line-height: 24px;
    }
    #div-page-error {
      position: relative;
      max-width: 375px;
      padding: 16px 8px;
      margin: auto auto 44px auto;
    }
    .p-error-message {
      font-size: 16px;
      font-weight: 400;
      color: rgb(206, 44, 48);
      line-height: 22px;
      text-align: center;
      max-width: 375px;
      padding-top: 8px;
      padding-bottom: 16px;
      margin: 0;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-container div-flex-column">
          <div class="div-navigation-bar">
            <logo-element></logo-element>
          </div>

          <div class="div-main">
            <h1>Creating your account.</h1>

            <div class="p-red">
              <p>This may take a minute.</p>
            </div>
            <div class="div-flex">
              <p id="p-loading-dots">${this._loadingDots}</p>
              <p>✎</p>
            </div>
          </div>

          <div id="div-page-error" ?hidden=${this._hideErrorHTML}>
            <p class="p-error-message">${this._userMessage}</p>
            <a
              title="The log in page."
              aria-label="Navigate to the log in page."
              href="/login"
              >⤾ LOG IN</a
            >
          </div>

          <div ?hidden=${!this._hideErrorHTML}>
            <p>${this._steps}</p>
            <p>${this._stepDescription}</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("account-creation-element", AccountCreationElement);
