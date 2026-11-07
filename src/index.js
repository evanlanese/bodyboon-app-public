import { Router } from "@vaadin/router";
import { routes } from "./routes.js";
import { initializeApp } from "firebase/app";
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const clientConfig = {
  apiKey: process.env.FB_CLIENT_API_KEY,
  authDomain: process.env.FB_CLIENT_AUTH_DOMAIN,
  projectId: process.env.FB_CLIENT_PROJECT_ID,
  storageBucket: process.env.FB_CLIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.FB_CLIENT_APP_ID,
};

const app = initializeApp(clientConfig);

/* APPCHECK/RECAPTCHA IS NOT SETUP (OR CONFIGURED VARIABLE IN WEBPACK)
const options = {
  provider: new ReCaptchaEnterpriseProvider(process.env.RECAPTCHA_ENTERPRISE_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
};

const appCheck = initializeAppCheck(app, options);*/

const outlet = document.getElementById("app");
const router = new Router(outlet);
router.setRoutes(routes);

// use 'router-ignore' for anchor tag external links
// firebase login --reauth
