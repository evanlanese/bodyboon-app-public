const infantChildKcal = (age, kilograms) => {
  let baseline = 89 * kilograms - 100;

  if (age <= 0.3) {
    return Math.floor((baseline += 175));
  }
  if (age <= 0.6) {
    return Math.floor((baseline += 56));
  }
  if (age <= 1) {
    return Math.floor((baseline += 22));
  }
  if (age > 1) {
    return Math.floor((baseline += 20));
  }
};

const maleYoungerThanNineteenKcal = (activity, age, kilograms, meters) => {
  let baseline = 88.5 - 61.9 * age + activity * (26 * kilograms + 903 * meters);

  if (age <= 8) {
    return Math.floor((baseline += 20));
  }

  return Math.floor((baseline += 25));
};

const femaleYoungerThanNineteenKcal = (activity, age, kilograms, meters) => {
  let baseline =
    135.3 - 30.8 * age + activity * (10 * kilograms + 934 * meters);

  if (age <= 8) {
    return Math.floor((baseline += 20));
  }
  return Math.floor((baseline += 25));
};

const maleAdultKcal = (activity, age, kilograms, meters) => {
  let kcal = 662 - 9.53 * age + activity * (15.91 * kilograms + 539.6 * meters);
  return Math.floor(kcal);
};

const femaleAdultKcal = (activity, age, kilograms, meters) => {
  let kcal = 354 - 6.91 * age + activity * (9.36 * kilograms + 726 * meters);
  return Math.floor(kcal);
};

export const calculateKcalEER = (activity, age, gender, kilograms, meters) => {
  if (age < 3) {
    return infantChildKcal(age, kilograms);
  }

  if (age <= 18) {
    if (gender === "male") {
      return maleYoungerThanNineteenKcal(activity, age, kilograms, meters);
    }
    if (gender === "female") {
      return femaleYoungerThanNineteenKcal(activity, age, kilograms, meters);
    }
  }

  if (gender === "male") {
    return maleAdultKcal(activity, age, kilograms, meters);
  }
  if (gender === "female") {
    return femaleAdultKcal(activity, age, kilograms, meters);
  }
};

export const calculateIfChildingKcalEER = (kcal, childing) => {
  if (childing === "pregnant1st") {
    return Math.floor(kcal);
  }
  if (childing === "pregnant2nd") {
    return Math.floor((kcal += 340));
  }
  if (childing === "pregnant3rd") {
    return Math.floor((kcal += 452));
  }
  if (childing === "lactating1st") {
    return Math.floor((kcal += 500 - 170));
  }
  if (childing === "lactating2nd") {
    return Math.floor((kcal += 400 - 0));
  }
};
