import { LitElement, html, css } from "lit";

export class GoogleTermsElement extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    * {
      color: rgb(110, 110, 110);
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.25px;
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      text-align: center;
    }
    div {
      margin: 44px 0;
    }
    a {
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
    }
  `;

  render() {
    return html`
      <div>
        <p>
          Secure Login with reCAPTCHA subject to Google <br />
          <a
            title="Google Terms of Service"
            aria-label="Visit Google Terms of Service."
            target="_blank"
            href="https://www.google.com/intl/en/policies/terms"
            rel="noreferrer"
            >Terms</a
          >
          &
          <a
            title="Google Privacy Policy"
            aria-label="Visit Google Privacy Policy."
            target="_blank"
            href="https://www.google.com/intl/en/policies/privacy"
            rel="noreferrer"
            >Privacy</a
          >
        </p>
      </div>
    `;
  }
}

customElements.define("google-terms-element", GoogleTermsElement);
