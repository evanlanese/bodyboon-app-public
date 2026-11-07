import { MongoClient, ServerApiVersion } from "mongodb";
import { maskEmail } from "../app-functions/redact.js";

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const db = client.db(process.env.DATABASE);
const collection = db.collection(process.env.COLLECTION);

export const pingMongoAtlas = async () => {
  try {
    /* Connect the client to the server Atlas cluster (optional starting in v4.7) Note: confirms IP is on allowed-list */
    await client.connect();
    await db.command({ ping: 1 });
    console.log(`Connected to Atlas database: ${process.env.DATABASE}`);
  } catch (error) {
    console.info(`
      Error: Function failed to connect to Atlas database: ${process.env.DATABASE}, pingMongoAtlas()
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const modifyDocumentUserLog = async (firebaseUID, userLog) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $set: {
          userLog: userLog,
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document, updateUserDocumentResetLogAndStamp()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const updateUserDocumentResetLogAndStamp = async (
  firebaseUID,
  datestamp,
  recipe,
) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateMany(
      { firebaseUID: firebaseUID },
      {
        $set: {
          logDatestamp: datestamp,
          userLog: [recipe],
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document, updateUserDocumentResetLogAndStamp()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const updateUserDocumentLogAndStamp = async (
  firebaseUID,
  datestamp,
  recipe,
) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateMany(
      { firebaseUID: firebaseUID },
      {
        $set: {
          logDatestamp: datestamp,
          userLog: [recipe],
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document, updateUserDocumentLogAndStamp()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const updateUserDocumentLog = async (firebaseUID, recipe) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $push: {
          userLog: recipe,
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document, updateUserDocumentLog()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const updateUserDocumentMenu = async (firebaseUID, menu) => {
  try {
    await client.connect();
    const subscribers = collection;

    return await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $set: {
          menu: menu,
        },
        $currentDate: { lastModified: true },
      },
    );
  } catch (error) {
    console.info(`
      Error: Function failed to update user document, updateUserDocumentMenu()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const modifyUserDocumentDetailsObject = async (firebaseUID, details) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $set: {
          details: [
            {
              activity: details.activity,
              gender: details.gender,
              childing: details.childing,
              age: details.age,
              weight: details.weight,
              feet: details.feet,
              inches: details.inches,
            },
          ],
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document details, modifyUserDocumentDetailsObject()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const modifyUserDocumentSubscriptionStatus = async (firebaseUID, subscriptionStatus, currentMonth) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $set: {
          status: subscriptionStatus,
          lastChecked: currentMonth,
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document subscription status, modifyUserDocumentSubscriptionStatus()
      firebaseUID: ${firebaseUID}, subscriptionStatus: ${subscriptionStatus}, lastChecked: ${currentMonth}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const webhookSubscriptionStatus = async (stripeUID, subscriptionStatus) => {
  try {
    await client.connect();
    const subscribers = collection;

    return await subscribers.updateOne(
      { stripeUID: stripeUID },
      {
        $set: {
          status: subscriptionStatus,
        },
        $currentDate: { lastModified: true },
      },
    );
  } catch (error) {
    console.info(`
      Error: Function failed to update user document subscription status, webhookSubscriptionStatus()
      stripeUID: ${stripeUID}, subscriptionStatus: ${subscriptionStatus}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const modifyUserDocumentStripeUID = async (firebaseUID, stripeUID) => {
  try {
    await client.connect();
    const subscribers = collection;

    await subscribers.updateOne(
      { firebaseUID: firebaseUID },
      {
        $set: {
          stripeUID: stripeUID,
        },
        $currentDate: { lastModified: true },
      },
    );

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to update user document stripeUID, modifyUserDocumentStripeUID()
      stripeUID: ${stripeUID}, firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const findUserDocumentByFirebaseUID = async (firebaseUID) => {
  try {
    await client.connect();
    const subscribers = collection;

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to find user document, findUserDocumentByFirebaseUID()
      firebaseUID: ${firebaseUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const createNewUserDocument = async (firebaseUID, email) => {
  try {
    await client.connect();
    const subscribers = collection;

    const customer = {
      firebaseUID: firebaseUID,
      email: email,
      stripeUID: null,
      status: null,
      lastChecked: -1,
      details: [],
      menu: [],
      logDatestamp: null,
      userLog: [],
    };

    await subscribers.insertOne(customer);

    const filter = { firebaseUID: firebaseUID };
    return await subscribers.findOne(filter);
  } catch (error) {
    console.info(`
      Error: Function failed to create user document, createNewUserDocument()
      firebaseUID: ${firebaseUID}, email: ${maskEmail(email)}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};

export const deleteUserDocument = async (stripeUID) => {
  try {
    await client.connect();
    const subscribers = collection;

    return await subscribers.deleteOne({ stripeUID: stripeUID });
  } catch (error) {
    console.info(`
      Error: Function failed to delete user document, deleteUserDocument()
      stripeUID: ${stripeUID}
      ${error.stack}
    `);
  } finally {
    await client.close();
  }
};
