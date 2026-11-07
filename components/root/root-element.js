import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ContextProvider } from "@lit/context";
import {
  userContext,
  emailContext,
  menuContext,
  detailsContext,
  recommendationsContext,
  analysisContext,
  trackingContext,
  logContext,
  searchContext,
} from "../../app-functions/context.js";
import { endButtonLoadingAnimation } from "../../app-functions/animations.js";
import {
  DATE,
  trackUserRecipe,
  fetchUserStatus,
  fetchIngredientAnalysis,
  fetchIngredientSearch,
  saveUserMenu,
  deleteUserLog,
  saveUserDetails,
} from "../../app-functions/fetch.js";
import { debounce } from "../../app-functions/debounce.js";
import { LogoElement } from "../logo/logo-element.js";
import { LoadingElement } from "../loading/loading-element.js";

export class RootElement extends LitElement {
  static properties = {
    pathname: { type: String },
    user: { type: Object },
    ingredientsToTrack: { type: Array },
    timer: { type: Number },
  };

  constructor() {
    super();
    this.user = {};
    this.pathname = "";
    this.ingredientsToTrack = [];
    this.timer = undefined;

    this.userProvider = new ContextProvider(this, {
      context: userContext,
      initialValue: null,
    });
    this.emailProvider = new ContextProvider(this, {
      context: emailContext,
      initialValue: null,
    });
    this.menuProvider = new ContextProvider(this, {
      context: menuContext,
      initialValue: false,
    });
    this.detailsProvider = new ContextProvider(this, {
      context: detailsContext,
      initialValue: false,
    });
    this.recommendationsProvider = new ContextProvider(this, {
      context: recommendationsContext,
      initialValue: false,
    });
    this.analysisProvider = new ContextProvider(this, {
      context: analysisContext,
      ValueType: Array,
      initialValue: null,
    });
    this.trackingProvider = new ContextProvider(this, {
      context: trackingContext,
      ValueType: Array,
      initialValue: null,
    });
    this.logProvider = new ContextProvider(this, {
      context: logContext,
      initialValue: false,
    });
    this.searchProvider = new ContextProvider(this, {
      context: searchContext,
      initialValue: false,
    });

    this.addEventListener("saved-details", (event) => {
      const details = event.detail.details;
      const recommendations = event.detail.recommendations;
      this.detailsProvider.setValue(details);
      this.recommendationsProvider.setValue(recommendations);
    });

    // THROTTLE EACH FETCH!!!
    this.addEventListener(
      "update-menu",
      debounce(async (event) => {
        const menu = event.detail.menu;
        this.menuProvider.setValue(menu);

        const accessToken = this.user.accessToken;
        let http = await saveUserMenu(accessToken, menu);

        if (http.error) {
          // this.displayError = "ERROR!";
          // this.shadowRoot.querySelector("error-element").hidden = false;
          return;
        }

        if (http.message) {
          switch (http.message) {
            case "auth/invalid-access-token":
              console.info(`${http.message}\n${http.code}\n${http.error}`);
              Router.go("/login");
              return;

            case "(500) Error":
              console.info(`${http.message}\n${http.code}\n${http.error}`);
              Router.go("/login");
              return;

            case "(200) menu saved":
              console.info(http.message);
              return;

            default:
              console.info(`
              Unknown Error: StatusElement an unexpected error occurred. "save-menu"
            `);
              // this.displayError = "ERROR!";
              // this.shadowRoot.querySelector("error-element").hidden = false;
              return;
          }
        }
      }, 300),
    );

    this.addEventListener("delete-log", async (event) => {
      const userLog = event.detail.userLog;

      const accessToken = this.user.accessToken;
      let http = await deleteUserLog(accessToken, userLog);

      if (http.error) {
        // this.shadowRoot.querySelector("loading-element").hidden = true;
        // this.displayError = "ERROR!";
        // this.shadowRoot.querySelector("error-element").hidden = false;
        return;
      }

      if (http.message) {
        switch (http.message) {
          case "auth/invalid-access-token":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(500) Error":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(200) user log deleted":
            console.info(http.message, http.userLog);
            this.logProvider.setValue(http.userLog);

            this.ingredientsToTrack = [];

            http.userLog.forEach((object) => {
              object.ingredients.forEach((ingredient) =>
                this.ingredientsToTrack.push(ingredient),
              );
            });

            http = await fetchIngredientAnalysis(
              this.user.accessToken,
              this.ingredientsToTrack,
            );

            if (http.error) {
              // this.shadowRoot.querySelector("loading-element").hidden = true;
              // this.displayError = "ERROR!";
              // this.shadowRoot.querySelector("error-element").hidden = false;
              return;
            }

            if (http.message) {
              switch (http.message) {
                case "auth/invalid-access-token":
                  console.info(`${http.message}\n${http.code}\n${http.error}`);
                  Router.go("/login");
                  return;

                case "(500) Error":
                  console.info(`${http.message}\n${http.code}\n${http.error}`);
                  Router.go("/login");
                  return;

                case "(200) analysis received":
                  console.info(http.message, http.analysis);
                  this.trackingProvider.setValue(http.analysis);
                  return;

                default:
                  console.info(`
                    Unknown Error: RootElement an unexpected error occurred. fetchIngredientAnalysis()
                  `);
                  // this.displayError = "ERROR!";
                  // this.shadowRoot.querySelector("error-element").hidden = false;
                  return;
              }
            }
            return;

          default:
            console.info(`
              Unknown Error: HistoryElement an unexpected error occurred. willUpdate() menu-element
            `);
            // this.shadowRoot.querySelector("loading-element").hidden = true;
            // this.displayError = "ERROR!";
            // this.shadowRoot.querySelector("error-element").hidden = false;
            return;
        }
      }
    });

    this.addEventListener("log-recipe", async (event) => {
      const recipe = event.detail.recipe;
      const intervalId = event.detail.intervalId;
      const logButton = event.detail.logButton;
      const analysisButton = event.detail.analysisButton;
      const element = event.detail.element;
      const textContent = event.detail.textContent;

      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
      };

      recipe["timestamp"] = new Intl.DateTimeFormat(
        "en-US",
        timeOptions,
      ).format(new Date());

      const dateOptions = {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      };

      const datestamp = new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(),
      );

      const accessToken = this.user.accessToken;
      let http = await trackUserRecipe(accessToken, datestamp, recipe);

      if (http.error) {
        // this.shadowRoot.querySelector("loading-element").hidden = true;
        // this.displayError = "ERROR!";
        // this.shadowRoot.querySelector("error-element").hidden = false;
        console.info(http.error);
        return;
      }

      if (http.message) {
        switch (http.message) {
          case "auth/invalid-access-token":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(500) Error":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(200) recipe tracked":
            console.info(http.message, http.userLog);
            this.logProvider.setValue(http.userLog);
            this.ingredientsToTrack = [];

            http.userLog.forEach((object) => {
              object.ingredients.forEach((ingredient) =>
                this.ingredientsToTrack.push(ingredient),
              );
            });

            http = await fetchIngredientAnalysis(
              this.user.accessToken,
              this.ingredientsToTrack,
            );

            if (http.error) {
              // this.shadowRoot.querySelector("loading-element").hidden = true;
              // this.displayError = "ERROR!";
              // this.shadowRoot.querySelector("error-element").hidden = false;
              return;
            }

            if (http.message) {
              switch (http.message) {
                case "auth/invalid-access-token":
                  console.info(`${http.message}\n${http.code}\n${http.error}`);
                  Router.go("/login");
                  return;

                case "(500) Error":
                  console.info(`${http.message}\n${http.code}\n${http.error}`);
                  Router.go("/login");
                  return;

                case "(200) analysis received":
                  console.info(http.message, http.analysis);
                  endButtonLoadingAnimation(
                    intervalId,
                    logButton,
                    element,
                    textContent,
                  );
                  analysisButton.disabled = false;

                  this.trackingProvider.setValue(http.analysis);
                  const currentSelectedElement =
                    this.shadowRoot.querySelector(".selected-border");
                  currentSelectedElement.classList.toggle("selected-border");
                  const trackingElement =
                    this.shadowRoot.getElementById("tracking-element");
                  trackingElement.classList.toggle("selected-border");
                  Router.go("/tracking");
                  return;

                default:
                  console.info(`
                    Unknown Error: RootElement an unexpected error occurred. fetchIngredientAnalysis()
                  `);
                  // this.displayError = "ERROR!";
                  // this.shadowRoot.querySelector("error-element").hidden = false;
                  return;
              }
            }
        }
      }
    });

    this.addEventListener("analysis-ingredients", async (event) => {
      const category = event.detail.category;
      const recipe = event.detail.recipe;
      const ingredients = event.detail.ingredients;
      const intervalId = event.detail.intervalId;
      const analysisButton = event.detail.analysisButton;
      const logButton = event.detail.logButton;
      const element = event.detail.element;
      const textContent = event.detail.textContent;

      let http = await fetchIngredientAnalysis(
        this.user.accessToken,
        ingredients,
      );

      if (http.error) {
        // this.shadowRoot.querySelector("loading-element").hidden = true;
        // this.displayError = "ERROR!";
        // this.shadowRoot.querySelector("error-element").hidden = false;
        return;
      }

      if (http.message) {
        switch (http.message) {
          case "auth/invalid-access-token":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(500) Error":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(200) analysis received":
            console.info(http.message, http.analysis);
            endButtonLoadingAnimation(
              intervalId,
              analysisButton,
              element,
              textContent,
            );
            logButton.disabled = false;

            http.analysis["category"] = category;
            http.analysis["recipeName"] = recipe;
            this.analysisProvider.setValue(http.analysis);
            this.shadowRoot.getElementById("analysis-element").click();
            return;

          default:
            console.info(`
              Unknown Error: RootElement an unexpected error occurred. fetchIngredientAnalysis()
            `);
            // this.displayError = "ERROR!";
            // this.shadowRoot.querySelector("error-element").hidden = false;
            return;
        }
      }
    });

    this.addEventListener("search-ingredients", async (event) => {
      const button = event.detail.button;
      const searchCriteria = event.detail.input;
      const accessToken = this.user.accessToken;
      let http;

      http = await fetchIngredientSearch(accessToken, searchCriteria);

      if (http.error) {
        console.log("error found with fetch search criteria", http.error);
        return;
      }

      if (http.message) {
        switch (http.message) {
          case "auth/invalid-access-token":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(200) data received":
            console.info(http.message, http.searchResults);
            button.disabled = false;
            this.searchProvider.setValue(http.searchResults);
            return;

          default:
            console.info("Error: An unexpected error occurred");
            return;
        }
      }
    });

    this.addEventListener("clear-search-results", () => {
      this.searchProvider.setValue([]);
    });

    this.addEventListener("update-details", async (event) => {
      const detailsButton = event.detail.detailsButton;
      const intervalId = event.detail.intervalId;
      const textContent = event.detail.textContent;
      const gender = event.detail.gender;
      const childing = event.detail.childing;
      const activity = event.detail.activity;
      const age = event.detail.age;
      const weight = event.detail.weight;
      const feet = event.detail.feet;
      const inches = event.detail.inches;
      const details = {
        gender: gender,
        childing: childing,
        activity: activity,
        age: age,
        weight: weight,
        feet: feet,
        inches: inches,
      };

      const accessToken = this.user.accessToken;
      let http = await saveUserDetails(accessToken, details);

      if (http.error) {
        // this.shadowRoot.querySelector("loading-element").hidden = true;
        // this.displayError = "ERROR!";
        // this.shadowRoot.querySelector("error-element").hidden = false;
        return;
      }

      if (http.message) {
        switch (http.message) {
          case "auth/invalid-access-token":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(500) Error":
            console.info(`${http.message}\n${http.code}\n${http.error}`);
            Router.go("/login");
            return;

          case "(201) Modified user document details":
            console.info(http.message, http.details, http.recommendations);
            endButtonLoadingAnimation(
              intervalId,
              detailsButton,
              detailsButton,
              textContent,
            );
            detailsButton.disabled = false;

            this.detailsProvider.setValue(http.details);
            this.recommendationsProvider.setValue(http.recommendations);

            this.shadowRoot.getElementById("tracking-element").click();
            return;

          default:
            console.info(`
              Unknown Error: RootElement an unexpected error occurred. saveUserDetails()
            `);
            // this.displayError = "ERROR!";
            // this.shadowRoot.querySelector("error-element").hidden = false;
            return;
        }
      }
    });

    this.addEventListener(
      "modify-details",
      debounce(async (event) => {
        const details = event.detail.details;

        const accessToken = this.user.accessToken;
        let http = await saveUserDetails(accessToken, details);

        // HERE!!!

        if (http.error) {
          // this.shadowRoot.querySelector("loading-element").hidden = true;
          // this.displayError = "ERROR!";
          // this.shadowRoot.querySelector("error-element").hidden = false;
          return;
        }

        if (http.message) {
          switch (http.message) {
            case "auth/invalid-access-token":
              console.info(`${http.message}\n${http.code}\n${http.error}`);
              Router.go("/login");
              return;

            case "(500) Error":
              console.info(`${http.message}\n${http.code}\n${http.error}`);
              Router.go("/login");
              return;

            case "(201) Modified user document details":
              console.info(http.message, http.details, http.recommendations);

              this.detailsProvider.setValue(http.details);
              this.recommendationsProvider.setValue(http.recommendations);
              return;

            default:
              console.info(`
              Unknown Error: RootElement an unexpected error occurred. saveUserDetails()
            `);
              // this.displayError = "ERROR!";
              // this.shadowRoot.querySelector("error-element").hidden = false;
              return;
          }
        }
      }, 1500),
    );
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", (event) => {
      this.popStateEvent(event);
    });

    switch (window.location.pathname) {
      case "/":
        this.pathname = "/";
        break;

      case "/analysis":
        this.pathname = "analysis";
        break;

      case "/analysis/":
        this.pathname = "analysis";
        break;

      case "/tracking":
        this.pathname = "tracking";
        break;

      case "/tracking/":
        this.pathname = "tracking";
        break;

      case "/history":
        this.pathname = "history";
        break;

      case "/history/":
        this.pathname = "history";
        break;

      case "/settings":
        this.pathname = "settings";
        break;

      case "/settings/":
        this.pathname = "settings";
        break;
    }

    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userProvider.setValue(user);
        this.emailProvider.setValue(user.email);
        this.user = user;

        const accessToken = user.accessToken;
        const result = await fetchUserStatus(accessToken);

        if (result.error) {
          Router.go("/login");
          return;
        }

        if (result.message) {
          switch (result.message) {
            // REFACTORED!!
            // case "(401)":
            //   console.info(
            //     `${result.status} ${result.message}, request: /u/user/status, ${result.detail}`,
            //   );
            //   Router.go("/login");
            //   return;

            case "auth/invalid-access-token":
              console.info(
                `(401) auth/invalid-access-token, request: /u/user/status, timestamp: ${DATE}`,
              );
              Router.go("/login");
              return;

            case "(500)":
              Router.go("/login");
              return;

            case "(500) Failed to find user document":
              console.info(
                `${result.message}, request: /u/user/status, timestamp: ${DATE} 
                ${result.code}\n${result.error}`,
              );
              Router.go("/login");
              return;

            case "(400) No user document found":
              console.info(
                `HTTP error! function: fetchUserStatus(), request: /u/user/status, timestamp: ${DATE} 
                ${result.message}`,
              );
              Router.go("/signup/creation");
              return;

            case "(400) No stripe customer account":
              console.info(result.message);
              Router.go("/signup/creation");
              return;

            // case "(400) User document found. Subscription is active. Need user details":
            //   console.info(result.message);
            //   Router.go("/app/details");
            //   return;

            case "(400) No customer subscription found":
              console.info(result.message);
              Router.go("/payment/checkout");
              return;

            case "(400) User document found. Subscription is not currently active":
              console.info(result.message);
              Router.go("/payment/checkout");
              return;

            case "(200) User document found. Subscription active":
              console.info(result.message);
              console.log(
                "details:",
                result.details,
                "menu:",
                result.menu,
                "stamp:",
                result.stamp,
                "log:",
                result.userLog,
              );
              this.shadowRoot.querySelector("loading-element").hidden = true;
              this.shadowRoot.querySelector(".div-grid-container").hidden =
                false;
              this.shadowRoot.querySelector("slot").hidden = false;
              this.menuProvider.setValue(result.menu);

              // SET VALUE DETAILS
              this.detailsProvider.setValue(result.details);

              // SET DRI VALUES
              this.recommendationsProvider.setValue(result.recommendations);

              // SET VALUE USERLOG
              const dateOptions = {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              };
              const datestamp = new Intl.DateTimeFormat(
                "en-US",
                dateOptions,
              ).format(new Date());
              if (datestamp !== result.stamp) {
                this.logProvider.setValue([]);
              } else {
                this.logProvider.setValue(result.userLog);

                result.userLog.forEach((object) => {
                  object.ingredients.forEach((ingredient) =>
                    this.ingredientsToTrack.push(ingredient),
                  );
                });

                let http = await fetchIngredientAnalysis(
                  this.user.accessToken,
                  this.ingredientsToTrack,
                );

                if (http.error) {
                  // this.shadowRoot.querySelector("loading-element").hidden = true;
                  // this.displayError = "ERROR!";
                  // this.shadowRoot.querySelector("error-element").hidden = false;
                  return;
                }

                if (http.message) {
                  switch (http.message) {
                    case "auth/invalid-access-token":
                      console.info(
                        `${http.message}\n${http.code}\n${http.error}`,
                      );
                      Router.go("/login");
                      return;

                    case "(500) Error":
                      console.info(
                        `${http.message}\n${http.code}\n${http.error}`,
                      );
                      Router.go("/login");
                      return;

                    case "(200) analysis received":
                      console.info(
                        "Today's log received & analyzed:",
                        http.analysis,
                      );
                      this.trackingProvider.setValue(http.analysis);
                      return;

                    default:
                      console.info(`
                        Unknown Error: RootElement an unexpected error occurred. fetchIngredientAnalysis()
                      `);
                      // this.displayError = "ERROR!";
                      // this.shadowRoot.querySelector("error-element").hidden = false;
                      return;
                  }
                }
              }

              return;

            default:
              console.info(
                "Error: An unexpected error occurred. /u/user/status",
              );
              Router.go("/login");
              return;
          }
        }
      } else {
        console.info("Error: Authorization has expired. Please log back in");
        Router.go("/login");
      }
    });
  }

  firstUpdated() {
    let selectedElement;

    if (this.pathname) {
      switch (this.pathname) {
        case "/":
          selectedElement = this.shadowRoot.getElementById("menu-element");
          selectedElement.classList.toggle("selected-border");
          return;

        case "analysis":
          selectedElement = this.shadowRoot.getElementById("analysis-element");
          selectedElement.classList.toggle("selected-border");
          return;

        case "tracking":
          selectedElement = this.shadowRoot.getElementById("tracking-element");
          selectedElement.classList.toggle("selected-border");
          return;

        case "history":
          selectedElement = this.shadowRoot.getElementById("history-element");
          selectedElement.classList.toggle("selected-border");
          return;

        case "settings":
          selectedElement = this.shadowRoot.getElementById("settings-element");
          selectedElement.classList.toggle("selected-border");
          return;
      }
    }
  }

  hightlightMenuIcon(element) {
    let selectedElement;
    let currentElement;

    selectedElement = this.shadowRoot.getElementById(element);
    currentElement = this.shadowRoot.querySelector(".selected-border");
    currentElement.classList.toggle("selected-border");
    selectedElement.classList.toggle("selected-border");
  }

  popStateEvent(event) {
    if (event.target.location.pathname) {
      switch (event.target.location.pathname) {
        case "/":
          this.hightlightMenuIcon("menu-element");
          return;

        case "/analysis":
          this.hightlightMenuIcon("analysis-element");
          return;

        case "/analysis/":
          this.hightlightMenuIcon("analysis-element");
          return;

        case "/tracking":
          this.hightlightMenuIcon("tracking-element");
          return;

        case "/tracking/":
          this.hightlightMenuIcon("tracking-element");
          return;

        case "/history":
          this.hightlightMenuIcon("history-element");
          return;

        case "/history/":
          this.hightlightMenuIcon("history-element");
          return;

        case "/settings":
          this.hightlightMenuIcon("settings-element");
          return;

        case "/settings/":
          this.hightlightMenuIcon("settings-element");
          return;
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", (event) => {
      this.popStateEvent(event);
    });
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .div-grid-container {
      background-color: rgb(57, 62, 70);
    }
    .div-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      max-width: 720px;
      margin: auto;
    }
    .div-logo {
      grid-column: 1 / 2;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
    .div-navigation {
      grid-column: 3 / 4;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 22px;
    }
    nav {
      display: flex;
      gap: 5px;
    }
    img {
      width: 34px;
      height: 34px;
      padding: 5px;
    }
    .selected-border {
      border: 2px solid rgb(0, 173, 181);
    }
    main {
      background-color: rgb(57, 62, 70);
      min-height: 100vh;
    }
  `;

  render() {
    return html`
      <loading-element
        color="rgb(238, 238, 238)"
        background="rgb(57, 62, 70)"
        border="rgb(0, 173, 181)"
      ></loading-element>

      <div class="div-grid-container" hidden>
        <div class="div-grid">
          <div class="div-logo">
            <logo-element src="/img/bb-logo-512x512-black.svg"></logo-element>
          </div>

          <div class="div-navigation">
            <nav>
              <a href="/"
                ><img
                  id="menu-element"
                  src="../img/dining-light.svg"
                  alt="Symbol of a fork and spoon"
              /></a>
              <a href="/analysis"
                ><img
                  id="analysis-element"
                  src="../img/experiment-light.svg"
                  alt="Symbol of a science beacon"
              /></a>
              <a href="/tracking"
                ><img
                  id="tracking-element"
                  src="../img/conditions-light.svg"
                  alt="Symbol of person being inspected"
              /></a>
              <a href="/history"
                ><img
                  id="history-element"
                  src="../img/history-light.svg"
                  alt="Symbol of a clock"
              /></a>
              <a href="/settings"
                ><img
                  id="settings-element"
                  src="../img/settings_account-light.svg"
                  alt="Symbol for account settings"
              /></a>
            </nav>
          </div>
        </div>
      </div>

      <main>
        <slot hidden></slot>
      </main>
    `;
  }
}

customElements.define("root-element", RootElement);
