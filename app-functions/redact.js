import { createHmac, randomBytes } from "crypto";

/* Key for pseudonymizing PII in server logs. Set LOG_HASH_SECRET to keep IDs stable across restarts. */
const LOG_HASH_SECRET = process.env.LOG_HASH_SECRET || randomBytes(32).toString("hex");

/* Replaces an email with a stable, non-reversible ID so logs can be correlated without storing the address */
export const maskEmail = (email) => {
  if (typeof email !== "string" || !email) {
    return "user_unknown";
  }

  const digest = createHmac("sha256", LOG_HASH_SECRET)
    .update(email.trim().toLowerCase())
    .digest("hex");

  return `user_${digest.slice(0, 12)}`;
};
