export const calculateAIofWater = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.7;
    }
    if (age <= 1) {
      return 0.8;
    }
    if (age <= 3) {
      return 1.3;
    }
    return 1.7;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 2.4;
      }
      if (age <= 18) {
        return 3.3;
      }
      return 3.7;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 2.1;
        }
        if (age <= 18) {
          return 2.3;
        }
        return 2.7;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 3;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 3.8;
      }
    }
  }
};

export const calculateAIofFiber = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 19;
    }
    return 25;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 31;
      }
      if (age <= 50) {
        return 38;
      }
      return 30;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 26;
        }
        if (age <= 50) {
          return 25;
        }
        return 21;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 28;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 29;
      }
    }
  }
};

export const calculateAIofLinoleicAcid = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 4.4;
    }
    if (age <= 1) {
      return 4.6;
    }
    if (age <= 3) {
      return 7;
    }
    return 10;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 12;
      }
      if (age <= 18) {
        return 16;
      }
      if (age <= 50) {
        return 17;
      }
      return 14;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 10;
        }
        if (age <= 18) {
          return 11;
        }
        if (age <= 50) {
          return 12;
        }
        return 11;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 13;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 13;
      }
    }
  }
};

export const calculateAIofALinoleicAcid = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0.5;
    }
    if (age <= 3) {
      return 0.7;
    }
    return 0.9;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1.2;
      }
      return 1.6;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1;
        }
        return 1.1;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 1.4;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 1.3;
      }
    }
  }
};

export const calculateAIofVitaminK = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 2;
    }
    if (age <= 1) {
      return 2.5;
    }
    if (age <= 3) {
      return 30;
    }
    return 55;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 60;
      }
      if (age <= 18) {
        return 75;
      }
      return 120;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 60;
        }
        if (age <= 18) {
          return 75;
        }
        return 90;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 75;
        }
        return 90;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 75;
        }
        return 90;
      }
    }
  }
};

export const calculateAIofCholine = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 125;
    }
    if (age <= 1) {
      return 150;
    }
    if (age <= 3) {
      return 200;
    }
    return 250;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 375;
      }
      return 550;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 375;
        }
        if (age <= 18) {
          return 400;
        }
        return 425;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 450;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 550;
      }
    }
  }
};

export const calculateAIofPotassium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 400;
    }
    if (age <= 1) {
      return 860;
    }
    if (age <= 3) {
      return 2000;
    }
    return 2300;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 2500;
      }
      if (age <= 18) {
        return 3000;
      }
      return 3400;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 2300;
        }
        return 2600;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 2600;
        }
        return 2900;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 2500;
        }
        return 2800;
      }
    }
  }
};

export const calculateAIofSodium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 110;
    }
    if (age <= 1) {
      return 370;
    }
    if (age <= 3) {
      return 800;
    }
    return 1000;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1200;
      }
      return 1500;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1200;
        }
        return 1500;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 1500;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 1500;
      }
    }
  }
};
