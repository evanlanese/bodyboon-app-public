# Bodyboon

Bodyboon was a full-stack SaaS platform for food analysis and personalized nutrition tracking. It went live in early 2024 and hosted a small customer base until the project was sunset in late 2024.

## About the project

Evan Lanese was Bodyboon's sole founder and engineer. Bootstrapped and built from the ground up, the product was Evan’s end to end: system architecture, UI/UX, backend, payments, deployment, and growth. The initial user base came without any paid advertising. Development took a year of 60+ hour weeks and predates AI coding assistants such as Copilot.

The idea grew out of a personal passion for nutrition and Evan's experience living abroad. Generic food labels (Daily Values) assume one standard person. Bodyboon instead calculated tailored nutrient targets from each user's age, sex, weight, height, and activity level, covering 44+ nutrients across roughly 15,000 foods.

Nutrition data came from the U.S. Department of Agriculture (FNDDS). Recommendations followed the Dietary Reference Intakes (RDA, AI, UL) set by the Food and Nutrition Board of the National Academies of Sciences, Engineering, and Medicine.

Users could:

- build recipes and meals from the USDA food database
- log their daily intake and review their history
- compare what they ate against their personalized targets

## About this repository

The application has been shut down. This code is published for informational purposes only, as part of Evan’s portfolio. It is not maintained, supported, or intended to be installed or run. All credentials, API keys, project IDs, and service URLs have been removed, and the variables the app was configured with are listed in `.env.example`.

## Stack

- **Client:** Lit web components, Vaadin Router, bundled with webpack
- **Server:** Node.js / Express, deployed to Google Cloud Run behind Firebase Hosting
- **Auth:** Firebase Authentication (ID tokens verified server-side with firebase-admin)
- **Data:** MongoDB Atlas
- **Payments:** Stripe Checkout, Billing Portal, and signed webhooks

## License

**This is not open-source software, and no license is granted.**

Copyright © Evan Lanese. All rights reserved.

The source code in this repository is published solely so it can be read on GitHub, for example as part of a portfolio review. You may view the code in your browser. You may **not**, without prior written permission:

- clone, download, or fork this repository (GitHub's Terms of Service allow forking on GitHub itself, but any fork stays subject to these restrictions)
- copy, reproduce, or redistribute any part of the code, assets, or content
- modify the code or create derivative works from it
- use the code, in whole or in part, in any personal, commercial, or open-source project
- deploy, host, or run the application
- use the code to train machine-learning or AI models

The fact that this repository is publicly visible does not grant any rights to its contents. For permission requests, contact the author through GitHub.
