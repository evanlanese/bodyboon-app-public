import express from "express";
import basicAuth from "express-basic-auth";
import path from "path";
import { fileURLToPath } from "url";

import { DATE } from "./app-functions/fetch.js";
import { calculateBMI } from "./app-functions/calculate-bmi.js";
import {
  calculateKcalEER,
  calculateIfChildingKcalEER,
} from "./app-functions/calculate-kcal.js";
import * as RDA from "./app-functions/calculate-rda.js";
import * as AI from "./app-functions/calculate-ai.js";
import {
  convertActivity,
  convertPoundsToKilograms,
  convertHeightToMeters,
} from "./app-functions/unit-conversion.js";
import { sortAscendingOrder } from "./app-functions/sort.js";
import { ingredientAnalysis } from "./app-functions/calculate-nutrients.js";
import {
  convertToLiters,
  convertLitersIntoCupsOfWater,
  calculateNetCarbs,
} from "./app-functions/unit-conversion.js";
import {
  confirmPasswordMatch,
  validatePriceId,
  validateDisplayName,
  validateDetailsObjectLength,
  validateDetailsKeys,
  validateActivityLevel,
  validateGender,
  validateChilding,
  validateAge,
  floorAge,
  validateWeight,
  validateFeet,
  validateInches,
  validateArrayWithLength,
  validatePasswordPolicy,
  validateString,
} from "./app-functions/validate-input.js";
import { maskEmail } from "./app-functions/redact.js";
import {
  verifyFirebaseAuthTokenId,
  updateFirebaseAuthPassword,
} from "./firebase/firebase-auth.js";
import {
  pingMongoAtlas,
  modifyDocumentUserLog,
  updateUserDocumentLogAndStamp,
  updateUserDocumentResetLogAndStamp,
  updateUserDocumentLog,
  updateUserDocumentMenu,
  createNewUserDocument,
  findUserDocumentByFirebaseUID,
  modifyUserDocumentSubscriptionStatus,
  webhookSubscriptionStatus,
  modifyUserDocumentStripeUID,
  modifyUserDocumentDetailsObject,
  deleteUserDocument,
} from "./mongodb/mongodb.js";
import {
  findStripeCustomerByFirebaseUID,
  createStripeCustomer,
  createStripeCheckoutSession,
  constructStripeWebhookEvent,
  findStripeCustomerSubscriptionInfo,
} from "./stripe/stripe.js";
import * as fndds from "./src/json/fndds.json" assert { type: "json" };
import * as fndds3LSorted from "./src/json/fndds-3l-sorted.json" assert { type: "json" };

const server = express();
server.disable("x-powered-by");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.urlencoded({ extended: true }));
server.use("/stripe/webhooks", express.raw({ type: "application/json" }));
server.use(express.json());
server.use("/dist", express.static(path.resolve(__dirname, "dist")));
server.use("/img", express.static(path.resolve(__dirname, "img")));
server.use("/favicons", express.static(path.resolve(__dirname, "favicons")));

const PORT = 8080;
let betaMiddleWare;

/* Staging (beta) is gated behind basic auth when credentials are provided via env */
if (process.env.BETA_AUTH_USER && process.env.BETA_AUTH_PASSWORD) {
  betaMiddleWare = basicAuth({
    users: { [process.env.BETA_AUTH_USER]: process.env.BETA_AUTH_PASSWORD },
    challenge: true,
  });
} else {
  betaMiddleWare = (req, res, next) => next();
}

const authentication = async (req, res, next) => {
  const header = req.headers["token-authorization"];
  const accessToken = typeof header === "string" ? header.split(" ")[1] : null;

  if (!accessToken) {
    res.status(401).send({ message: "auth/missing-access-token" });
    return;
  }

  try {
    res.locals.user = await verifyFirebaseAuthTokenId(accessToken);
  } catch (error) {
    console.info(`
      (401) auth/invalid-access-token, timestamp: ${DATE}
      ${error}
    `);
    res.status(401).send({
      message: "auth/invalid-access-token",
      error: "Invalid or expired access token",
    });
    return;
  }

  next();
};

/* Data routes are only available to users with an active subscription */
const requireActiveSubscription = async (req, res, next) => {
  let mongoUser;

  try {
    mongoUser = await findUserDocumentByFirebaseUID(res.locals.user.uid);
  } catch (error) {
    console.info(`
      (500) error! function: findUserDocumentByFirebaseUID(), requireActiveSubscription, request: ${req.originalUrl}, timestamp: ${DATE}
      ${error}
    `);
    res.status(500).send({ message: "(500) Error", error: "Internal server error" });
    return;
  }

  if (!mongoUser || mongoUser.status !== "active") {
    res.status(403).send({
      message: "(403) Subscription is not currently active",
      error: "Subscription required",
    });
    return;
  }

  next();
};

server.get("*", betaMiddleWare, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/index.html"));
});

server.post("/u/track/recipe", authentication, requireActiveSubscription, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  const recipe = req.body.recipe;
  const datestamp = req.body.datestamp;
  let mongoUser;

  if (
    recipe === null ||
    typeof recipe !== "object" ||
    !validateString(datestamp, 64) ||
    !datestamp.includes("/")
  ) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  try {
    mongoUser = await findUserDocumentByFirebaseUID(firebaseUID);
    console.info(`
      Completed! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE}
    `);
  } catch (error) {
    console.info(`
      (500) error! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE} 
      ${error}
    `);
    res.status(200).send({
      message: "(500) Error",
      error: "Internal server error",
    });
    return;
  }

  if (!mongoUser.logDatestamp) {
    try {
      mongoUser = await updateUserDocumentLogAndStamp(
        firebaseUID,
        datestamp,
        recipe,
      );
      console.info(`
        Promise completed: updateUserDocumentLogAndStamp(), ${req.originalUrl}
      `);
    } catch (error) {
      console.info(`
        (500) Error: Failed to complete request to find user document firebaseUID: ${firebaseUID} updateUserDocumentLogAndStamp(), RootElement ${req.originalUrl}
        ${error}
      `);
      res.status(200).send({
        message: "(500) Error",
        error: "Internal server error",
      });
      return;
    }

    res.status(200).send({
      message: "(200) recipe tracked",
    });
    return;
  }

  const previousDay = Number(mongoUser.logDatestamp.split("/")[1]);
  const currentDay = Number(datestamp.split("/")[1]);

  if (previousDay !== currentDay) {
    try {
      mongoUser = await updateUserDocumentResetLogAndStamp(
        firebaseUID,
        datestamp,
        recipe,
      );
      console.info(`
        Promise completed: updateUserDocumentResetLogAndStamp(), ${req.originalUrl}
      `);
    } catch (error) {
      console.info(`
        (500) Error: Failed to complete request to find user document firebaseUID: ${firebaseUID} updateUserDocumentResetLogAndStamp(), RootElement ${req.originalUrl}
        ${error}
      `);
      res.status(200).send({
        message: "(500) Error",
        error: "Internal server error",
      });
      return;
    }

    res.status(200).send({
      message: "(200) recipe tracked",
      userLog: mongoUser.userLog,
    });
    return;
  }

  try {
    mongoUser = await updateUserDocumentLog(firebaseUID, recipe);
    console.info(`
      Promise completed: updateUserDocumentLog(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed to complete request to find user document firebaseUID: ${firebaseUID} updateUserDocumentLog(), RootElement ${req.originalUrl}
      ${error}
    `);
    res.status(200).send({
      message: "(500) Error",
      error: "Internal server error",
    });
    return;
  }

  res.status(200).send({
    message: "(200) recipe tracked",
    userLog: mongoUser.userLog,
  });
});

server.post("/u/fetch/log", authentication, requireActiveSubscription, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  let mongoUser;

  try {
    mongoUser = await findUserDocumentByFirebaseUID(firebaseUID);
    console.info(`
      Completed! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE}
    `);
  } catch (error) {
    console.info(`
      (500) error! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE} 
      ${error}
    `);
    res.status(200).send({
      message: "(500) Error",
      error: "Internal server error",
    });
    return;
  }

  res.status(200).send({
    message: "(200) user log received",
    userLog: mongoUser.userLog,
  });
});

server.post("/u/delete/log", authentication, requireActiveSubscription, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  const userLog = req.body.userLog;
  let mongoUser;

  if (!Array.isArray(userLog)) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  try {
    mongoUser = await modifyDocumentUserLog(firebaseUID, userLog);
    console.info(`
      Promise completed: modifyDocumentUserLog(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed to complete request to find user document firebaseUID: ${firebaseUID} modifyDocumentUserLog(), HistoryElement ${req.originalUrl}
      ${error}
    `);
    res.status(200).send({
      message: "(500) Error",
      error: "Internal server error",
    });
    return;
  }

  res.status(200).send({
    message: "(200) user log deleted",
    userLog: mongoUser.userLog,
  });
});

server.post("/u/fetch/analysis", authentication, requireActiveSubscription, async (req, res) => {
  const ingredients = req.body.ingredients;
  let results;

  if (!Array.isArray(ingredients)) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  if (!ingredients.length) {
    res.status(200).send({
      message: "(200) analysis received",
      analysis: undefined,
    });
    return;
  }

  results = await ingredientAnalysis(fndds, ingredients);
  results["litersOfWater"] = convertToLiters(results["waterIntake"]);
  results["netCarbs"] = calculateNetCarbs(
    results["carbohydrateIntake"],
    results["fiberIntake"],
  );

  res.status(200).send({
    message: "(200) analysis received",
    analysis: results,
  });
}); // DONE

server.post("/u/fetch/search", authentication, requireActiveSubscription, async (req, res) => {
  if (!validateString(req.body.searchCriteria, 128)) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  let criteria = req.body.searchCriteria.toLowerCase();
  let customCriteria;
  let searchResults;

  // AID TO PREVENT SEARCH FROM FAILING IF USER TYPES "STRAWBERRY" BUT DATA USES "STRAWBERRIES"
  criteria.endsWith("ies") ? (criteria = criteria.slice(0, -3)) : false;
  criteria.endsWith("ys") ? (criteria = criteria.slice(0, -2)) : false;
  criteria.endsWith("y") ? (criteria = criteria.slice(0, -1)) : false;

  customCriteria = criteria.slice(0, 3);

  if (customCriteria in fndds3LSorted.default) {
    searchResults = fndds3LSorted.default[customCriteria].filter((word) => {
      return word.description.toLowerCase().includes(criteria);
    });
    // "fndds3LSorted" RESULTS STORED AS SORTED
  } else {
    searchResults = fndds.default.filter((word) => {
      return word.description.toLowerCase().includes(criteria);
    });
    // SORT FNDDS RESULTS
    searchResults = sortAscendingOrder(searchResults);
  }

  /* 
    (mil, jam, pom, mis, fry, soy, nec, red, chi, ind)

    3L search
    DURATION: 0.08933401107788086
    DURATION: 0.03737500309944153
    DURATION: 0.05054199695587158
    DURATION: 0.030708998441696167
    DURATION: 4.534750014543533
    DURATION: 3.280084013938904
    DURATION: 0.026082992553710938
    DURATION: 0.029208004474639893
    DURATION: 0.22829201817512512
    DURATION: 0.02695801854133606
    0.8333ms

    Full search
    DURATION: 5.619875013828278
    DURATION: 2.652290999889374
    DURATION: 4.431083023548126
    DURATION: 1.8079160153865814
    DURATION: 5.390416979789734
    DURATION: 2.391416996717453
    DURATION: 3.088707983493805
    DURATION: 2.865457981824875
    DURATION: 2.6305409967899323
    DURATION: 2.356832981109619
    3.3235ms

    119.81% difference
  */

  res.status(200).send({
    message: "(200) data received",
    searchResults: searchResults,
  });
});

server.post("/u/save/details", authentication, requireActiveSubscription, async (req, res) => {
  const details = req.body.details;

  const keys = [
    "activity",
    "gender",
    "childing",
    "age",
    "weight",
    "feet",
    "inches",
  ];
  const firebaseUID = res.locals.user.uid;
  const email = res.locals.user.email;
  let mongoUser;

  if (!validateDetailsObjectLength(details)) {
    console.info(`
      (400) Error: invalid user details validateDetailsObjectLength() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateDetailsKeys(details, keys)) {
    console.info(`
      (400) Error: invalid user details keys validateDetailsKeys() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateActivityLevel(details.activity)) {
    console.info(`
      (400) Error: invalid user details activity level validateActivityLevel() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateGender(details.gender)) {
    console.info(`
      (400) Error: invalid user details gender validateGender() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateChilding(details.childing)) {
    console.info(`
      (400) Error: invalid user details childing validateChilding() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateAge(details.age)) {
    console.info(`
      (400) Error: invalid user details age validateAge() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateWeight(details.weight)) {
    console.info(`
      (400) Error: invalid user details weight validateWeight() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateFeet(details.feet)) {
    console.info(`
      (400) Error: invalid user details feet validateFeet() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  if (!validateInches(details.inches)) {
    console.info(`
      (400) Error: invalid user details inches validateFeet() ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: invalid user details",
    });
    return;
  }

  /* AGE IS ONLY PROP THAT USES A FLOAT TO CALC RDA FOR INFANTS < 3 YRS */
  details.age = floorAge(details.age);

  try {
    mongoUser = await modifyUserDocumentDetailsObject(firebaseUID, details);
    console.info(`
      Promise completed: modifyUserDocumentDetailsObject(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed to complete request to modify user document details modifyUserDocumentDetailsObject(), ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
      ${error}
    `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
      error: "Internal server error",
    });
    return;
  }

  if (!mongoUser.details.length) {
    console.info(`
      (400) Error: Failed to modify user document details, ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: Failed to modify user document details",
    });
    return;
  }

  /* DO DETAILS CALCULATIONS HERE */
  const recommendations = {};

  if (mongoUser.details.length) {
    let { age, gender, childing, activity, weight, feet, inches } =
      mongoUser.details[0];
    activity = convertActivity(age, gender, activity);
    const kilograms = convertPoundsToKilograms(weight);
    const meters = convertHeightToMeters(feet, inches);
    const bmi = calculateBMI(kilograms, meters);
    let kcalEER = calculateKcalEER(activity, age, gender, kilograms, meters);
    if (childing !== "none") {
      kcalEER = calculateIfChildingKcalEER(kcalEER, childing);
    }

    recommendations["bmi"] = bmi;
    recommendations["kcalEER"] = kcalEER;
    recommendations["RDAofProtein"] = RDA.calculateRDAofProtein(
      age,
      kilograms,
      gender,
      childing,
    );
    recommendations["minCarbohydrateAMDR"] = RDA.calculateMinCarbohydrateAMDR(
      age,
      kcalEER,
    );
    recommendations["maxCarbohydrateAMDR"] = RDA.calculateMaxCarbohydrateAMDR(
      age,
      kcalEER,
    );
    recommendations["minFatAMDR"] = RDA.calculateMinFatAMDR(age, kcalEER);
    recommendations["maxFatAMDR"] = RDA.calculateMaxFatAMDR(age, kcalEER);
    recommendations["RDAofVitaminA"] = RDA.calculateRDAofVitaminA(
      age,
      gender,
      childing,
    );
    recommendations["RDAofVitaminC"] = RDA.calculateRDAofVitaminC(
      age,
      gender,
      childing,
    );
    recommendations["RDAofVitaminD"] = RDA.calculateRDAofVitaminD(
      age,
      gender,
      childing,
    );
    recommendations["RDAofVitaminE"] = RDA.calculateRDAofVitaminE(
      age,
      gender,
      childing,
    );
    recommendations["RDAofThiaminB1"] = RDA.calculateRDAofThiaminB1(
      age,
      gender,
      childing,
    );
    recommendations["RDAofRiboflavinB2"] = RDA.calculateRDAofRiboflavinB2(
      age,
      gender,
      childing,
    );
    recommendations["RDAofNiacinB3"] = RDA.calculateRDAofNiacinB3(
      age,
      gender,
      childing,
    );
    recommendations["RDAofPyridoxineB6"] = RDA.calculateRDAofPyridoxineB6(
      age,
      gender,
      childing,
    );
    recommendations["RDAofFolateB9"] = RDA.calculateRDAofFolateB9(
      age,
      gender,
      childing,
    );
    recommendations["RDAofCobalaminB12"] = RDA.calculateRDAofCobalaminB12(
      age,
      gender,
      childing,
    );
    recommendations["RDAofCalcium"] = RDA.calculateRDAofCalcium(
      age,
      gender,
      childing,
    );
    recommendations["RDAofIron"] = RDA.calculateRDAofIron(
      age,
      gender,
      childing,
    );
    recommendations["RDAofMagnesium"] = RDA.calculateRDAofMagnesium(
      age,
      gender,
      childing,
    );
    recommendations["RDAofPhosphorus"] = RDA.calculateRDAofPhosphorus(
      age,
      gender,
      childing,
    );
    recommendations["RDAofZinc"] = RDA.calculateRDAofZinc(
      age,
      gender,
      childing,
    );
    recommendations["RDAofCopper"] = RDA.calculateRDAofCopper(
      age,
      gender,
      childing,
    );
    recommendations["RDAofSelenium"] = RDA.calculateRDAofSelenium(
      age,
      gender,
      childing,
    );
    recommendations["AIofWater"] = AI.calculateAIofWater(age, gender, childing);
    recommendations["AIofFiber"] = AI.calculateAIofFiber(age, gender, childing);
    recommendations["AIofLinoleicAcid"] = AI.calculateAIofLinoleicAcid(
      age,
      gender,
      childing,
    );
    recommendations["AIofALinoleicAcid"] = AI.calculateAIofALinoleicAcid(
      age,
      gender,
      childing,
    );
    recommendations["AIofVitaminK"] = AI.calculateAIofVitaminK(
      age,
      gender,
      childing,
    );
    recommendations["AIofCholine"] = AI.calculateAIofCholine(
      age,
      gender,
      childing,
    );
    recommendations["AIofPotassium"] = AI.calculateAIofPotassium(
      age,
      gender,
      childing,
    );
    recommendations["AIofSodium"] = AI.calculateAIofSodium(
      age,
      gender,
      childing,
    );
  }

  res.status(201).send({
    message: "(201) Modified user document details",
    details: mongoUser.details,
    recommendations: [recommendations],
  });
});

server.post("/u/save/menu", authentication, requireActiveSubscription, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  const menu = req.body.menu;
  let mongoUser;

  if (!Array.isArray(menu)) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  try {
    mongoUser = await updateUserDocumentMenu(firebaseUID, menu);
    console.info(`
      Promise completed: updateUserDocumentMenu(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed to complete request to find user document firebaseUID: ${firebaseUID} updateUserDocumentMenu(), AuthElement ${req.originalUrl}
      ${error}
    `);
    res.status(200).send({
      message: "(500) Error",
      error: "Internal server error",
    });
    return;
  }

  res.status(200).send({
    message: "(200) menu saved",
  });
});

server.post("/u/user/status", authentication, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  let mongoUser;
  let currentMonth;
  let stripeUID;
  let subscription;
  let subscriptionStatus;

  try {
    mongoUser = await findUserDocumentByFirebaseUID(firebaseUID);
    console.info(`
      Completed! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE}
    `);
  } catch (error) {
    console.info(`
      (500) error! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE} 
      ${error}
    `);
    res.status(200).send({
      // status: "(500)",
      message: "Failed to find user document",
      // detail: `request: ${req.originalUrl}, timestamp: ${DATE}`,
      error: "Internal server error",
    });
    return;
  }

  if (mongoUser) {
    if (!mongoUser.stripeUID) {
      console.info(`
        (400) User document stripeUID is null.
        firebaseUID: ${firebaseUID}, request: ${req.originalUrl}, timestamp: ${DATE}
      `);
      res.status(200).send({
        // status: "(400)",
        message: "(400) No stripe customer account",
        // detail: `request: ${req.originalUrl}, timestamp: ${DATE}`
      });
      return;
    }

    /* Each UTC month, search stripe's customer records to determine customer's subscription status and update database if records do not match. (a counter-measure in-case failed to receive stripe webhook event customer.subscription.updated) */
    currentMonth = new Date().getUTCMonth();
    stripeUID = mongoUser.stripeUID;

    if (currentMonth !== mongoUser.lastChecked) {
      try {
        subscription = await findStripeCustomerSubscriptionInfo(stripeUID);
        console.info(`
          Completed! function: findStripeCustomerSubscriptionInfo(), request: ${req.originalUrl}, timestamp: ${DATE}
        `);
      } catch (error) {
        console.info(`
          (500) error! function: findStripeCustomerSubscriptionInfo(), request: ${req.originalUrl}, timestamp: ${DATE} 
          ${error}
        `);
        res.status(200).send({
          message: "(500)",
          // detail: `Failed to find stripe customer subscription info, request: ${req.originalUrl}, timestamp: ${DATE}`,
          error: "Internal server error",
        });
        return;
      }

      if (!subscription.data.length) {
        console.info(`
          (400) Customer subscription is not active, request: ${req.originalUrl}, timestamp: ${DATE}
        `);
        res.status(200).send({
          message: "(400) No customer subscription found",
        });
        return;
      }

      subscriptionStatus = subscription.data[0].status;

      try {
        mongoUser = await modifyUserDocumentSubscriptionStatus(
          firebaseUID,
          subscriptionStatus,
          currentMonth,
        );
        console.info(`
          Promise completed: modifyUserDocumentSubscriptionStatus(), ${req.originalUrl}
        `);
      } catch (error) {
        console.info(`
          (500) Error: Failed to complete request to modify user document modifyUserDocumentSubscriptionStatus(), AuthElement ${req.originalUrl}
          firebaseUID: ${firebaseUID}
          ${error}
        `);
        res.status(200).send({
          message: "(500)",
          error: "Internal server error",
        });
        return;
      }

      if (mongoUser.lastChecked !== currentMonth) {
        console.info(`
          (500) Error: Failed to update user document subscription status to match stripe customer subscription status modifyUserDocumentSubscriptionStatus()
          AuthElement ${req.originalUrl}
          firebaseUID: ${firebaseUID}, subscriptionStatus: ${subscriptionStatus}
        `);
      }
    }

    if (mongoUser.status !== "active") {
      console.info(`
        (400) AuthElement User document found. Stripe subscription is not currently active ${req.originalUrl}
        firebaseUID: ${firebaseUID} status: ${mongoUser.status}
      `);
      res.status(200).send({
        message:
          "(400) User document found. Subscription is not currently active",
      });
      return;
    }

    /* DO DETAILS CALCULATIONS HERE */
    const recommendations = {};

    if (mongoUser.details.length) {
      let { age, gender, childing, activity, weight, feet, inches } =
        mongoUser.details[0];
      activity = convertActivity(age, gender, activity);
      const kilograms = convertPoundsToKilograms(weight);
      const meters = convertHeightToMeters(feet, inches);
      const bmi = calculateBMI(kilograms, meters);
      let kcalEER = calculateKcalEER(activity, age, gender, kilograms, meters);
      if (childing !== "none") {
        kcalEER = calculateIfChildingKcalEER(kcalEER, childing);
      }

      recommendations["bmi"] = bmi;
      recommendations["kcalEER"] = kcalEER;
      recommendations["RDAofProtein"] = RDA.calculateRDAofProtein(
        age,
        kilograms,
        gender,
        childing,
      );
      recommendations["minCarbohydrateAMDR"] = RDA.calculateMinCarbohydrateAMDR(
        age,
        kcalEER,
      );
      recommendations["maxCarbohydrateAMDR"] = RDA.calculateMaxCarbohydrateAMDR(
        age,
        kcalEER,
      );
      recommendations["minFatAMDR"] = RDA.calculateMinFatAMDR(age, kcalEER);
      recommendations["maxFatAMDR"] = RDA.calculateMaxFatAMDR(age, kcalEER);
      recommendations["RDAofVitaminA"] = RDA.calculateRDAofVitaminA(
        age,
        gender,
        childing,
      );
      recommendations["RDAofVitaminC"] = RDA.calculateRDAofVitaminC(
        age,
        gender,
        childing,
      );
      recommendations["RDAofVitaminD"] = RDA.calculateRDAofVitaminD(
        age,
        gender,
        childing,
      );
      recommendations["RDAofVitaminE"] = RDA.calculateRDAofVitaminE(
        age,
        gender,
        childing,
      );
      recommendations["RDAofThiaminB1"] = RDA.calculateRDAofThiaminB1(
        age,
        gender,
        childing,
      );
      recommendations["RDAofRiboflavinB2"] = RDA.calculateRDAofRiboflavinB2(
        age,
        gender,
        childing,
      );
      recommendations["RDAofNiacinB3"] = RDA.calculateRDAofNiacinB3(
        age,
        gender,
        childing,
      );
      recommendations["RDAofPyridoxineB6"] = RDA.calculateRDAofPyridoxineB6(
        age,
        gender,
        childing,
      );
      recommendations["RDAofFolateB9"] = RDA.calculateRDAofFolateB9(
        age,
        gender,
        childing,
      );
      recommendations["RDAofCobalaminB12"] = RDA.calculateRDAofCobalaminB12(
        age,
        gender,
        childing,
      );
      recommendations["RDAofCalcium"] = RDA.calculateRDAofCalcium(
        age,
        gender,
        childing,
      );
      recommendations["RDAofIron"] = RDA.calculateRDAofIron(
        age,
        gender,
        childing,
      );
      recommendations["RDAofMagnesium"] = RDA.calculateRDAofMagnesium(
        age,
        gender,
        childing,
      );
      recommendations["RDAofPhosphorus"] = RDA.calculateRDAofPhosphorus(
        age,
        gender,
        childing,
      );
      recommendations["RDAofZinc"] = RDA.calculateRDAofZinc(
        age,
        gender,
        childing,
      );
      recommendations["RDAofCopper"] = RDA.calculateRDAofCopper(
        age,
        gender,
        childing,
      );
      recommendations["RDAofSelenium"] = RDA.calculateRDAofSelenium(
        age,
        gender,
        childing,
      );
      recommendations["AIofWater"] = AI.calculateAIofWater(
        age,
        gender,
        childing,
      );
      recommendations["AIofFiber"] = AI.calculateAIofFiber(
        age,
        gender,
        childing,
      );
      recommendations["AIofLinoleicAcid"] = AI.calculateAIofLinoleicAcid(
        age,
        gender,
        childing,
      );
      recommendations["AIofALinoleicAcid"] = AI.calculateAIofALinoleicAcid(
        age,
        gender,
        childing,
      );
      recommendations["AIofVitaminK"] = AI.calculateAIofVitaminK(
        age,
        gender,
        childing,
      );
      recommendations["AIofCholine"] = AI.calculateAIofCholine(
        age,
        gender,
        childing,
      );
      recommendations["AIofPotassium"] = AI.calculateAIofPotassium(
        age,
        gender,
        childing,
      );
      recommendations["AIofSodium"] = AI.calculateAIofSodium(
        age,
        gender,
        childing,
      );
    }

    res.status(200).send({
      message: "(200) User document found. Subscription active",
      details: mongoUser.details,
      recommendations: [recommendations],
      menu: mongoUser.menu,
      stamp: mongoUser.logDatestamp,
      userLog: mongoUser.userLog,
    });
    return;
  }

  if (!mongoUser) {
    console.info(`
      (400) No user document found, AuthElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}
    `);
    res.status(200).send({
      message: "(400) No user document found",
    });
    return;
  }
});

server.post("/signup/auth/password", authentication, async (req, res) => {
  if (
    !validateString(req.body.password, 64) ||
    !validateString(req.body.confirmPassword, 64)
  ) {
    res.status(400).send({ message: "(400) Error: invalid request", error: "Invalid request" });
    return;
  }

  const password = req.body.password.trim();
  const confirmPassword = req.body.confirmPassword.trim();
  const firebaseUID = res.locals.user.uid;
  const email = res.locals.user.email;

  if (!confirmPasswordMatch(password, confirmPassword)) {
    console.info(`
      (400) Error: Passwords do not match, CreatePasswordElement ${req.originalUrl}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Error: The passwords entered do not match",
      code: 400,
      error: req.originalUrl,
    });
    return;
  }

  if (!validatePasswordPolicy(password)) {
    res.status(400).send({
      message:
        "(400) Error: Password must be 12-18 characters and include uppercase, lowercase, numeric, and special characters",
      code: 400,
      error: req.originalUrl,
    });
    return;
  }

  try {
    await updateFirebaseAuthPassword(firebaseUID, password);
    console.info(`
      Promise completed: updateFirebaseAuthPassword(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed to complete request to update account password
      updateFirebaseAuthPassword(), CreatePasswordElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
      ${error}
    `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
      error: "Internal server error",
    });
    return;
  }

  res.status(201).send({
    message: "(201) Authentication password has been set",
  });
});

server.post("/signup/creation/document/user", authentication, async (req, res) => {
  const firebaseUID = res.locals.user.uid;
  const email = res.locals.user.email;
  let mongoUser;
  let newUser;

  try {
    mongoUser = await findUserDocumentByFirebaseUID(firebaseUID);
    console.info(`
        Completed! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE}
      `);
  } catch (error) {
    console.info(`
        (500) error! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE} 
        ${error}
      `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
      error: "Internal server error",
    });
    return;
  }

  if (!mongoUser) {
    try {
      newUser = await createNewUserDocument(firebaseUID, email);
      console.info(`
        Promise completed: createNewUserDocument(), ${req.originalUrl}
      `);
    } catch (error) {
      console.info(`
        (500) Error: Failed to complete request to create new user document, createNewUserDocument(), AccountCreationElement ${req.originalUrl}
        firebaseUID: ${firebaseUID}, ${maskEmail(email)}
        ${error}
      `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }
  } else {
    if (mongoUser.status === "active") {
      console.info(`
        (200) User document exists. Subscription is active. ${maskEmail(email)}
      `);
      res.status(200).send({
        message: "(200) User document exists. Subscription is active",
      });
      return;
    }

    if (!mongoUser.stripeUID) {
      console.info(`
        (200) User document exists. No stripeUID. Responding to create stripe account ${maskEmail(email)} ${req.originalUrl}
      `);
      res.status(200).send({
        message:
          "(200) User document exists. No customer id. Create customer account",
      });
      return;
    } else {
      console.info(`
        (400) User document exists & stripeUID exists. Subscription is not active ${maskEmail(email)}
      `);
      res.status(400).send({
        message:
          "(400) User document exists & customer exists. Subscription is not active",
      });
      return;
    }
  }

  if (!newUser) {
    console.info(`
      (500) Error: Failed to create a new user document, createNewUserDocument(), AccountCreationElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
    });
    return;
  }

  res.status(201).send({
    message: "(201) Successfully created new user document",
  });
});

server.post(
  "/signup/creation/search/stripe",
  authentication,
  async (req, res) => {
    const firebaseUID = res.locals.user.uid;
    const email = res.locals.user.email;
    let customer;
    let stripeUID;
    let subscription;
    let mongoUser;
    let currentMonth;
    let subscriptionStatus;
    let update;

    try {
      customer = await findStripeCustomerByFirebaseUID(firebaseUID);
      console.info(`
      Promise completed: findStripeCustomerByFirebaseUID(), ${req.originalUrl}
    `);
    } catch (error) {
      console.info(`
      (500) Error: Failed to complete request to find stripe customer,  findStripeCustomerByFirebaseUID(), 
      AccountCreationElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
      ${error}
    `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }

    if (!customer.data.length) {
      console.info(`
      (200) Search Completed. No stripe customer found with firebaseUID: ${firebaseUID}
      ${req.originalUrl} ${maskEmail(email)}
    `);
      res.status(200).send({
        message: "(200) Search Completed. No customer found",
      });
      return;
    }

    /* AT THIS POINT A CUSTOMER ACCT SHOULD NOT EXIST, HOWEVER IF ONE DOES THEN WE FIND THE SUBSCRIPTION STATUS */

    stripeUID = customer.data[0].id;

    try {
      subscription = await findStripeCustomerSubscriptionInfo(stripeUID);
      console.info(`
      Promise completed: findStripeCustomerSubscriptionInfo(), ${req.originalUrl}
    `);
    } catch (error) {
      console.info(`
      (500) Error: Failed to complete request to find stripe customer subscription status stripeUID: ${stripeUID} findStripeCustomerSubscriptionInfo(), AuthElement ${req.originalUrl} ${maskEmail(email)}
      ${error}
    `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }

    /* HERE, UPDATE THE USER DOCUMENT WITH THE NEWLY DISCOVERED STRIPE ACCOUNT UID */

    if (stripeUID) {
      try {
        mongoUser = await modifyUserDocumentStripeUID(firebaseUID, stripeUID);
        console.info(`
        Promise completed: modifyUserDocumentStripeUID(), ${req.originalUrl}
      `);
      } catch (error) {
        console.info(`
        (500) Error: Failed to complete request to modify user document stripeUID: ${stripeUID} firebaseUID: ${firebaseUID}, 
        modifyUserDocumentStripeUID() AccountCreationElement ${req.originalUrl} ${maskEmail(email)}
        ${error}
      `);
        res.status(500).send({
          message: "(500) Error: An unexpected error occurred",
          error: "Internal server error",
        });
        return;
      }

      if (!mongoUser.stripeUID) {
        console.info(`
        (500) Error: Failed to modify user document stripeUID with existing stripe customer uid, firebaseUID: ${firebaseUID}, stripeUID: ${stripeUID}
        modifyUserDocumentStripeUID() AccountCreationElement ${req.originalUrl} ${maskEmail(email)}
      `);
        res.status(500).send({
          message:
            "(500) Error: Failed to modify user document with payment customer uid",
        });
        return;
      }
    }

    /* FINALLY, UPDATE THE USER DOCUMENT SUBSCRIPTION STATUS - IF ONE EXISTS */

    if (!subscription.data.length) {
      console.info(`
      (201) Stripe customer account found. Updated user document. No subscription exists.
      AccountCreationElement ${req.originalUrl}, ${maskEmail(email)}
      firebaseUID: ${firebaseUID}, stripeUID: ${stripeUID}
    `);
      res.status(201).send({
        message:
          "(201) Customer account was found. Updated user document. Subscription status is not active",
      });
      return;
    }

    currentMonth = new Date().getUTCMonth();
    subscriptionStatus = subscription.data[0].status;

    try {
      mongoUser = await modifyUserDocumentSubscriptionStatus(
        firebaseUID,
        subscriptionStatus,
        currentMonth,
      );
      console.info(`
      Promise completed: modifyUserDocumentSubscriptionStatus(), ${req.originalUrl}
    `);
    } catch (error) {
      console.info(`
      (500) Error: Failed to complete request to modify user document status with stripe acccount subscription status modifyUserDocumentSubscriptionStatus(), AccountCreationElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
      ${error}
    `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }

    if (mongoUser.status !== subscriptionStatus) {
      console.info(`
      (500) Error: Failed to modify user document status to match stripe customer subscription status modifyUserDocumentSubscriptionStatus()
        AccountCreationElement ${req.originalUrl}, ${maskEmail(email)}
        firebaseUID: ${firebaseUID}, subscriptionStatus: ${subscriptionStatus}
    `);
      res.status(500).send({
        message:
          "(500) Error: Failed to modify user document status to match payment subscription status",
      });
      return;
    }

    if (subscriptionStatus !== "active") {
      console.info(`
      (201) Stripe customer account was found. Updated user document. Subscription status is not active
      stripeUID: ${stripeUID}, status: ${subscriptionStatus}
    `);
      res.status(201).send({
        message:
          "(201) Customer account was found. Updated user document. Subscription status is not active",
      });
      return;
    }

    res.status(201).send({
      message:
        "(201) Customer account was found. Updated user document. Subscription status is active",
    });
  },
);

server.post(
  "/signup/creation/create/stripe",
  authentication,
  async (req, res) => {
    const firebaseUID = res.locals.user.uid;
    const email = res.locals.user.email;
    let customer;
    let stripeUID;
    let mongoUser;

    try {
      customer = await createStripeCustomer(firebaseUID, email);
      console.info(`
      Promise completed: createStripeCustomer(), ${req.originalUrl}
    `);
    } catch (error) {
      console.info(`
      (500) Error: Failed to complete request to create new stripe customer account, firebaseUID: ${firebaseUID}, ${maskEmail(email)}createStripeCustomer(), AccountCreationElement ${req.originalUrl}
      ${error}
    `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }

    stripeUID = customer.id;

    try {
      mongoUser = await modifyUserDocumentStripeUID(firebaseUID, stripeUID);
      console.info(`
      Promise completed: modifyUserDocumentStripeUID(), ${req.originalUrl}
    `);
    } catch (error) {
      console.info(`
      (500) Error: Failed to complete request to modify user document stripeUID: ${stripeUID} firebaseUID: ${firebaseUID}
      modifyUserDocumentStripeUID(), AccountCreationElement ${req.originalUrl} ${maskEmail(email)}
      ${error}
    `);
      res.status(500).send({
        message: "(500) Error: An unexpected error occurred",
        error: "Internal server error",
      });
      return;
    }

    if (!mongoUser.stripeUID) {
      console.info(`
      (500) Error: MongoDB failed to modify user document stripeUID with new stripe customer id, firebaseUID: ${firebaseUID}, stripeUID: ${stripeUID}
      modifyUserDocumentStripeUID() AccountCreationElement ${req.originalUrl} ${maskEmail(email)}
    `);
      res.status(500).send({
        message:
          "(500) Error: Failed to modify user document payment customer id",
      });
      return;
    }

    res.status(201).send({
      message: "(201) Account creation completed & modified successfully",
    });
  },
);

server.post("/payment/stripe/session", authentication, async (req, res) => {
  const { priceId } = req.body;
  const firebaseUID = res.locals.user.uid;
  const email = res.locals.user.email;
  let mongoUser;
  let stripeUID;
  let session;

  if (!validatePriceId(priceId)) {
    console.info(`
      (400) Critical Error: Invalid product price id, validatePriceId()
      StripeCheckoutElement ${req.originalUrl}, ${maskEmail(email)}
    `);
    res.status(400).send({
      message: "(400) Critical Error: Invalid product price id",
      code: 400,
      error: req.originalUrl,
    });
    return;
  }

  try {
    mongoUser = await findUserDocumentByFirebaseUID(firebaseUID);
    console.info(`
      Completed! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE}
    `);
  } catch (error) {
    console.info(`
      (500) error! function: findUserDocumentByFirebaseUID(), request: ${req.originalUrl}, timestamp: ${DATE} 
      ${error}
    `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
      error: "Internal server error",
    });
    return;
  }

  if (!mongoUser) {
    console.info(`
      (500) Error: No user document found to create stripe checkout session
      StripeCheckoutElement ${req.originalUrl}
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
    `);
    res.status(500).send({
      message:
        "(500) Error: No user document found during create checkout session",
    });
    return;
  }

  if (!mongoUser.stripeUID) {
    console.info(`
      (500) Error: Found user document has no stripeUID to create stripe checkout session
      firebaseUID: ${firebaseUID}, ${maskEmail(email)}
      StripeCheckoutElement ${req.originalUrl}
    `);
    res.status(500).send({
      message:
        "(500) Error: No payment customer found during create checkout session",
    });
    return;
  }

  stripeUID = mongoUser.stripeUID;

  /* STRIPE NOTE: "In scenarios where your endpoint is down or the event isn’t acknowledged properly, your handler redirects the customer to the success_url 10 seconds after a successful payment." */

  try {
    session = await createStripeCheckoutSession(stripeUID, priceId);
    console.info(`
      Promise completed: createStripeCheckoutSession(), ${req.originalUrl}
    `);
  } catch (error) {
    console.info(`
      (500) Error: Failed promise: createStripeCheckoutSession(), StripeCheckoutElement ${req.originalUrl}
      stripeUID: ${stripeUID}, ${maskEmail(email)}
      ${error}
    `);
    res.status(500).send({
      message: "(500) Error: An unexpected error occurred",
      error: "Internal server error",
    });
    return;
  }

  res.status(201).send({
    message: "(201) Successfully created a checkout session",
    url: session.url,
  });
});

server.post("/stripe/webhooks", async (req, res) => {
  const payload = req.body;
  const signature = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
  let event;

  if (!endpointSecret) {
    console.info("⚠️  STRIPE_WEBHOOK_KEY is not set. Rejecting webhook event.");
    res.status(500).send({ "Webhook Error": "Webhook not configured" });
    return;
  }

  try {
    event = await constructStripeWebhookEvent(
      payload,
      signature,
      endpointSecret,
    );
  } catch (error) {
    console.info(
      `⚠️  Webhook signature verification failed. ${error.message}`,
    );
    res.status(400).send({ "Webhook Error": "Invalid signature" });
    return;
  }

  switch (event.type) {
    /* STRIPE NOTE: "Return a successful status code (2xx) prior to any complex logic that could cause a timeout" */

    case "customer.subscription.updated":
      /* STRIPE NOTE: "subscription.status becomes "active" when the invoice has been paid" */
      let subscriptionUpdated = event.data.object;
      let subscriptionUpdatedStripeUID = subscriptionUpdated.customer;
      let subscriptionUpdatedStatus = subscriptionUpdated.status;

      res.status(200).send({ received: true });

      try {
        await webhookSubscriptionStatus(
          subscriptionUpdatedStripeUID,
          subscriptionUpdatedStatus,
        );
      } catch (error) {
        console.info(`
          (Error) Webhook event 'customer.subscription.updated' failed to modify user document status 
          stripeUID: ${subscriptionUpdatedStripeUID} status: ${subscriptionUpdatedStatus}
          ${error}
        `);
      }
      console.log(`Completed ${event} webhookSubscriptionStatus()`);
      return;

    case "customer.subscription.deleted":
      /* STRIPE NOTE: "event is sent when a customer subscription ends" */
      let subscriptionDeleted = event.data.object;
      let subscriptionDeletedStripeUID = subscriptionDeleted.customer;
      let subscriptionDeletedStatus = subscriptionDeleted.status;

      res.status(200).send({ received: true });

      try {
        await webhookSubscriptionStatus(
          subscriptionDeletedStripeUID,
          subscriptionDeletedStatus,
        );
      } catch (error) {
        console.info(`
          (Error) Webhook event 'customer.subscription.deleted' failed to modify user document status 
          stripeUID: ${subscriptionDeletedStripeUID} status: ${subscriptionDeletedStatus}
          ${error}
        `);
      }
      console.log(`Completed ${event} webhookSubscriptionStatus()`);
      return;

    case "customer.deleted":
      /* STRIPE NOTE: "trigger when a stripe customer account is deleted" */
      let customerDeletedStripeUID = event.data.object.id;

      res.status(200).send({ received: true });

      try {
        await deleteUserDocument(customerDeletedStripeUID);
        console.info(
          "Successfully deleted user document",
          customerDeletedStripeUID,
        );
      } catch (error) {
        console.info(`
          (Error) Webhook event 'customer.deleted' failed to delete user document stripeUID: ${customerDeletedStripeUID}
          ${error}
        `);
      }
      console.log(`Completed ${event} deleteUserDocument()`);
      return;

    default:
      console.info(`
        Webhook event received but no case currently exists to handle event.
        event: ${event.data.object}
      `);
      res.status(200).send({ received: true });
      break;
  }
});

server.listen(PORT, () =>
  console.log(
    `We are listening on localhost:${PORT}, NODE_ENV:"${process.env.NODE_ENV}"`,
  ),
);
