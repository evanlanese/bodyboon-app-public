import { LitElement, html, css } from "lit";
import { getAuth, signOut } from "firebase/auth";
import {
  startButtonLoadingAnimation,
  endButtonLoadingAnimation,
} from "../../app-functions/animations.js";

export class LogoutElement extends LitElement {
  constructor() {
    super();
  }

  async handleLogout(event) {
    event.preventDefault();
    const auth = getAuth();
    const element = this.shadowRoot.getElementById("btn-logout");
    const buttonText = "LOGOUT";
    const interval = startButtonLoadingAnimation(element, element);

    try {
      await signOut(auth);
    } catch (error) {
      console.info(`
        Error: LogoutElement signout failed, signout()
        ${error}
      `);
      endButtonLoadingAnimation(interval, element, element, buttonText);
      return;
    }

    console.info("Successfully signed out");
    endButtonLoadingAnimation(interval, element, element, buttonText);
  }

  static styles = css`
    * {
      font-weight: 500;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgb(14, 14, 14);
    }
    button {
      cursor: pointer;
      font-size: 12px;
      text-transform: uppercase;
      line-height: 22px;
      letter-spacing: 0.5px;
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
    button::first-letter {
      font-size: 14px;
    }
    button:hover {
      color: white;
      background-color: rgb(14, 14, 14);
    }
    button:focus {
      border: 1px solid rgb(14, 14, 14);
    }
  `;

  render() {
    return html`
      <button
        @click=${this.handleLogout}
        id="btn-logout"
        aria-label="Log out button"
      >
        Logout
      </button>
    `;
  }
}

customElements.define("logout-element", LogoutElement);
