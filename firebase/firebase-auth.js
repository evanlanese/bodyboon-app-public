import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.js";

const config = {
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(config);

export const verifyFirebaseAuthTokenId = async (accessToken) => {
  return await admin.auth().verifyIdToken(accessToken);
};

export const updateFirebaseAuthPassword = async (firebaseUID, password) => {
  return await admin.auth().updateUser(firebaseUID, { password: password });
};

/* https://cloud.google.com/identity-platform/docs/password-policy

admin.auth().projectConfigManager().updateProjectConfig({
  passwordPolicyConfig: {
    enforcementState: 'ENFORCE',
    forceUpgradeOnSignin: true,
    constraints: {
      requireUppercase: true,
      requireLowercase: true,
      requireNonAlphanumeric: true,
      requireNumeric: true,
      minLength: 12,
      maxLength: 18,
    },
  },
}); */
