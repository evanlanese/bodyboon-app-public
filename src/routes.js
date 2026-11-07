import { RootElement } from "../components/root/root-element.js";
import { MenuElement } from "../components/menu/menu-element.js";
import { AnalysisElement } from "../components/analysis/analysis-element.js";
import { TrackingElement } from "../components/tracking/tracking-element.js";
import { HistoryElement } from "../components/history/history-element.js";
import { SettingsElement } from "../components/settings/settings-element.js";
import { LoginElement } from "../components/login/login-element.js";
import { ForgotPasswordElement } from "../components/forgot-password/forgot-password-element.js";
import { SignupElement } from "../components/signup/signup-element.js";
import { SignupSentElement } from "../components/signup/signup-sent-element.js";
import { AuthCreationElement } from "../components/signup-auth/auth-creation-element.js";
import { AccountCreationElement } from "../components/signup-creation/account-creation-element.js";
import { StripeCheckoutElement } from "../components/payment/stripe-checkout-element.js";
import { TermsElement } from "../components/tos/terms/terms-element.js";
import { PrivacyElement } from "../components/tos/privacy/privacy-element.js";
import { BugBountyElement } from "../components/tos/bounty/bug-bounty-element.js";
import { NotFoundElement } from "../components/404-page/not-found-element.js";

export const routes = [
  {
    path: "/",
    component: "root-element",
    children: [
      {
        path: "/",
        component: "menu-element",
      },
      {
        path: "/analysis",
        component: "analysis-element",
      },
      {
        path: "/tracking",
        component: "tracking-element",
      },
      {
        path: "/history",
        component: "history-element",
      },
      {
        path: "/settings",
        component: "settings-element",
      },
    ],
  },
  {
    path: "/login",
    component: "login-element",
  },
  {
    path: "/login/forgot-password",
    component: "forgot-password-element",
  },
  {
    path: "/signup",
    component: "signup-element",
  },
  {
    path: "/signup/sent",
    component: "signup-sent-element",
  },
  {
    path: "/signup/auth",
    component: "auth-creation-element",
  },
  {
    path: "/signup/creation",
    component: "account-creation-element",
  },
  {
    path: "/payment/checkout",
    component: "stripe-checkout-element",
  },
  {
    path: "/terms",
    component: "terms-element",
  },
  {
    path: "/privacy",
    component: "privacy-element",
  },
  {
    path: "/terms-security",
    component: "bug-bounty-element",
  },

  // catch-all
  {
    path: "(.*)",
    component: "not-found-element",
  },
];
