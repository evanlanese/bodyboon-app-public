import { LitElement, html, css } from "lit";

export class PrivacyElement extends LitElement {
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
    .div-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 50px repeat(8, 1fr);
    }
    ul {
      padding-left: 20px;
    }
    li {
      line-height: 22px;
    }
  `;

  render() {
    return html`
      <hr/>

      <div>
        <h4>PRIVACY POLICY</h4>

        <p>Last Revised: August 14, 2023</p>

        <p>This privacy notice (the “Privacy Notice”) together with the 
        <a
          href="/terms"
          title="Bodyboon Terms of Service."
          aria-label="Navigate to the terms of service."
          target="_blank"
        >Terms of Use</a> constitutes an agreement between you and Bodyboon LLC. and its affiliates (collectively “Bodyboon”, “us”, “our,” or “we”) while accessing and using our website located at [website domain], other websites we own or operate, and/or Bodyboon’s mobile applications (collectively, the “Site”). This Privacy Notice describes how Bodyboon collects, protects, uses, and discloses information and data collected and created in the course of your access to and use of the Bodyboon website, products, and services, as well as your interactions with Bodyboon via telephone, electronic or other means (collectively, and together with the Site, the “Services”), and is governed by our Terms of Use.</p>

        <p>Your privacy is important, and we encourage you to read this Privacy Notice carefully to understand the information we collect and what we do with it.</p>

        <p><b>Consent.</b> By accessing the Site, registering with Bodyboon, creating a user profile on our Site, or submitting information to Bodyboon, you consent to this Privacy Notice and the collection and use of information as described below. We will take steps to notify you and confirm that you agree at different stages of collecting information. If you do not agree with our policies and practices, you may not be able to access or benefit from certain portions of the Site.</p>

        <p><b>Scope.</b> Please be advised that this Privacy Notice applies to information that we collect when you visit the Site or use our Services, when you submit your information to us on the Site or our Services, when you communicate with us through email and other means, via third parties that we work with to provide our Services, or by any other means over the course of your use of our Services.<p>

        <p>For purposes of this Privacy Notice:</p>

        <p><b>“HIPAA”</b> means the United States Health Insurance Portability and Accountability Act of 1996.</p>

        <p><b>“PHI”</b> means individually identifiable health information, held or maintained by a Covered Entity or its Business Associates acting for the Covered Entity that is transmitted or maintained in any form or medium (including the PHI of non-U.S. citizens).</p>

        <p><b>“Business Associate”</b> means a person or entity that performs certain functions or activities that involve the use or disclosure of PHI on behalf of, or provides services to, a HIPAA Covered Entity.</p>

        <p><b>“Covered Entity”</b> means (1) health plans, (2) health care clearinghouses, and (3) health care providers who electronically transmit any health information in connection with transactions to which HIPAA applies.</p>

        <p><b>“Content”</b> means any expression fixed in a tangible medium and includes, without limitation, ideas, text, comments, video, audio, graphics, designs, drawings, animations, logos, trademarks, copyrights, information, data, software, scripts, executable files, recipes, workouts, likes, activities, maps, routes, nutritional information and data, and any intellectual property therein, any of which may be created, submitted, or otherwise made accessible on or through the Site and/or Services.</p>

        <p><b>Personal</b> Information. As used in this Privacy Notice, “Personal Information” means information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular individual consumer or device, such as:</p>

        <ul>
          <li>Identifiers (e.g., name, address, telephone number, email address, username);</li>
          <li>Sensitive Personal Information (e.g. state identification number, financial information);</li>
          <li>Protected classification information (e.g. age, citizenship, sex, veteran or military status);</li>
          <li>Biometric information (e.g. keystrokes, behavioral or biological characteristics);</li>
          <li>Internet or other similar activity (e.g. browsing history);</li>
          <li>Employment-related information (e.g. current or past employment); and</li>
          <li>Non-public educational information, including information protected under the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99).</li>
          <li>Commercial information (e.g. products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies).</li>
        </ul>
        <p><b>Non Personal Information.</b> As used in this Privacy Notice, “Non-Personal Information” means information that does not identify you and cannot be used to contact you personally and may include: (a) certain publicly available information; (b) aggregate information, meaning data about a group or category of services or users from which individual identities and other Personal Information has been removed; (c) de identified information that cannot be easily linked back to the individual; or (d) and in full compliance with HIPAA and Privacy laws, and on an aggregated and anonymous basis, your diary entries, health data, recipes, targets and profile. Under certain circumstances, Personal Information and/or Non-Personal Information may constitute PHI. If HIPAA applies to such Personal Information and/or Non-Personal Information, we will take appropriate steps to comply with HIPAA’s privacy and security rule requirement. For example, if we are a Business Associate of a Covered Entity, and if specific Personal Information and/or Non-Personal Information that we use or disclose as such a Business Associate is PHI, we will take appropriate steps to comply with HIPAA’s privacy and security rule requirement with respect to any such use and disclosure.</p>

        <p><b>Lawful Basis.</b> We will only collect your Personal Information (a) when applicable, with your consent; or (b) as authorized or required by law. We will limit the collection of Personal Information to that which is reasonable. If we collect or use your Personal Information based on your consent, we will also notify you of any changes and will request your further consent as needed.</p>

        <p><b>HOW WE COLLECT & USE YOUR PERSONAL INFORMATION</b> The Personal Information we collect about you and how we use the Personal Information we collect depends on the context of your interactions with Bodyboon, the Site, and our Services.</p>

        <p><b>Information we collect directly from you, with your consent.</b> We collect Personal Information directly from you with your consent when you leave a comment or use other interactive features on the Site or communicate with us online or by other means. If you leave a comment on the Site, we collect your email address and IP address to confirm that the comment originated from a Site user and not from a bot or other automated spam generator. If you access or submit an inquiry through our Site, subscribe to a service, register to receive marketing materials, participate in contests, sweepstakes or promotions, or receive other Services, we may ask you to provide certain personal information such as your name, email address, phone number and zip code, and possibly other Personal Information. We take reasonable steps to make sure that your contact information is accurate, complete, current, and otherwise reliable.We use your Personal Information to communicate with you about Bodyboon and our Services and for direct marketing purposes, such as:</p>
        <ul>
          <li>Sending you periodic email and newsletter communications;</li>
          <li>Responding to your inquiries;</li>
          <li>Sending you surveys and other quality assurance communications;</li>
          <li>Analyzing preferences, trends, and statistics;</li>
          <li>Informing you of our new products, services, and offers; and</li>
          <li>Providing you with other marketing information from and about Bodyboon.</li>
        </ul>
        <p>We will only contact you in ways compatible with your communications choices. However, even if you have opted-out of receiving marketing communications from us, we may need to contact you to address questions or issues specific to the services you have requested.</p>

        <p>We may periodically supplement the Personal Information we collect from you with personal or non-personal information about you or another person obtained from companies with whom we have marketing or other business relationships and other third party sources. Any aggregate information that is linked or linkable to your Personal Information will be treated as Personal Information under this Privacy Notice.</p>

        <p>Currently, Bodyboon or our third party service providers retain and store information collected by, or provided to, us in the cloud and on secure, HIPAA compliant servers in the United States. As Bodyboon and some of our third party service providers may retain and store information received from users (including Personal Information) outside of the United States, and under the laws of those other jurisdictions, in certain circumstances courts, law enforcement agencies, regulatory agencies or security authorities in those other provinces or foreign jurisdictions may be entitled to access users’ information.</p>

        <p><b>Payment Information.</b> Bodyboon does not collect or maintain any payment information. If you choose to subscribe to our Site and/or Services, our current payment processor, will collect your financial information to facilitate the transaction. We partner with third party service providers and vendors to provide access to existing payment gateways and your credit card, banking and other billing information will be stored only with our payment processor, not with Bodyboon. You will be given information regarding our current payment processor, including access to their privacy policy and terms, when you authorize a transaction through the Site.</p>

        <p><b>Information collected from your use of the Site, with a legitimate interest.</b> We use analytics tools or other technologies to collect information about you from your use of this Site. We collect this information to achieve our legitimate interests of operating the Site and our Service, as well as marketing our Services to a broader audience. This information may be combined with other information that you choose to submit to us. This information may also be merged into aggregate information about site visitors and traffic. We use third-party analytics tools to distinguish and analyze user behavior.</p>

        <p><i>Log Files.</i> We collect anonymous and technical information from your computer, including your internet protocol address, data about your computer or other device, the type of browser or operating system your device uses, the programs, services, and version of software you use, and the address of any linking site, when you request a web page while visiting the Site. We use this information for statistical purposes, to ensure that our web pages will appear and function appropriately on your computer, to determine how you were referred to our Site, and to personalize your access to our Site or conduct our own analyses and research to improve our programs, products, services, and content. We may sell, rent, or otherwise convey this anonymous, technical information to a third party, but this information will never constitute Personal Information. We also use third parties to collect and analyze information. If you do not agree with Bodyboon or our Services Providers (as defined below) collecting and using your anonymous and technical information as described in this paragraph, discontinue use of the Site or you may contact us as described under “Controlling Your Personal Information.”</p>

        <p><i>Cookies.</i> Like most commercial websites, we use cookies to track use of our Site. Cookies are small text files that are stored on your computer or equipment when you visit certain online pages that record your preferences. Bodyboon and our Service Providers use cookies to track use of our Site and online services. Cookies may also be used to monitor traffic, improve the Site, make the Site easier and/or more relevant for your use, and improve the performance of our advertising. You can make personalized choices regarding the cookies employed within the Site in the Settings section. However, certain features of our Sites or other Services may not work if you delete or disable cookies. For more information on cookies and how to disable them on your computer please visit: 
          <a 
            href="https://www.consumer.ftc.gov/articles/0042-online-tracking"
            title="Consumer Ftc."
            aria-label="Navigate to the consumer ftc."
            target="_blank"
            router-ignore
          >
            https://www.consumer.ftc.gov/articles/0042-online-tracking.
          </a></p>

        <p>Generally-speaking, we use 1st and 3rd-party sessions and persistent cookies. The cookies set by us are called “1st-party cookies” and the cookies set by our Service Providers are called “3rd-party cookies.” Session cookies are temporary cookies that remain on your device until you close your web browser. Many session cookies are essential to make our Site work correctly, as they typically enable you to move around our Site and use our features. Persistent cookies remain on your device after you close your browser or until you manually delete it (for the former, the amount of time the cookie remains on your device will depend on the duration or “lifetime” of the specific cookie and your browser settings). Persistent cookies help us recognize you as an existing user of our Site, so it’s easier and convenient to return to our Site or interact with our Services without signing in again. In addition, persistent cookies also help us recognize you when you view a resource belonging to our Site from another website or app (such as an advertisement) and help us record information about your web browsing habits during the lifetime of the persistent cookie.</p>

        <p>Examples of cookies we use:</p>
        <ul>
          <li>Strictly Necessary Cookies: these cookies are strictly necessary for our Site to function properly and ensure our Services are accessible to you (e.g., log-in functionality, load balancing, navigation, filling in forms). The Site cannot function properly without these cookies.</li>
          <li>Preference Cookies: enable our Site to provide enhanced features or settings based on your previous visits and selections, such as language preferences, remembering log-in details, remember searches and filter settings, and other conveniences.</li>
          <li>Statistic Cookies: Statistic cookies enable us to understand how visitors interact with our Site by collecting and reporting information anonymously.</li>
          <li>Social Media Cookies: These cookies are used to allow you to share or like our pages and content through third-party social media websites.</li>
          <li>Marketing Cookies: Marketing cookies are used to track visitors across our Site. The intention is to display ads that are relevant and engaging for the individual user.</li>
        </ul>
        <p><b>Information we collect indirectly from you, with your consent.</b> We collect Personal Information from other sources with your consent, such as health applications on your device.  For example, in such cases, we adhere to the following:In addition to the specific uses and purposes described above, we might use information that we collect about you or that you provide to us, including any Personal Information:</p>
        <ul>
          <li>Health Connect – Limited Use Disclosure: If you give Bodyboon permission to access data from your Health Connect application, we will use that information in accordance with this Privacy Notice, to provide you with the Services, and in compliance with the 
            <a 
              href="https://support.google.com/googleplay/android-developer/answer/9888170#ahp"
              target="_blank"
              router-ignore
            >Health Connect Permissions policy</a>, including the Limited Use requirements.</li>
          <li>Apple Health – HealthKit Limited Use:  If you give Bodyboon permission to access data from your Apple Health application, we will use that information in accordance with this Privacy Notice, to provide you with the Services, and in compliance with the Apple HealthKit guidelines.</li>
        </ul>
        <p>Bodyboon uses Personal Information collected from you to automatically perform data analysis, identify Site and Services usage trends, develop and display content and advertising tailored to your interests or location, and to measure the effectiveness of our marketing efforts and our Services. Bodyboon may use and store this information and the reports we generate using this information in an anonymized form or in the aggregate that it is not associated with individual end users and does not include personal information.</p>

        <p><b>Other ways we might use your Personal Information.</b> In addition to the specific uses and purposes described above, we might use information that we collect about you or that you provide to us, including any Personal Information:</p>
        <ul>
          <li>To present our Site and its contents to you.</li>
          <li>To provide you with information, products, or services that you request from us or that we deem relevant to you.</li>
          <li>To allow you to participate in interactive features on our Site or to notify you about changes to our Site or any products or services we offer or provide through it.</li>
          <li>To provide you with other information about a business or organization with which we are associated.</li>
          <li>To protect your privacy and enforce this Privacy Notice.</li>
          <li>If we believe it is necessary to identify, contact or bring legal action against persons or entities who may be causing injury to you, to Bodyboon, or to others.</li>
          <li>To comply with applicable law, regulation, legal process or court order.</li>
        </ul>
        <p><b>Children Under Age 16.</b> Bodyboon products and services are designed to benefit both adults and children. However, any Personal Information submitted pertaining to children under the age of 16 must be explicitly consented to by that child’s parent or legal guardian. As such, this Site may not be used, and no Personal Information should be submitted from children under 16 years of age without such consent. If you are under 16, do not use or provide any information on this Site or on or through any of its features, make any purchases through the Site, use any of the interactive or public comment features of the Site or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or user name you may use. If we learn we have collected or received Personal Information from a child under 16 without verification of parental or legal guardian consent, we will delete that information. If you believe we might have any information from or about a child under 16 without appropriate consent from a legal guardian, please contact us at [privacy email].</p>

        <p><b>A SPECIAL NOTE ABOUT YOUR HEALTH INFORMATION</b></p>

        <p>We are committed to protecting your privacy and we recognize the sensitivity of your health information.  We will manage your PHI in accordance with applicable health information privacy legislation, such as HIPAA.</p>

         <p>We do not sell PHI, or provide it to third parties without your consent.</p>

         <p>In some cases, healthcare providers may be using our Services to collect, use and disclose personal information about you, their patient.  As applicable, those healthcare providers are the custodians of that personal health information.  If you would like to know more about how your healthcare provider handles your personal information, you should ask them about their policies and practices.</p>
        
        <p><b>DISCLOSURE OF YOUR INFORMATION</b></p>

        <p>As permitted by applicable law, we may share your Personal Information as follows:</p>
        <ul>
          <li><b>To Our Service Providers.</b> Vendors that provide us with various services (collectively, “Service Providers”) may have access to your Personal Information while they are performing their contractual obligations. Examples of Service Providers we use include payment processors, data analytics companies, email delivery, web hosting services, customer service, and marketing services. We prohibit our Service Providers from selling or disclosing the Personal Information we provide, and we require all Service Providers to maintain confidentiality standards that are commercially reasonable to ensure the security of your Personal Information. These Service Providers include but are not limited to marketing companies, companies that host our Site or App, or provide IT services to support either, platforms we use to help us manage our data and companies that assist us in processing job applications that you submit through our Site. The type of information that we provide to a Service Provider will depend on the purpose of the service that they provide to us.</li>
          <li><b>To Our Advertisers.</b> For users accessing our free Services, we disclose certain limited information to Service Providers that are network advertisers, sponsors, and/or traffic measurement services (collectively, “Advertisers'') to enable those Advertisers to serve targeted advertisements to you on the Site, the App or other Sites or media (e.g., social networking platforms). We allow some Advertisers to assist us with behavioral advertising by collecting and analyzing certain information when you visit our Site (e.g., clickstream information, browser type, time and date, subject clicked or scrolled over). These Advertisers typically use a cookie or other technologies to personalize advertising content and measure the effectiveness of their ads. We do not provide personal health information, or PHI, to Advertisers. Additionally, for users paying for our Services, we may from time to time send you offers from Advertisers, but generally speaking you will not be subject to the targeted advertisements mentioned above.</li>
          <li><b>Other Third Parties.</b> As permitted by applicable law, we may disclose Personal Information to third parties (i) as part of a business transition (e.g. a merger or acquisition by another company); (ii) to comply with federal, state, or local law, a judicial proceeding, court order, or other legal process, or if we have a good faith belief that disclosure is necessary to comply with a civil, criminal, or regulatory inquiry, investigation, subpoena, or summons by federal, state, or local authorities; (iii) if we believe it is appropriate in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Use or this Privacy Notice, or to exercise or defend our legal claims; or (iv) in any case where we have obtained your prior consent.</li>
          <li><b>For Legal and Other Compliance.</b> We may disclose Personal Information when we believe it is appropriate to: (a) comply with the law, (b) enforce or apply this Privacy Notice or our other policies or agreements, (b) protect our or our users' rights, property or safety, (c) protect our users from fraudulent, abusive or unlawful use of, our Site, or (d) if we reasonably believe that an emergency involving immediate danger of death or serious physical injury to any person requires disclosure of communications or justifies disclosure of records without delay.</li>
          <li><b>As Part of Business Transfers.</b> We may disclose Personal Information as part of any merger, acquisition, debt financing, sale of company assets or other business transaction. In this situation, we will ensure that standard confidentiality and data security measures are agreed to by all parties with access to Personal Information.</li>
          <li><b>As Aggregated or Deidentified Information.</b> We reserve the right to share or sell aggregated, anonymous or deidentified information about any individuals with non-affiliated entities for marketing, advertising, research or other purposes, without restriction. We do not limit the third parties’ use of the aggregated information.</li>
          <li><b>As PHI Information.</b> If information constitutes PHI, We will only use or share PHI in compliance with the privacy and data security requirements of the applicable health information privacy laws, such as HIPAA, and in conformity with the terms and conditions of any applicable Business Associate Agreement.</li>
        </ul>
        
        <h4>SECURITY</h4>

        <p><b>Data Security.</b> It is Bodyboon’s policy to treat your Personal Information with complete confidentiality. We minimize the Personal Information we store and employ commercially appropriate and reasonable safeguards both online and offline to maintain the security, confidentiality, and integrity of information that we collect about you. We maintain physical, electronic and procedural security measures to safeguard your nonpublic personal information. We update and test our technology to improve the protection of our information about you and to assure the integrity of that information.</p>

        <p>We educate our employees about the importance of confidentiality and customer privacy through standard operating procedures and special training programs.</p>

        <p>In many instances we employ state-of-the-art, and in any event commercially reasonable, measures to protect your Personal Information, such as two-factor authentication, penetration testing, the implementation of privacy-by-design and thorough vetting of our hosting services providers. However, please note, however, that no transmission of data over the internet is 100% secure and we cannot guarantee that unauthorized third parties will not defeat those measures and use nonpublic Personal Information for improper purposes. Therefore, we are not responsible for circumvention of any privacy settings or security measures contained on the Site or for actions of third parties. The safety and security of your information also depends on you, and you are responsible for keeping your password confidential. Also, always remember to log off your account and close your browser window when you have finished your visit. This is to ensure that others cannot access your account, especially if you are sharing a computer with someone else or are using a computer in a public place. Please refer to the Federal Trade Commission's website at 
          <a
            href="http://www.ftc.gov/bcp/menus/consumer/data.shtm"
            title="Ftc consumer data"
            aria-label="Ftc consumer data"
            target="_blank"
          >http://www.ftc.gov/bcp/menus/consumer/data.shtm</a> for information about how to help protect yourself against identity theft.</p>

        <p><b>Public Forums.</b> If you choose to make use of any public forum, comment section or chat function, we may collect any information you may disclose through such means.</p>

        <p><b>In-Media Communications.</b> If you choose to send a message to another user or defined group of users through our message, chat, post or other function, we may collect any information you may disclose through such means, as well as the necessary Personal Information of the user(s) you are contacting, in order to facilitate the communication.</p>

        <p><b>Third Party Sites.</b> This Privacy Notice applies only to information collected by Bodyboon. We may provide links to third party websites from our Sites as a service to our users, but we have no ability to control, and we are not responsible for, the privacy and data collection, use, and disclosure practices of third party websites. When you click on links that take you to external websites, you will be subject to their privacy policies and practices and not ours. We encourage you to review and understand the privacy policies of such websites before providing them with any information.</p>

        <p><b>Photos and Videos.</b> If you post a video, image or photo on our Site for public view you should be aware that these may be viewed, collected, copied and/or used by other users without your knowledge or consent. We are not responsible for the videos, or photos that you choose to submit to the public sections of our Site. For clarity, there are also private sections of the Site where you can submit content that will not be viewable by other users. Please see our Terms of Service on this point and for other guidelines about posting content on any portion of our Site.</p>

        <p><b>Updates and Push Notifications.</b> We may occasionally send you updates, patches and related push notifications that may be of importance to you. If you do not wish to receive updates, patches and notifications you should discontinue use of our Site and/or Services or disconnect your computer or device from the Internet. If you do not wish to receive push notifications, do not select the "Send me newsletters and promotional emails" box under your Account Information in your Bodyboon Profile. If you choose to enable push notifications, we may use your information such as a device ID or email address in order to send push notifications to your device.</p>

        <p><b>Do Not Track Signals.</b> Do Not Track is a privacy preference that users can set in their web browsers. When a user turns on the Do Not Track signal, the browser sends a message to websites requesting them not to track the user. For information about Do Not Track, visit www.allaboutdnt.org. At this time, Bodyboon does not respond to Do Not Track browser settings or signals. In addition, Bodyboon may use other technology that is standard to the internet to track visitors to the Site. Those tools may be used by us and by third parties to collect information about you and your internet activity, even if you have turned on the Do Not Track signal.</p>

        <p><b>Unauthorized Use.</b> If you become aware of any unauthorized submission of information to Bodyboon, including children’s information, please inform us by contacting us at the contact information listed below so that we may delete it.</p>

        <h4>CONTROLLING YOUR PERSONAL INFORMATION</h4>

        <p>Bodyboon provides you the ability to exercise certain controls and choices regarding our collection, use and sharing of your information. Depending on where you reside, your options to control your Personal Information may include some or all of the following:</p>
        <ul>
          <li>Changing the Services for which you are signed up.</li>
          <li>Changing your preferences for how and about what we communicate with you.</li>
          <li>Correcting, updating, and deleting the Personal Information in your account. Please note that certain legal obligations may limit or prevent our ability to fulfill these requests, and that copies of information that you have updated, modified or deleted may remain viewable in cached and archived pages of the Site, Portal, or App for a period of time.</li>
          <li>Requesting access to the Personal Information we hold about you and that we amend or delete it.</li>
          <li>Choosing whether to receive marketing communications from us, including promotions, surveys, and information about products and services that may be of interest to you.</li>
          <li>Control how the cookies we use interact with your browser.</li>
        </ul>
        <p>At any time, you may exercise any of these controls and choices, express concerns, lodge a complaint, or obtain additional information about the use of your Personal Information by contacting us at [privacy email].</p>

        <p><b>Opting Out of Communications.</b> We will only communicate with you if you want to hear from us, or if it is necessitated by the Services you receive from us (i.e. transactional, payment or invoicing related messages). You can modify or limit the communications we send to you by clicking the “unsubscribe” link at the bottom of any of our emails, or by visiting the “Settings” section of the Site where you can make specific choices regarding your communication preferences. You may also contact us directly by email at [privacy email]. Please be sure to include your full name, email address and specifically what information you do not want to receive.</p>

        <h4>CALIFORNIA PRIVACY RIGHTS</h4>

        <p>Bodyboon adopted this section to comply with the California Consumer Privacy Act of 2018 (“CCPA”) and applies solely to residents of the State of California (“California Consumers”). Without limiting the foregoing, this section provides California Consumers with the disclosures and notices required under the CCPA. Certain exceptions and limitations may apply to a California Consumer’s rights and Bodyboon’s obligations under the CCPA.</p>

        <p><b>Personal Information Collected.</b> Bodyboon has collected the following categories of Personal Information from California Consumers within the last twelve (12) months:</p>
        <ul>
          <li>Identifiers (e.g. real name, alias, online identifier, IP address, email address, or other similar identifiers).</li>
          <li>Personal Information Categories Listed in the California Customer Records Statute (Cal. Civ. Code § 1798.80(e)). Some Personal Information included in this category may overlap with other categories.</li>
          <li>Internet or Similar Network Activity (e.g. browsing history within the Site, search history within the Site, interactions with the Site, Application, or our advertisement).</li>
          <li>Geolocation Data (e.g. physical location or movements).</li>
        </ul>

        <p><b>Sources for the Personal Information We Collect.</b> We collect the Personal Information described above from the following sources:</p>
        <ul>
          <li>directly from you when you leave a comment or use other interactive features on the Site or communicate with us, fill out a form, or submit an inquiry, use our Services, interact with us through the Site, or apply for employment with Bodyboon.</li>
          <li>indirectly from you as information we collect automatically from your use of the Site.</li>
          <li>third parties, as described in more detail below.</li>
        </ul>

        <p><b>Use of Personal Information.</b> Depending on your interactions with Bodyboon, we may use or disclose the Personal Information we collect about you for one or more of the following business purposes:</p>
        <ul>
          <li>to provide you with our services, which includes, but is not limited to, communicating with you, maintaining accurate records, and personalizing your experience with the Services.</li>
          <li>to improve our Services by analyzing how Site visitors access and use our Services, both on an aggregated and individualized basis.</li>
          <li>for our direct marketing efforts, such as sending you news, newsletters, email marketing material, targeted advertising, and, if you have provided us with prior express written consent to receive marketing messages via telephone, text messages or calls.</li>
          <li>for other purposes as permitted by law, such as complying with a law, regulation, legal process or court order, or fulfilling any other purpose with your consent.</li>
        </ul>

        <p>We will not collect additional categories of Personal Information or use the Personal Information we collect for materially different, unrelated, or incompatible purposes without notifying you.</p>

        <p><b>Disclosing Personal Information.</b> Bodyboon may disclose Personal Information for a business purpose to the following categories of third parties:</p>
        <ul>
          <li>law enforcement, regulatory and other governmental agencies.</li>
          <li>business partners.</li>
          <li>parent entities, affiliates and subsidiaries.</li>
          <li>cookie information recipients, subject to their respective privacy notices.</li>
        </ul>

        <p>In the preceding twelve (12) months, Bodyboon has disclosed the following categories of Personal Information for a business purpose:</p>
        <ul>
          <li>identifiers.</li>
          <li>California Customer Records Personal Information categories.</li>
          <li>internet or other similar network activity.</li>
          <li>geolocation data.</li>
        </ul>

        <p><b>No Sale of Personal Information.</b> Bodyboon has not sold any Personal Information in the preceding twelve (12) months.</p>

        <p><b>Your Rights and Choices.</b> The CCPA provides California Consumers with specific rights regarding their Personal Information. The following paragraphs describe CCPA rights and explain how to exercise those rights. Each of these rights is subject to our receipt of a verifiable consumer request (see below).</p>

        <p><b>Right to Disclosure.</b> You have the right to request that we disclose certain information to you about our collection and use of your Personal Information over the past 12 months, such as:</p>
        <ul>
          <li>the categories of Personal Information we have collected about you.</li>
          <li>the categories of sources for the Personal Information we have collected about you.</li>
          <li>our business or commercial purpose for collecting or selling that Personal Information.</li>
          <li>the categories of third parties with whom we share that Personal Information.</li>
          <li>if we sold or disclosed your Personal Information for a business purpose, two separate lists disclosing (i) sales, identifying the Personal Information categories that each category of recipient purchased; and (ii) disclosures for a business purpose, identifying the Personal Information categories that each category of recipient obtained.</li>
        </ul>

        <p>Bodyboon is only required to respond to two disclosure requests within a 12-month period.</p>

        <p><b>Right to Access.</b> You have the right to request that we provide you with access to specific pieces of Personal Information we have collected about you over the past 12 months (also called a data portability request). If you submit a right to access request, we will provide you with copies of the requested pieces of Personal Information in a portable and readily usable format. Please note that Bodyboon is prohibited by law from disclosing copies of certain pieces of Personal Information (e.g., government identification numbers, financial account information, and passwords or security questions and answers) because the disclosure would create a substantial, articulable, and unreasonable risk to the security of the information, our business systems, or your account. Bodyboon is only required by law to respond to two access requests within a 12-month period.</p>

        <p><b>Right to Deletion.</b> You have the right to request that we delete any of your Personal Information that we collected from you and retained, with certain exceptions. Bodyboon may permanently delete, deidentify, or aggregate the Personal Information in response to a request for deletion. If you submit a right to deletion request, we will confirm the Personal Information to be deleted prior to its deletion, and we will notify you when your request is complete.</p>

        <p><b>Submit a Consumer Privacy Request.</b> To exercise any of the above rights, please submit a verifiable consumer privacy request to Bodyboon by email at [privacy email].</p>

        <p><b>Verification.</b> We cannot respond to your request or provide you with Personal Information unless we can verify your identity and your authority to make the request and confirm that the Personal Information relates to you. A verifiable consumer privacy request must:</p>
        <p>You do not have to sign up with Bodyboon to make a verifiable consumer privacy request. We will only use Personal Information provided in a verifiable consumer privacy request to verify the requestor’s identity or authority to make the request.</p>

        <p><b>Authorized Agent.</b> You may make a verifiable consumer request on behalf of your minor child. Otherwise, only you, or a person you have designated in writing as your authorized agent or who is registered with the California Secretary of State to act on your behalf, or to whom you have provided power of attorney pursuant to California Probate Code sections 4000 to 4465 (“Authorized Agent”) may make a verifiable consumer request related to your Personal Information. If you wish to have an Authorized Agent make a verifiable consumer request on your behalf, they will need to provide us with sufficient written proof that you have designated them as your Authorized Agent, and we will still require you to provide sufficient information to allow us to reasonably verify that you are the person about whom we collected Personal Information.</p>

        <p><b>Bodyboon’s Response.</b> We endeavor to respond to a verifiable consumer request within 45 days of receipt. If we require more time, we will notify you in writing of the reason and extension period. We will deliver our written response by mail or electronically, at your option. Any disclosures we provide will only cover the 12-month period preceding receipt of the verifiable consumer request. If we cannot comply with part or all of your request, we will explain the reasons in our response.We do not charge a fee to process or respond to your verifiable consumer privacy request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.</p>

        <p><b>Nondiscrimination.</b> We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by law, we will not do any of the following as a result of your having exercised your right under the CCPA:</p>
        <ul>
          <li>provide sufficient information that allows us to reasonably verify you are the person about whom we have collected Personal Information or an authorized representative.</li>
          <li>describe your request with sufficient detail that allows us to properly understand, evaluate, and respond to it.
          <li>deny you goods or services.</li>
          <li>charge you different prices or rates for goods or services, including through granting discounts or other benefits or imposing penalties.</li>
          <li>provide you a different level or quality of goods or services.</li>
          <li>suggest that you may receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
        </ul>

        <p><b>Other California Privacy Rights.</b> California Civil Code sections 1798.83-1798.84 (the Shine the Light Act) entitles California residents to request disclosure regarding Personal Information sharing with affiliates and/or third parties for marketing purposes. If you are a California resident and you would like to request a copy of this notice, please contact us at [privacy email] with the subject line “Request for California Privacy Information.”</p>

        <p><b>Privacy Notice to Residents of the European Union, United Kingdom and Canada.</b> Bodyboon adopted this section to comply with the European Union’s General Data Protection Regulations (“GDPR”) and other jurisdictions with similar data protection laws. This section applies to Site visitors, users, and others who are residents of the European Union, United Kingdom and Canada. While GDPR is not generally applicable to Bodyboon’s Personal Information processing activities, we endeavor to uphold its principles for data subjects in the EU as well as those in other jurisdictions with similar rights. Without limiting the foregoing, to the extent that Bodyboon’s activities implicate the GDPR or other similar laws now or in the future, this section provides those individuals with information about our relevant privacy practices.</p>

        <p><b>Data Controller.</b> The data controllers of your Personal Information is Bodyboon, if you have engaged us directly. If Bodyboon has been engaged to provide services by your school or other primary contact, Bodyboon is a data processor for the primary contact.</p>

        <p><b>Lawful Basis under GDPR.</b> The lawful bases on which Bodyboon processes your Personal Information are: (a) when applicable, with your direct consent; (b) if we have a legitimate interest in doing so, such as fulfilling our obligations as a data processor to your School, administering our business, maintaining the quality of our Site and Software, providing customer service, or identifying new business opportunities; and (c) as authorized or required by law.</p>

        <p><b>Additional rights:</b> you have the following rights in relation to the Personal Information we hold about you.</p>

        <div class="div-grid">
          <p><b>YOUR RIGHT</b></p>
          <p><b>WHAT THIS MEANS FOR YOU</b></p>
          <p><b>WHAT YOU CAN DO</b></p>

          <p><b>To know how we process your Personal Information.</b></p>
          <p>We are required to provide notice about the way that we will use the Personal Information we collect.</p>
          <p>We have set the required notices in this Privacy Notice. We may provide you with additional notice about other ways we process your Personal Data, such as by sending you a notice via email or by other means of communication.</p>

          <p><b>To access your Personal Information.</b></p>
          <p>If you request it, we will provide you with access to your Personal Information, along with details about the types of Personal Information we process, why we process it, and any third parties we work with to collect Personal Information on our behalf.</p>
          <p>You can request to access your Personal Information (i.e. a copy of it). We may have one or more legally valid reasons to refuse your request in whole or in part, for example in order to protect the rights of other individuals.</p>

          <p><b>To restrict the processing of your Personal Information.</b></p>
          <p>In certain circumstances and to the extent required by law, we are required to restrict our processing of your Personal Information.</p>
          <p>You can request that we restrict the processing of your Personal Information if (i) the data is inaccurate, (ii) the processing is unlawful, (iii) we no longer need the Personal Information, or (iv) you exercise your right to object.</p>

          <p><b>To rectify your Personal Information.</b></p>
          <p>We are required to correct the Personal Information we have about you if you inform us that it is incorrect.</p>
          <p>If you become aware that the Personal Information that we hold about you is incorrect, or if your situation changes (for example you change address) please inform us and we will update our records.</p>

          <p><b>To data portability.</b></p>
          <p>In some circumstances, we are required to provide your Personal Information to another organization at your request and in a format that allows the other organization to read and use it.</p>
          <p>You have the right to request that we transfer your Personal Information to another organization (i.e. another data controller) in a structured, commonly used machine-readable format, so that the other organization can read and use it.</p>

          <p><b>To erase your Personal Information (a.k.a. the “right to be forgotten”).</b></p>
          <p>Upon your request, and in certain circumstances and where we are required to do so by law, we are required to delete your Personal Information. This right is not absolute, and we may be entitled to retain and process your Personal Information despite your request.</p>
          <p>If you make this request, we balance certain legal, contractual and business interests against your right to request the deletion of your Personal Information.</p>

          <p><b>To object to certain processing of your Personal Information.</b></p>
          <p>Upon your request, and in certain circumstances and where we are required to do so by law, we will limit our processing of your Personal Information as you request.</p>
          <p>You may object to the processing of your Personal Information in certain circumstances. If you make this request, we will consider certain legal, contractual and business interests and obligations against your right to object to the processing. You can also object to our use of your Personal Information for direct marketing purposes.</p>

          <p><b>To not be subject to a decision based solely on “automated processing.”</b></p>
          <p>We are required to keep records of automated processing that we carry out, if any, and, in certain circumstances, provide you with information about the way that the decisions are made, and respond to your objections to being subject to decisions made.</p>
          <p>We do not currently make decisions about individuals based solely on automated processing. If we engage in this activity in the future, you will have the right to object to a decision we make wholly by a computer or algorithm without human input and to receive information about this type of processing.</p>
        </div>

        <p>If you want to exercise any of these rights, please make a request to [privacy email].</p>

        <h4>TERMS</h4>

        <p><b>Terms of Use.</b> We encourage you to familiarize yourself with the Site Terms of Use (
          <a
            href="/terms"
            title="Bodyboon Terms of Service"
            aria-label="Navigate to the terms of service."
            target="_blank"
          >/terms</a>) which governs all matters not set forth in this Privacy Notice.</p>

        <p><b>Changes to this Privacy Notice.</b> We may occasionally make changes to this Privacy Notice to ensure its accuracy. If we make changes, the revised Privacy Notice will be posted online and the date of the newest version will be listed. Please check back frequently, especially before you provide us with personal information, to determine the current scope of the notice.</p>

        <p><b>Governing Law.</b> Those who choose to use or access the Site and/or Services from within the United States do so on their own initiative and are responsible for compliance with local laws, if and to the extent local laws are applicable. Notwithstanding the foregoing, and recognizing the global nature of the Internet, each viewer and user shall comply with all local rules regarding online conduct and submission of acceptable materials. This Privacy Policy is governed and interpreted pursuant to the laws of the United States, without regard to principles of conflicts of law that would impose the law of another jurisdiction, and you accept and submit to the exclusive jurisdiction of the courts located within the United States.</p>

        <p><b>International Transfer.</b> We may transfer information that we collect about you to affiliated entities, or to other third parties across borders and from your country or jurisdiction to other countries or jurisdictions around the world. Please note that these countries and jurisdictions may not have the same personal information protection laws as your own jurisdiction, and you consent to the transfer of information over international borders and the use and disclosure of information about you, including Personal Information, as described in this Privacy Policy.</p>

        <h4>CONTACT INFORMATION</h4>

        <p>If you have any further questions about our collection and use of your Personal Information, or if you wish to exercise any of your rights over your Personal Information or if you have any questions about this Privacy Notice, please contact us at [privacy email]</p>

        <p><b>Bodyboon LLC.</b></p>
        <p><b>Attention:</b><br/>
        Privacy Officer</p>
        
        <p><b>Address:</b><br/>
        PO Box</p>
        
        <p><b>Email:</b><br/>
        [privacy email]</p>
      </div>
    `;
  }
}

customElements.define("privacy-element", PrivacyElement);
