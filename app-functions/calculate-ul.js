/* UL vitamins */
export const calculateULVitaminA = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 3) {
      return 600;
    }
    return 900;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1700;
      }
      if (age <= 18) {
        return 2800;
      }
      return 3000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1700;
        }
        if (age <= 18) {
          return 2800;
        }
        return 3000;
      }

      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 2800;
        }
        return 3000;
      }

      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 2800;
        }
        return 3000;
      }
    }
  }
};

export const calculateULVitaminC = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 400;
    }
    return 650;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1200;
      }
      if (age <= 18) {
        return 1800;
      }
      return 2000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1200;
        }
        if (age <= 18) {
          return 1800;
        }
        return 2000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 1800;
        }
        return 2000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 1800;
        }
        return 2000;
      }
    }
  }
};

export const calculateULVitaminD = (age, gender) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 25;
    }
    if (age <= 1) {
      return 38;
    }
    if (age <= 3) {
      return 63;
    }
    return 75;
  } else {
    if (gender === "male") {
      return 100;
    }

    if (gender === "female") {
      return 100;
    }
  }
};

export const calculateULVitaminE = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 200;
    }
    return 300;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 600;
      }
      if (age <= 18) {
        return 800;
      }
      return 1000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 600;
        }
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
    }
  }
};

export const calculateULVitaminK = () => {
  return 0;
};

export const calculateULThiaminB1 = () => {
  return 0;
};

export const calculateULRiboflavinB2 = () => {
  return 0;
};

export const calculateULNiacinB3 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 10;
    }
    return 15;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 20;
      }
      if (age <= 18) {
        return 30;
      }
      return 35;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 20;
        }
        if (age <= 18) {
          return 30;
        }
        return 35;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 30;
        }
        return 35;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 30;
        }
        return 35;
      }
    }
  }
};

export const calculateULPyridoxineB6 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 30;
    }
    return 40;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 60;
      }
      if (age <= 18) {
        return 80;
      }
      return 100;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 60;
        }
        if (age <= 18) {
          return 80;
        }
        return 100;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 80;
        }
        return 100;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 80;
        }
        return 100;
      }
    }
  }
};

export const calculateULBiotinB7 = () => {
  return 0;
};

export const calculateULFolateB9 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 300;
    }
    return 400;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 600;
      }
      if (age <= 18) {
        return 800;
      }
      return 1000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 600;
        }
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 800;
        }
        return 1000;
      }
    }
  }
};

export const calculateULCobalaminB12 = () => {
  return 0;
};

export const calculateULCholine = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    return 1000;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 2000;
      }
      if (age <= 18) {
        return 3000;
      }
      return 3500;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 2000;
        }
        if (age <= 18) {
          return 3000;
        }
        return 3500;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 3000;
        }
        return 3500;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 3000;
        }
        return 3500;
      }
    }
  }
};

/* UL minerals */
export const calculateULCalcium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 1000;
    }
    if (age <= 1) {
      return 1500;
    }
    return 2500;
  } else {
    if (gender === "male") {
      if (age <= 18) {
        return 3000;
      }
      if (age <= 50) {
        return 2500;
      }
      return 2000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 3000;
        }
        if (age <= 50) {
          return 2500;
        }
        return 2000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 3000;
        }
        return 2500;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 3000;
        }
        return 2500;
      }
    }
  }
};

export const calculateULIron = (age, gender, childing) => {
  if (age <= 8) {
    return 40;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 40;
      }
      return 45;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 40;
        }
        return 45;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 45;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 45;
      }
    }
  }
};

export const calculateULMagnesium = (age, gender) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 65;
    }
    return 110;
  } else {
    if (gender === "male") {
      return 350;
    }

    if (gender === "female") {
      return 350;
    }
  }
};

export const calculateULPhosphorus = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    return 3000;
  } else {
    if (gender === "male") {
      if (age <= 70) {
        return 4000;
      }
      return 3000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 70) {
          return 4000;
        }
        return 3000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 3500;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 4000;
      }
    }
  }
};

export const calculateULPotassium = () => {
  return 0;
};

export const calculateULSodium = () => {
  return 0;
};

export const calculateULZinc = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 4;
    }
    if (age <= 1) {
      return 5;
    }
    if (age <= 3) {
      return 7;
    }
    return 12;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 23;
      }
      if (age <= 18) {
        return 34;
      }
      return 40;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 23;
        }
        if (age <= 18) {
          return 34;
        }
        return 40;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 34;
        }
        return 40;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 34;
        }
        return 40;
      }
    }
  }
};

export const calculateULCopper = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 1000;
    }
    return 3000;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 5000;
      }
      if (age <= 18) {
        return 8000;
      }
      return 10000;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 5000;
        }
        if (age <= 18) {
          return 8000;
        }
        return 10000;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 8000;
        }
        return 10000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 8000;
        }
        return 10000;
      }
    }
  }
};

export const calculateULManganese = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 0;
    }
    if (age <= 3) {
      return 2;
    }
    return 3;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 6;
      }
      if (age <= 18) {
        return 9;
      }
      return 11;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 6;
        }
        if (age <= 18) {
          return 9;
        }
        return 11;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 9;
        }
        return 11;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 9;
        }
        return 11;
      }
    }
  }
};

export const calculateULSelenium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 45;
    }
    if (age <= 1) {
      return 60;
    }
    if (age <= 3) {
      return 90;
    }
    return 150;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 280;
      }
      return 400;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 280;
        }
        return 400;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 400;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 400;
      }
    }
  }
};

export const calculateULChromium = () => {
  return 0;
};
