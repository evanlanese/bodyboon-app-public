export const convertToLiters = (amount) => {
  return Number((amount / 1000).toFixed(2));
};

export const convertGramsIntoCupsOfWater = (grams) => {
  return Math.floor(grams / 238);
};

export const convertLitersIntoCupsOfWater = (liters) => {
  return Number((liters * 4.22675).toFixed());
};

export const calculateNetCarbs = (carbs, fiber) => {
  return Math.round(carbs - fiber);
};

export const convertActivity = (age, gender, activity) => {
  if (gender === "male") {
    if (age <= 18) {
      if (activity === "sedentary") return (activity = 1);
      if (activity === "low") return (activity = 1.13);
      if (activity === "active") return (activity = 1.26);
      if (activity === "very") return (activity = 1.42);
    } else {
      if (activity === "sedentary") return (activity = 1);
      if (activity === "low") return (activity = 1.11);
      if (activity === "active") return (activity = 1.25);
      if (activity === "very") return (activity = 1.48);
    }
  }
  if (gender === "female") {
    if (age <= 18) {
      if (activity === "sedentary") return (activity = 1);
      if (activity === "low") return (activity = 1.16);
      if (activity === "active") return (activity = 1.31);
      if (activity === "very") return (activity = 1.56);
    } else {
      if (activity === "sedentary") return (activity = 1);
      if (activity === "low") return (activity = 1.12);
      if (activity === "active") return (activity = 1.27);
      if (activity === "very") return (activity = 1.45);
    }
  }
};

export const convertPoundsToKilograms = (lbs) => {
  return Math.floor(lbs * 0.453592);
};

export const convertHeightToMeters = (feet, inches) => {
  let height = (feet * 30.48 + inches * 2.54) * 0.01;
  height = height.toFixed(3);
  return Number(height);
};
