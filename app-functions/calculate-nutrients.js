export const ingredientAnalysis = (fndds, ingredients) => {
  const results = {
    kcalIntake: 0,
    cholesterolIntake: 0,
    proteinIntake: 0,
    fiberIntake: 0,
    carbohydrateIntake: 0,
    lipidIntake: 0,
    saturatedIntake: 0,
    monounsaturatedIntake: 0,
    polyunsaturatedIntake: 0,
    waterIntake: 0,
    sugarIntake: 0,
    caffeineIntake: 0,
    theobromineIntake: 0,
    alcoholIntake: 0,
    vitaminAIntake: 0,
    vitaminCIntake: 0,
    vitaminKIntake: 0,
    vitaminDIntake: 0,
    vitaminEIntake: 0,
    syntheticVitaminEIntake: 0,
    vitaminB1ThiaminIntake: 0,
    vitaminB2RiboflavinIntake: 0,
    vitaminB3NiacinIntake: 0,
    vitaminB6Intake: 0,
    vitaminB9FolateIntake: 0,
    vitaminB12Intake: 0,
    cholineIntake: 0,
    calciumIntake: 0,
    ironIntakeIntake: 0,
    magnesiumIntake: 0,
    phosphorusIntake: 0,
    potassiumIntake: 0,
    sodiumIntake: 0,
    zincIntake: 0,
    copperIntake: 0,
    seleniumIntake: 0,
    caroteneBetaIntake: 0,
    caroteneAlphaIntake: 0,
    cryptoxanthinBetaIntake: 0,
    lycopeneIntake: 0,
    lutein_zeaxanthinIntake: 0,
  };

  let pufa225 = 0;
  let pufa226 = 0;
  let pufa182 = 0;
  let pufa204 = 0;
  let pufa183 = 0;
  let pufa205 = 0;

  ingredients.forEach((ingredient) => {
    fndds.default.find((food) => {
      if (food.description == ingredient.description) {
        food.foodNutrients.forEach((nutrient) => {
          ingredient.details.forEach((item) => {
            /* nutrient.amount is based on 100g portions so divide totalWeight by 100 */
            if (nutrient.name === "Energy") {
              results["kcalIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // kcal
            }
            if (nutrient.name === "Cholesterol") {
              results["cholesterolIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Protein") {
              results["proteinIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Fiber, total dietary") {
              results["fiberIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Carbohydrate, by difference") {
              results["carbohydrateIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Total lipid (fat)") {
              results["lipidIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Fatty acids, total saturated") {
              results["saturatedIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Fatty acids, total monounsaturated") {
              results["monounsaturatedIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Fatty acids, total polyunsaturated") {
              results["polyunsaturatedIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Water") {
              results["waterIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Sugars, total including NLEA") {
              results["sugarIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Caffeine") {
              results["caffeineIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Theobromine") {
              results["theobromineIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Alcohol, ethyl") {
              results["alcoholIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Retinol") {
              results["vitaminAIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Vitamin C, total ascorbic acid") {
              results["vitaminCIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Vitamin K (phylloquinone)") {
              results["vitaminKIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Vitamin D (D2 + D3)") {
              results["vitaminDIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Vitamin E (alpha-tocopherol)") {
              results["vitaminEIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Vitamin E, added") {
              results["syntheticVitaminEIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Thiamin") {
              results["vitaminB1ThiaminIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Riboflavin") {
              results["vitaminB2RiboflavinIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Niacin") {
              results["vitaminB3NiacinIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Vitamin B-6") {
              results["vitaminB6Intake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Folate, total") {
              results["vitaminB9FolateIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Vitamin B-12") {
              results["vitaminB12Intake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Vitamin B-12, added") {
              results["vitaminB12Intake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Choline, total") {
              results["cholineIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // g
            }
            if (nutrient.name === "Calcium, Ca") {
              results["calciumIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Iron, Fe") {
              results["ironIntakeIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Magnesium, Mg") {
              results["magnesiumIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Phosphorus, P") {
              results["phosphorusIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Potassium, K") {
              results["potassiumIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Sodium, Na") {
              results["sodiumIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Zinc, Zn") {
              results["zincIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Copper, Cu") {
              results["copperIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // mg
            }
            if (nutrient.name === "Selenium, Se") {
              results["seleniumIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Carotene, beta") {
              results["caroteneBetaIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Carotene, alpha") {
              results["caroteneAlphaIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Cryptoxanthin, beta") {
              results["cryptoxanthinBetaIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Lycopene") {
              results["lycopeneIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "Lutein + zeaxanthin") {
              results["lutein_zeaxanthinIntake"] +=
                nutrient.amount * (item.totalWeight / 100);
              // µg
            }
            if (nutrient.name === "PUFA 22:5 n-3 (DPA)") {
              pufa225 += nutrient.amount * (item.totalWeight / 100);
            }
            if (nutrient.name === "PUFA 22:6 n-3 (DHA)") {
              pufa226 += nutrient.amount * (item.totalWeight / 100);
            }
            if (nutrient.name === "PUFA 18:2") {
              pufa182 += nutrient.amount * (item.totalWeight / 100);
            }
            if (nutrient.name === "PUFA 20:4") {
              pufa204 += nutrient.amount * (item.totalWeight / 100);
            }
            if (nutrient.name === "PUFA 18:3") {
              pufa183 += nutrient.amount * (item.totalWeight / 100);
            }
            if (nutrient.name === "PUFA 20:5 n-3 (EPA)") {
              pufa205 += nutrient.amount * (item.totalWeight / 100);
            }
            // if (nutrient.name === "MUFA 16:1") {
            //   results["mufa161"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "MUFA 18:1") {
            //   results["mufa181"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "MUFA 20:1") {
            //   results["mufa201"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "MUFA 22:1") {
            //   results["mufa221"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 4:0") {
            //   results["sfa40"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 6:0") {
            //   results["sfa60"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 8:0") {
            //   results["sfa80"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 10:0") {
            //   results["sfa100"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 12:0") {
            //   results["sfa120"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 14:0") {
            //   results["sfa140"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 16:0") {
            //   results["sfa160"] = (nutrient.amount * (item.totalWeight / 100));
            // }
            // if (nutrient.name === "SFA 18:0") {
            //   results["sfa180"] = (nutrient.amount * (item.totalWeight / 100));
            // }
          });
        });
      }
    });

    results["omega6Intake"] = pufa182 + pufa204;
    results["omega3Intake"] = pufa183 + pufa205 + pufa225 + pufa226;
  });

  for (const property in results) {
    results[property] = Number(results[property].toFixed());
  }

  return results;
};
