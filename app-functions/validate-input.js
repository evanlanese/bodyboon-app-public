export const confirmPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
}; // GOOD ✓

/* Mirrors the Firebase password policy enforced on the client */
export const validatePasswordPolicy = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 12 &&
    password.length <= 18 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

export const validateString = (value, maxLength = 256) => {
  return typeof value === "string" && value.length <= maxLength;
};

export const validatePriceId = (priceId) => {
  if (
    priceId === process.env.ANNUAL_PRICE_ID ||
    priceId === process.env.MONTHLY_PRICE_ID
  ) {
    return true;
  }
  return false;
}; // GOOD ✓

export const validateDisplayName = (displayName) => {
  return (
    typeof displayName === "string" &&
    displayName.length >= 3 &&
    displayName.length <= 32
  );
}; // GOOD ✓

export const validateDetailsObjectLength = (details) => {
  return (
    details !== null &&
    typeof details === "object" &&
    !Array.isArray(details) &&
    Object.keys(details).length === 7
  );
}; // GOOD ✓

export const validateDetailsKeys = (details, keys) => {
  return Object.keys(details).every((key) => keys.includes(key));
}; // GOOD ✓

export const validateActivityLevel = (activity) => {
  return (
    activity === "sedentary" ||
    activity === "low" ||
    activity === "active" ||
    activity === "very"
  );
}; // GOOD ✓

export const validateGender = (gender) => {
  return gender === "male" || gender === "female";
}; // GOOD ✓

export const validateChilding = (childing) => {
  return (
    childing === "none" ||
    childing === "pregnant1st" ||
    childing === "pregnant2nd" ||
    childing === "pregnant3rd" ||
    childing === "lactating1st" ||
    childing === "lactating2nd"
  );
}; // GOOD ✓

export const validateAge = (age) => {
  if (typeof age !== "number" || !Number.isFinite(age)) {
    return false;
  }

  if (age.toString().length > 3) {
    return false;
  }

  if (Number.isInteger(age)) {
    return age > 0 && age <= 140;
  } else {
    age = Number(age.toFixed(1));
    return age > 0 && age <= 140;
  }
}; // GOOD ✓

export const floorAge = (age) => {
  if (age < 3) {
    return Number(age.toFixed(1));
  }

  return Number(age.toFixed(0));
}; // GOOD ✓

export const validateWeight = (weight) => {
  if (typeof weight !== "number" || !Number.isFinite(weight)) {
    return false;
  }

  if (weight.toString().length > 3) {
    return false;
  }

  weight = Number(weight.toFixed(0));
  return weight > 0 && weight <= 999;
}; // GOOD ✓

export const validateFeet = (feet) => {
  if (typeof feet !== "number" || !Number.isFinite(feet)) {
    return false;
  }

  if (feet.toString().length > 2) {
    return false;
  }

  feet = Number(feet.toFixed(0));
  return feet > 0 && feet <= 10;
}; // GOOD ✓

export const validateInches = (inches) => {
  if (typeof inches !== "number" || !Number.isFinite(inches)) {
    return false;
  }

  if (inches.toString().length > 2) {
    return false;
  }

  inches = Number(inches.toFixed(0));
  return inches >= 0 && inches <= 11;
}; // GOOD ✓

export const validateArrayWithLength = (array) => {
  if (Array.isArray(array) && array.length) {
    return true;
  }
  return false;
};
