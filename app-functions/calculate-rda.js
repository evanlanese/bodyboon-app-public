/* RDA macronutrients */

export const calculateRDAofProtein = (age, kilograms, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return Math.floor(1.52 * kilograms);
    }
    if (age <= 1) {
      return Math.floor(1.2 * kilograms);
    }
    if (age <= 3) {
      return Math.floor(1.05 * kilograms);
    }
    return Math.floor(0.95 * kilograms);
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return Math.floor(0.95 * kilograms);
      }
      if (age <= 18) {
        return Math.floor(0.85 * kilograms);
      }
      return Math.floor(0.8 * kilograms);
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return Math.floor(0.95 * kilograms);
        }
        if (age <= 18) {
          return Math.floor(0.85 * kilograms);
        }
        return Math.floor(0.8 * kilograms);
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return Math.floor(1.1 * kilograms);
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return Math.floor(1.3 * kilograms);
      }
    }
  }
};

export const calculateMinCarbohydrateAMDR = (age, kcal) => {
  let amdr = (0.45 * kcal) / 4;
  return Math.floor(amdr);
};

export const calculateMaxCarbohydrateAMDR = (age, kcal) => {
  let amdr = (0.65 * kcal) / 4;
  return Math.floor(amdr);
};

export const calculateMinFatAMDR = (age, kcal) => {
  let amdr;

  if (age <= 3) {
    amdr = (0.3 * kcal) / 9;
    return Math.floor(amdr);
  }
  if (age <= 18) {
    amdr = (0.25 * kcal) / 9;
    return Math.floor(amdr);
  }
  amdr = (0.2 * kcal) / 9;
  return Math.floor(amdr);
};

export const calculateMaxFatAMDR = (age, kcal) => {
  let amdr;

  if (age <= 3) {
    amdr = (0.4 * kcal) / 9;
    return Math.floor(amdr);
  }
  if (age <= 18) {
    amdr = (0.35 * kcal) / 9;
    return Math.floor(amdr);
  }
  amdr = (0.35 * kcal) / 9;
  return Math.floor(amdr);
};

/* RDA vitamins */
export const calculateRDAofVitaminA = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 400;
    }
    if (age <= 1) {
      return 500;
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
      return 900;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 600;
        }
        return 700;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 750;
        }
        return 770;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 1200;
        }
        return 1300;
      }
    }
  }
};

export const calculateRDAofVitaminC = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 40;
    }
    if (age <= 1) {
      return 50;
    }
    if (age <= 3) {
      return 15;
    }
    return 25;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 45;
      }
      if (age <= 18) {
        return 75;
      }
      return 90;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 45;
        }
        if (age <= 18) {
          return 65;
        }
        return 75;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 80;
        }
        return 85;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 115;
        }
        return 120;
      }
    }
  }
};

export const calculateRDAofVitaminD = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 1) {
      return 10;
    }
    return 15;
  } else {
    if (gender === "male") {
      if (age <= 70) {
        return 15;
      }
      return 20;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 70) {
          return 15;
        }
        return 20;
      } else {
        return 15;
      }
    }
  }
};

export const calculateRDAofVitaminE = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 4;
    }
    if (age <= 1) {
      return 5;
    }
    if (age <= 3) {
      return 6;
    }
    return 7;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 11;
      }
      return 15;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 11;
        }
        return 15;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 15;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 19;
      }
    }
  }
};

export const calculateRDAofThiaminB1 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.2;
    }
    if (age <= 1) {
      return 0.3;
    }
    if (age <= 3) {
      return 0.5;
    }
    return 0.6;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 0.9;
      }
      return 1.2;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 0.9;
        }
        if (age <= 18) {
          return 1;
        }
        return 1.1;
      } else {
        return 1.4;
      }
    }
  }
};

export const calculateRDAofRiboflavinB2 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.3;
    }
    if (age <= 1) {
      return 0.4;
    }
    if (age <= 3) {
      return 0.5;
    }
    return 0.6;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 0.9;
      }
      return 1.3;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 0.9;
        }
        if (age <= 18) {
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
        return 1.6;
      }
    }
  }
};

export const calculateRDAofNiacinB3 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 2;
    }
    if (age <= 1) {
      return 4;
    }
    if (age <= 3) {
      return 6;
    }
    return 8;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 12;
      }
      return 16;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 12;
        }
        return 14;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 18;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 17;
      }
    }
  }
};

export const calculateRDAofPyridoxineB6 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.1;
    }
    if (age <= 1) {
      return 0.3;
    }
    if (age <= 3) {
      return 0.5;
    }
    return 0.6;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1;
      }
      if (age <= 50) {
        return 1.3;
      }
      return 1.7;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1;
        }
        if (age <= 18) {
          return 1.2;
        }
        if (age <= 50) {
          return 1.3;
        }
        return 1.5;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 1.9;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 2;
      }
    }
  }
};

export const calculateRDAofFolateB9 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 65;
    }
    if (age <= 1) {
      return 80;
    }
    if (age <= 3) {
      return 150;
    }
    return 200;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 300;
      }
      return 400;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 300;
        }
        return 400;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 600;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 500;
      }
    }
  }
};

export const calculateRDAofCobalaminB12 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.4;
    }
    if (age <= 1) {
      return 0.5;
    }
    if (age <= 3) {
      return 0.9;
    }
    return 1.2;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 1.8;
      }
      return 2.4;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 1.8;
        }
        return 2.4;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 2.6;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 2.8;
      }
    }
  }
};

/* RDA minerals */
export const calculateRDAofCalcium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 200;
    }
    if (age <= 1) {
      return 260;
    }
    if (age <= 3) {
      return 700;
    }
    return 1000;
  } else {
    if (gender === "male") {
      if (age <= 18) {
        return 1300;
      }
      if (age <= 50) {
        return 1000;
      }
      return 1200;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 1300;
        }
        if (age <= 50) {
          return 1000;
        }
        return 1200;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 1300;
        }
        return 1000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 1300;
        }
        return 1000;
      }
    }
  }
};

export const calculateRDAofIron = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.27;
    }
    if (age <= 1) {
      return 11;
    }
    if (age <= 3) {
      return 7;
    }
    return 10;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 8;
      }
      if (age <= 18) {
        return 11;
      }
      return 8;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 8;
        }
        if (age <= 18) {
          return 15;
        }
        if (age <= 50) {
          return 18;
        }
        return 8;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 27;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 10;
        }
        return 9;
      }
    }
  }
};

export const calculateRDAofMagnesium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 30;
    }
    if (age <= 1) {
      return 75;
    }
    if (age <= 3) {
      return 80;
    }
    return 130;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 240;
      }
      if (age <= 18) {
        return 410;
      }
      if (age <= 30) {
        return 400;
      }
      return 420;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 240;
        }
        if (age <= 18) {
          return 360;
        }
        if (age <= 30) {
          return 310;
        }
        return 320;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 400;
        }
        if (age <= 30) {
          return 350;
        }
        return 360;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 360;
        }
        if (age <= 18) {
          return 310;
        }
        return 320;
      }
    }
  }
};

export const calculateRDAofPhosphorus = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 100;
    }
    if (age <= 1) {
      return 275;
    }
    if (age <= 3) {
      return 460;
    }
    return 500;
  } else {
    if (gender === "male") {
      if (age <= 18) {
        return 1250;
      }
      return 700;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 1250;
        }
        return 700;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 1250;
        }
        return 700;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 1250;
        }
        return 700;
      }
    }
  }
};

export const calculateRDAofZinc = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 2;
    }
    if (age <= 3) {
      return 3;
    }
    return 5;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 8;
      }
      return 11;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 8;
        }
        if (age <= 18) {
          return 9;
        }
        return 8;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        if (age <= 18) {
          return 12;
        }
        return 11;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 13;
        }
        return 12;
      }
    }
  }
};

export const calculateRDAofCopper = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 200;
    }
    if (age <= 1) {
      return 220;
    }
    if (age <= 3) {
      return 340;
    }
    return 440;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 700;
      }
      if (age <= 18) {
        return 890;
      }
      return 900;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 700;
        }
        if (age <= 18) {
          return 890;
        }
        return 900;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 1000;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 1300;
      }
    }
  }
};

export const calculateRDAofSelenium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 15;
    }
    if (age <= 3) {
      return 20;
    }
    return 30;
  } else {
    if (gender === "male") {
      if (age <= 13) {
        return 40;
      }
      return 55;
    }

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 40;
        }
        return 55;
      }
      if (
        childing === "pregnant1st" ||
        childing === "pregnant2nd" ||
        childing === "pregnant3rd"
      ) {
        return 60;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 70;
      }
    }
  }
};

/* NO B7 CATAGORY IN FNDDS DATA
export const calculateRDAofBiotinB7 = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 5;
    }
    if (age <= 1) {
      return 6;
    }
    if (age <= 3) {
      return 8;
    }
    return 12;
  }

  else {
    if (gender === "male") {
      if (age <= 13) {
        return 20;
      }
      if (age <= 18) {
        return 25;
      }
      return 30;
    } 

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 20;
        }
        if (age <= 18) {
          return 25;
        }
        return 30;
      }
      if (childing === "pregnant1st" || childing === "pregnant2nd" || childing === "pregnant3rd") {
        return 30;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 35;
      }
    }
  }
};*/

/* NO MANGANESE CATAGORY IN FNDDS DATA
export const calculateRDAofManganese = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.003;
    }
    if (age <= 1) {
      return 0.6;
    }
    if (age <= 3) {
      return 1.2;
    }
    return 1.5;
  }

  else {
    if (gender === "male") {
      if (age <= 13) {
        return 1.9;
      }
      if (age <= 18) {
        return 2.2;
      }
      return 2.3;
    } 

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 18) {
          return 1.6;
        }
        return 1.8;
      }
      if (childing === "pregnant1st" || childing === "pregnant2nd" || childing === "pregnant3rd") {
        return 2;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        return 2.6;
      }
    }
  }
};*/

/* NO CHROMIUM CATAGORY IN FNDDS DATA
export const calculateRDAofChromium = (age, gender, childing) => {
  if (age <= 8) {
    if (age <= 0.6) {
      return 0.2;
    }

    if (age <= 1) {
      return 5.5;
    }
    if (age <= 3) {
      return 11;
    }
    return 15;
  }

  else {
    if (gender === "male") {
      if (age <= 13) {
        return 25;
      }
      if (age <= 50) {
        return 35;
      }
      return 30;
    } 

    if (gender === "female") {
      if (childing === "none") {
        if (age <= 13) {
          return 21;
        }
        if (age <= 18) {
          return 24;
        }
        if (age <= 50) {
          return 25;
        }
        return 20;
      }
      if (childing === "pregnant1st" || childing === "pregnant2nd" || childing === "pregnant3rd") {
        if (age <= 18) {
          return 29;
        }
        return 30;
      }
      if (childing === "lactating1st" || childing === "lactating2nd") {
        if (age <= 18) {
          return 44;
        }
        return 45;
      }
    }
  }
};*/
