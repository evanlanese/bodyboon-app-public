import { LitElement, html, css } from "lit";

export class TermsAndPrivacyElement extends LitElement {
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
      margin: 0;
      padding: 0;
    }
    div {
      margin-top: 22px;
      margin-bottom: 11px;
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
          By creating an account, you agree to our
          <a
            title="Bodyboon Terms of Service."
            aria-label="Navigate to the terms of service."
            target="_blank"
            href="/terms"
            >Terms of Service</a
          >
        </p>

        <p>
          and have read and understood the
          <a
            title="Bodyboon Privacy Policy."
            aria-label="Navigate to the privacy policy."
            target="_blank"
            href="/privacy"
            >Privacy Policy</a
          >
        </p>
      </div>
    `;
  }
}

customElements.define("terms-privacy-element", TermsAndPrivacyElement);
