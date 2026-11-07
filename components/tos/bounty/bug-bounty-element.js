import { LitElement, html, css } from "lit";

export class BugBountyElement extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      line-height: 22px;
    }
    a {
      text-decoration-color: rgb(14, 14, 14);
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-thickness: auto;
      width: auto;
      height: auto;
      word-break: break-all;
    }
    hr {
      margin-top: 40px;
    }
    div {
      padding: 40px 20px;
      margin: auto;
    }
    p {
      padding: 20px 0;
    }
    ul {
      padding-left: 40px;
    }
    li {
      line-height: 22px;
    }
  `;

  render() {
    return html`
      <hr/>

      <div>
        <h4>Bug Bounty and Security Reporting Terms</h4>

        <p>Dated: March 19, 2024</p>

        <p>Bodyboon is committed to keeping our service and our users secure, and we appreciate the insights of independent security researchers that make our products safer. If you become aware of any security issues (aka bugs) in the Bodyboon web-based service or iPhone or Android apps, you can bring them to our attention at [security email].</p>
        
        <h4>Keeping Data Safe</h4>

        <p>The privacy of our customers’ data is our priority. You may test security issues against your own user account or unique test accounts that you create, but accessing other users’ accounts or data is strictly prohibited. Your research activity must not harm other users. Never exfiltrate or change data on our systems. If you accidentally encounter user data, please inform us immediately. Do not conduct testing that affects the general availability of Bodyboon, such as DDOS.</p>
        
        <h4>Safe Harbor</h4>

        <p>As long as you follow these terms, we will consider your research activity authorized and will not initiate legal action against you regarding that research activity under applicable anti-hacking laws.</p>
        
        <h4>Rewards</h4>

        <p>Bodyboon does not promise any reward in exchange for reports of security issues. In some circumstances, and at Bodyboon’s sole discretion, Bodyboon may decide to provide a reward to independent security researchers who provide us with a report of an issue that we can reproduce, that has an impact, and that leads to system improvements. We will not negotiate rewards under duress, and consider attempts to do so to be a violation of this policy.</p>

        <h4>Communication and Disclosure</h4>

        <p>We will make every effort to respond to security reports within a few days, but please be patient. If you would like to conduct a coordinated disclosure, please let us know so we can discuss. Public disclosure is not allowed until and unless Bodyboon has explicitly said so. Some security issues may not be eligible for disclosure, at our discretion.</p>
        
        <h4>Additional Terms</h4>

        <p>In limited circumstances, Bodyboon may require additional information or cooperation from you, including additional terms, in connection with processing bug reports and ensuring data protection. Please be prepared to provide additional information and cooperation when requested. All other terms of Bodyboon services apply unless explicitly addressed here. We reserve the right to change the terms of this program at any time and at Bodyboon’s sole discretion.</p>

        <h4>Out of Scope</h4>
        <p>The following areas/issues are considered out of scope and not eligible for a bounty.</p>
        <ul>
          <li>Login and logout CSRF.</li>
          <li>Rate limiting</li>
          <li>Email spoofing / SPF/DKIM/DMARC policies</li>
          <li>User enumeration</li>
          <li>Password Policies</li>
          <li>Missing HTTP security headers</li>
          <li>Clickjacking with no practical security impact</li>
          <li>DDOS of blog/wordpress</li>
        </ul>
      </div>
    `;
  }
}

customElements.define("bug-bounty-element", BugBountyElement);
