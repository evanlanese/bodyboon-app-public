import { LitElement, html, css } from "lit";
import { convertLitersIntoCupsOfWater } from "../../../app-functions/unit-conversion.js";
import { calculatePertentageOfAchievedTarget } from "../../../app-functions/calculate-percentage.js";

export class NutrientIntakeElement extends LitElement {
  static properties = {
    nutrientTotals: { type: Array },
    recommendations: { type: Array },

    bmi: { type: Number },
    /* ESTIMATED ENERGY REQUIREMENT */
    kcalEER: { type: Number },
    /* RDA of MACRONUTRIENTS */
    RDAofProtein: { type: Number },
    minCarbohydrateAMDR: { type: Number },
    maxCarbohydrateAMDR: { type: Number },
    /* RDA of FATS */
    minFatAMDR: { type: Number },
    maxFatAMDR: { type: Number },
    AIofLinoleicAcid: { type: Number },
    AIofALinoleicAcid: { type: Number },
    /* RDA of COMMONS */
    AIofWater: { type: Number },
    cupsOfWaterRDA: { type: Number },
    AIofFiber: { type: Number },
    /* RDA of VITAMINS */
    RDAofVitaminA: { type: Number },
    RDAofVitaminC: { type: Number },
    RDAofVitaminD: { type: Number },
    RDAofVitaminE: { type: Number },
    AIofVitaminK: { type: Number },
    RDAofThiaminB1: { type: Number },
    RDAofRiboflavinB2: { type: Number },
    RDAofNiacinB3: { type: Number },
    RDAofPyridoxineB6: { type: Number },
    RDAofFolateB9: { type: Number },
    RDAofCobalaminB12: { type: Number },
    AIofCholine: { type: Number },
    /* RDA of MINERALS */
    RDAofCalcium: { type: Number },
    RDAofIron: { type: Number },
    RDAofMagnesium: { type: Number },
    RDAofPhosphorus: { type: Number },
    AIofPotassium: { type: Number },
    AIofSodium: { type: Number },
    RDAofZinc: { type: Number },
    RDAofCopper: { type: Number },
    RDAofSelenium: { type: Number },

    kcalIntake: { type: Number },
    cholesterolIntake: { type: Number },
    proteinIntake: { type: Number },
    fiberIntake: { type: Number },
    carbohydrateIntake: { type: Number },
    lipidIntake: { type: Number },
    saturatedIntake: { type: Number },
    monounsaturatedIntake: { type: Number },
    polyunsaturatedIntake: { type: Number },
    sugarIntake: { type: Number },
    caffeineIntake: { type: Number },
    theobromineIntake: { type: Number },
    alcoholIntake: { type: Number },
    vitaminAIntake: { type: Number },
    vitaminCIntake: { type: Number },
    vitaminKIntake: { type: Number },
    vitaminDIntake: { type: Number },
    vitaminEIntake: { type: Number },
    syntheticVitaminEIntake: { type: Number },
    vitaminB1ThiaminIntake: { type: Number },
    vitaminB2RiboflavinIntake: { type: Number },
    vitaminB3NiacinIntake: { type: Number },
    vitaminB6Intake: { type: Number },
    vitaminB9FolateIntake: { type: Number },
    vitaminB12Intake: { type: Number },
    cholineIntake: { type: Number },
    calciumIntake: { type: Number },
    ironIntakeIntake: { type: Number },
    magnesiumIntake: { type: Number },
    phosphorusIntake: { type: Number },
    potassiumIntake: { type: Number },
    sodiumIntake: { type: Number },
    zincIntake: { type: Number },
    copperIntake: { type: Number },
    seleniumIntake: { type: Number },
    caroteneBetaIntake: { type: Number },
    caroteneAlphaIntake: { type: Number },
    cryptoxanthinBetaIntake: { type: Number },
    lycopeneIntake: { type: Number },
    lutein_zeaxanthinIntake: { type: Number },
    // mufa161: { type: Number },
    // mufa181: { type: Number },
    // mufa201: { type: Number },
    // mufa221: { type: Number },
    // sfa40: { type: Number },
    // sfa60: { type: Number },
    // sfa80: { type: Number },
    // sfa100: { type: Number },
    // sfa120: { type: Number },
    // sfa140: { type: Number },
    // sfa160: { type: Number },
    // sfa180: { type: Number },
    omega6Intake: { type: Number },
    omega3Intake: { type: Number },
    litersOfWater: { type: Number },
    netCarbs: { type: Number },
    cupsOfWaterInLiters: { type: Number },

    kcalPercentage: { type: Number },
    proteinPercentage: { type: Number },
    fiberPercentage: { type: Number },
    carbohydratePercentage: { type: Number },
    lipidPercentage: { type: Number },
    waterPercentage: { type: Number },
    vitaminAPercentage: { type: Number },
    vitaminCPercentage: { type: Number },
    vitaminKPercentage: { type: Number },
    vitaminDPercentage: { type: Number },
    vitaminEPercentage: { type: Number },
    vitaminB1Percentage: { type: Number },
    vitaminB2Percentage: { type: Number },
    vitaminB3Percentage: { type: Number },
    vitaminB6Percentage: { type: Number },
    vitaminB9Percentage: { type: Number },
    vitaminB12Percentage: { type: Number },
    cholinePercentage: { type: Number },
    calciumPercentage: { type: Number },
    ironPercentage: { type: Number },
    magnesiumPercentage: { type: Number },
    phosphorusPercentage: { type: Number },
    potassiumPercentage: { type: Number },
    sodiumPercentage: { type: Number },
    zincPercentage: { type: Number },
    copperPercentage: { type: Number },
    seleniumPercentage: { type: Number },
    omega6Percentage: { type: Number },
    omega3Percentage: { type: Number },
  };

  constructor() {
    super();
    this.nutrientTotals = [];
    this.recommendations = [];

    this.bmi = 0;
    /* ESTIMATED ENERGY REQUIREMENT */
    this.kcalEER = 0; // kcal
    /* RDA of MACRONUTRIENTS */
    this.RDAofProtein = 0; // g
    this.minCarbohydrateAMDR = 0; // g
    this.maxCarbohydrateAMDR = 0; // g
    /* RDA of FATS */
    this.minFatAMDR = 0; // g
    this.maxFatAMDR = 0; // g
    this.AIofLinoleicAcid = 0; // g
    this.AIofALinoleicAcid = 0; // g
    /* RDA of COMMONS */
    this.AIofWater = 0; // L
    this.cupsOfWaterRDA = 0; // L
    this.AIofFiber = 0; // g
    /* RDA of VITAMINS */
    this.RDAofVitaminA = 0; // µg
    this.RDAofVitaminC = 0; // mg
    this.RDAofVitaminD = 0; // µg
    this.RDAofVitaminE = 0; // mg
    this.AIofVitaminK = 0; // µg
    this.RDAofThiaminB1 = 0; // mg
    this.RDAofRiboflavinB2 = 0; // mg
    this.RDAofNiacinB3 = 0; // mg
    this.RDAofPyridoxineB6 = 0; // mg
    this.RDAofFolateB9 = 0; // µg
    this.RDAofCobalaminB12 = 0; // µg
    this.AIofCholine = 0; // mg
    /* RDA of MINERALS */
    this.RDAofCalcium = 0; // mg
    this.RDAofIron = 0; // µg
    this.RDAofMagnesium = 0; // mg
    this.RDAofPhosphorus = 0; // mg
    this.AIofPotassium = 0; // mg
    this.AIofSodium = 0; // mg
    this.RDAofZinc = 0; // mg
    this.RDAofCopper = 0; // µg
    this.RDAofSelenium = 0; // µg

    this.kcalIntake = 0; // kcal
    this.cholesterolIntake = 0; // mg
    this.proteinIntake = 0; // g
    this.fiberIntake = 0; // g
    this.carbohydrateIntake = 0; // g
    this.lipidIntake = 0; // g
    this.saturatedIntake = 0; // g
    this.monounsaturatedIntake = 0; // g
    this.polyunsaturatedIntake = 0; // g
    this.sugarIntake = 0; // g
    this.caffeineIntake = 0; // mg
    this.theobromineIntake = 0; // mg
    this.alcoholIntake = 0; // g
    this.vitaminAIntake = 0; // mcg
    this.vitaminCIntake = 0; // mg
    this.vitaminKIntake = 0; // mcg
    this.vitaminDIntake = 0; // mcg
    this.vitaminEIntake = 0; // mg
    this.syntheticVitaminEIntake = 0; // mg
    this.vitaminB1ThiaminIntake = 0; // mg
    this.vitaminB2RiboflavinIntake = 0; // mcg
    this.vitaminB3NiacinIntake = 0; // mg
    this.vitaminB6Intake = 0; // mg
    this.vitaminB9FolateIntake = 0; // mcg
    this.vitaminB12Intake = 0; // mcg
    this.cholineIntake = 0; // mg
    this.calciumIntake = 0; // mg
    this.ironIntakeIntake = 0; // mg
    this.magnesiumIntake = 0; // mg
    this.phosphorusIntake = 0; // mg
    this.potassiumIntake = 0; // mg
    this.sodiumIntake = 0; // mg
    this.zincIntake = 0; // mg
    this.copperIntake = 0; // mg
    this.seleniumIntake = 0; // mcg
    this.caroteneBetaIntake = 0; // mcg
    this.caroteneAlphaIntake = 0; // mcg
    this.cryptoxanthinBetaIntake = 0; // mcg
    this.lycopeneIntake = 0; // mcg
    this.lutein_zeaxanthinIntake = 0; // mcg
    // this.mufa161 = 0;
    // this.mufa181 = 0;
    // this.mufa201 = 0;
    // this.mufa221 = 0;
    // this.sfa40 = 0;
    // this.sfa60 = 0;
    // this.sfa80 = 0;
    // this.sfa100 = 0;
    // this.sfa120 = 0;
    // this.sfa140 = 0;
    // this.sfa160 = 0;
    // this.sfa180 = 0;
    this.omega6Intake = 0; // g
    this.omega3Intake = 0; // g
    this.litersOfWater = 0; // L
    this.netCarbs = 0; // g
    this.cupsOfWaterInLiters = 0;

    this.kcalPercentage = 0;
    this.proteinPercentage = 0;
    this.fiberPercentage = 0;
    this.carbohydratePercentage = 0;
    this.lipidPercentage = 0;
    this.waterPercentage = 0;
    this.vitaminAPercentage = 0;
    this.vitaminCPercentage = 0;
    this.vitaminKPercentage = 0;
    this.vitaminDPercentage = 0;
    this.vitaminEPercentage = 0;
    this.vitaminB1Percentage = 0;
    this.vitaminB2Percentage = 0;
    this.vitaminB3Percentage = 0;
    this.vitaminB6Percentage = 0;
    this.vitaminB9Percentage = 0;
    this.vitaminB12Percentage = 0;
    this.cholinePercentage = 0;
    this.calciumPercentage = 0;
    this.ironPercentage = 0;
    this.magnesiumPercentage = 0;
    this.phosphorusPercentage = 0;
    this.potassiumPercentage = 0;
    this.sodiumPercentage = 0;
    this.zincPercentage = 0;
    this.copperPercentage = 0;
    this.seleniumPercentage = 0;
    this.omega6Percentage = 0;
    this.omega3Percentage = 0;
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has("recommendations")) {
      if (!this.recommendations) {
        return;
      }

      const {
        bmi,
        kcalEER,
        RDAofProtein,
        minCarbohydrateAMDR,
        maxCarbohydrateAMDR,
        minFatAMDR,
        maxFatAMDR,
        RDAofVitaminA,
        RDAofVitaminC,
        RDAofVitaminD,
        RDAofVitaminE,
        RDAofThiaminB1,
        RDAofRiboflavinB2,
        RDAofNiacinB3,
        RDAofPyridoxineB6,
        RDAofFolateB9,
        RDAofCobalaminB12,
        RDAofCalcium,
        RDAofIron,
        RDAofMagnesium,
        RDAofPhosphorus,
        RDAofZinc,
        RDAofCopper,
        RDAofSelenium,
        AIofWater,
        AIofFiber,
        AIofLinoleicAcid,
        AIofALinoleicAcid,
        AIofVitaminK,
        AIofCholine,
        AIofPotassium,
        AIofSodium,
      } = this.recommendations[0];

      this.bmi = bmi;
      this.kcalEER = kcalEER;
      this.RDAofProtein = RDAofProtein;
      this.minCarbohydrateAMDR = minCarbohydrateAMDR;
      this.maxCarbohydrateAMDR = maxCarbohydrateAMDR;
      this.minFatAMDR = minFatAMDR;
      this.maxFatAMDR = maxFatAMDR;
      this.RDAofVitaminA = RDAofVitaminA;
      this.RDAofVitaminC = RDAofVitaminC;
      this.RDAofVitaminD = RDAofVitaminD;
      this.RDAofVitaminE = RDAofVitaminE;
      this.RDAofThiaminB1 = RDAofThiaminB1;
      this.RDAofRiboflavinB2 = RDAofRiboflavinB2;
      this.RDAofNiacinB3 = RDAofNiacinB3;
      this.RDAofPyridoxineB6 = RDAofPyridoxineB6;
      this.RDAofFolateB9 = RDAofFolateB9;
      this.RDAofCobalaminB12 = RDAofCobalaminB12;
      this.RDAofCalcium = RDAofCalcium;
      this.RDAofIron = RDAofIron;
      this.RDAofMagnesium = RDAofMagnesium;
      this.RDAofPhosphorus = RDAofPhosphorus;
      this.RDAofZinc = RDAofZinc;
      this.RDAofCopper = RDAofCopper;
      this.RDAofSelenium = RDAofSelenium;
      this.AIofWater = AIofWater;
      this.AIofFiber = AIofFiber;
      this.AIofLinoleicAcid = AIofLinoleicAcid;
      this.AIofALinoleicAcid = AIofALinoleicAcid;
      this.AIofVitaminK = AIofVitaminK;
      this.AIofCholine = AIofCholine;
      this.AIofPotassium = AIofPotassium;
      this.AIofSodium = AIofSodium;
    }

    if (!this.nutrientTotals || !this.recommendations) {
      return;
    } else {
      if (this.nutrientTotals.length && this.recommendations.length) {
        const {
          kcalIntake,
          proteinIntake,
          fiberIntake,
          carbohydrateIntake,
          lipidIntake,
          vitaminAIntake,
          vitaminCIntake,
          vitaminKIntake,
          vitaminDIntake,
          vitaminEIntake,
          vitaminB1ThiaminIntake,
          vitaminB2RiboflavinIntake,
          vitaminB3NiacinIntake,
          vitaminB6Intake,
          vitaminB9FolateIntake,
          vitaminB12Intake,
          cholineIntake,
          calciumIntake,
          ironIntakeIntake,
          magnesiumIntake,
          phosphorusIntake,
          potassiumIntake,
          sodiumIntake,
          zincIntake,
          copperIntake,
          seleniumIntake,
          omega6Intake,
          omega3Intake,
          litersOfWater,
        } = this.nutrientTotals[0];

        const {
          kcalEER,
          RDAofProtein,
          minCarbohydrateAMDR,
          minFatAMDR,
          RDAofVitaminA,
          RDAofVitaminC,
          RDAofVitaminD,
          RDAofVitaminE,
          RDAofThiaminB1,
          RDAofRiboflavinB2,
          RDAofNiacinB3,
          RDAofPyridoxineB6,
          RDAofFolateB9,
          RDAofCobalaminB12,
          RDAofCalcium,
          RDAofIron,
          RDAofMagnesium,
          RDAofPhosphorus,
          RDAofZinc,
          RDAofCopper,
          RDAofSelenium,
          AIofWater,
          AIofFiber,
          AIofLinoleicAcid,
          AIofALinoleicAcid,
          AIofVitaminK,
          AIofCholine,
          AIofPotassium,
          AIofSodium,
        } = this.recommendations[0];

        this.kcalPercentage = calculatePertentageOfAchievedTarget(
          kcalIntake,
          kcalEER,
        );
        this.proteinPercentage = calculatePertentageOfAchievedTarget(
          proteinIntake,
          RDAofProtein,
        );
        this.fiberPercentage = calculatePertentageOfAchievedTarget(
          fiberIntake,
          AIofFiber,
        );
        this.carbohydratePercentage = calculatePertentageOfAchievedTarget(
          carbohydrateIntake,
          minCarbohydrateAMDR,
        );
        this.lipidPercentage = calculatePertentageOfAchievedTarget(
          lipidIntake,
          minFatAMDR,
        );
        this.waterPercentage = calculatePertentageOfAchievedTarget(
          litersOfWater,
          AIofWater,
        );
        this.vitaminAPercentage = calculatePertentageOfAchievedTarget(
          vitaminAIntake,
          RDAofVitaminA,
        );
        this.vitaminCPercentage = calculatePertentageOfAchievedTarget(
          vitaminCIntake,
          RDAofVitaminC,
        );
        this.vitaminKPercentage = calculatePertentageOfAchievedTarget(
          vitaminKIntake,
          AIofVitaminK,
        );
        this.vitaminDPercentage = calculatePertentageOfAchievedTarget(
          vitaminDIntake,
          RDAofVitaminD,
        );
        this.vitaminEPercentage = calculatePertentageOfAchievedTarget(
          vitaminEIntake,
          RDAofVitaminE,
        );
        this.vitaminB1Percentage = calculatePertentageOfAchievedTarget(
          vitaminB1ThiaminIntake,
          RDAofThiaminB1,
        );
        this.vitaminB2Percentage = calculatePertentageOfAchievedTarget(
          vitaminB2RiboflavinIntake,
          RDAofRiboflavinB2,
        );
        this.vitaminB3Percentage = calculatePertentageOfAchievedTarget(
          vitaminB3NiacinIntake,
          RDAofNiacinB3,
        );
        this.vitaminB6Percentage = calculatePertentageOfAchievedTarget(
          vitaminB6Intake,
          RDAofPyridoxineB6,
        );
        this.vitaminB9Percentage = calculatePertentageOfAchievedTarget(
          vitaminB9FolateIntake,
          RDAofFolateB9,
        );
        this.vitaminB12Percentage = calculatePertentageOfAchievedTarget(
          vitaminB12Intake,
          RDAofCobalaminB12,
        );
        this.cholinePercentage = calculatePertentageOfAchievedTarget(
          cholineIntake,
          AIofCholine,
        );
        this.calciumPercentage = calculatePertentageOfAchievedTarget(
          calciumIntake,
          RDAofCalcium,
        );
        this.ironPercentage = calculatePertentageOfAchievedTarget(
          ironIntakeIntake,
          RDAofIron,
        );
        this.magnesiumPercentage = calculatePertentageOfAchievedTarget(
          magnesiumIntake,
          RDAofMagnesium,
        );
        this.phosphorusPercentage = calculatePertentageOfAchievedTarget(
          phosphorusIntake,
          RDAofPhosphorus,
        );
        this.potassiumPercentage = calculatePertentageOfAchievedTarget(
          potassiumIntake,
          AIofPotassium,
        );
        this.sodiumPercentage = calculatePertentageOfAchievedTarget(
          sodiumIntake,
          AIofSodium,
        );
        this.zincPercentage = calculatePertentageOfAchievedTarget(
          zincIntake,
          RDAofZinc,
        );
        this.copperPercentage = calculatePertentageOfAchievedTarget(
          copperIntake,
          RDAofCopper,
        );
        this.seleniumPercentage = calculatePertentageOfAchievedTarget(
          seleniumIntake,
          RDAofSelenium,
        );
        this.omega6Percentage = calculatePertentageOfAchievedTarget(
          omega6Intake,
          AIofLinoleicAcid,
        );
        this.omega3Percentage = calculatePertentageOfAchievedTarget(
          omega3Intake,
          AIofALinoleicAcid,
        );
        this.cupsOfWaterInLiters = convertLitersIntoCupsOfWater(this.AIofWater);
      }
    }

    if (changedProperties.has("nutrientTotals")) {
      if (!this.nutrientTotals) {
        return;
      }

      const {
        kcalIntake,
        cholesterolIntake,
        proteinIntake,
        fiberIntake,
        carbohydrateIntake,
        lipidIntake,
        saturatedIntake,
        monounsaturatedIntake,
        polyunsaturatedIntake,
        sugarIntake,
        caffeineIntake,
        theobromineIntake,
        alcoholIntake,
        vitaminAIntake,
        vitaminCIntake,
        vitaminKIntake,
        vitaminDIntake,
        vitaminEIntake,
        syntheticVitaminEIntake,
        vitaminB1ThiaminIntake,
        vitaminB2RiboflavinIntake,
        vitaminB3NiacinIntake,
        vitaminB6Intake,
        vitaminB9FolateIntake,
        vitaminB12Intake,
        cholineIntake,
        calciumIntake,
        ironIntakeIntake,
        magnesiumIntake,
        phosphorusIntake,
        potassiumIntake,
        sodiumIntake,
        zincIntake,
        copperIntake,
        seleniumIntake,
        caroteneBetaIntake,
        caroteneAlphaIntake,
        cryptoxanthinBetaIntake,
        lycopeneIntake,
        lutein_zeaxanthinIntake,
        /* mufa161, mufa181, mufa201, mufa221, sfa40, sfa60, sfa80, sfa100, sfa120, sfa140, sfa160, sfa180, */ omega6Intake,
        omega3Intake,
        litersOfWater,
        netCarbs,
      } = this.nutrientTotals[0];

      this.kcalIntake = kcalIntake;
      this.cholesterolIntake = cholesterolIntake;
      this.proteinIntake = proteinIntake;
      this.fiberIntake = fiberIntake;
      this.carbohydrateIntake = carbohydrateIntake;
      this.lipidIntake = lipidIntake;
      this.saturatedIntake = saturatedIntake;
      this.monounsaturatedIntake = monounsaturatedIntake;
      this.polyunsaturatedIntake = polyunsaturatedIntake;
      this.sugarIntake = sugarIntake;
      this.caffeineIntake = caffeineIntake;
      this.theobromineIntake = theobromineIntake;
      this.alcoholIntake = alcoholIntake;
      this.vitaminAIntake = vitaminAIntake;
      this.vitaminCIntake = vitaminCIntake;
      this.vitaminKIntake = vitaminKIntake;
      this.vitaminDIntake = vitaminDIntake;
      this.vitaminEIntake = vitaminEIntake;
      this.syntheticVitaminEIntake = syntheticVitaminEIntake;
      this.vitaminB1ThiaminIntake = vitaminB1ThiaminIntake;
      this.vitaminB2RiboflavinIntake = vitaminB2RiboflavinIntake;
      this.vitaminB3NiacinIntake = vitaminB3NiacinIntake;
      this.vitaminB6Intake = vitaminB6Intake;
      this.vitaminB9FolateIntake = vitaminB9FolateIntake;
      this.vitaminB12Intake = vitaminB12Intake;
      this.cholineIntake = cholineIntake;
      this.calciumIntake = calciumIntake;
      this.ironIntakeIntake = ironIntakeIntake;
      this.magnesiumIntake = magnesiumIntake;
      this.phosphorusIntake = phosphorusIntake;
      this.potassiumIntake = potassiumIntake;
      this.sodiumIntake = sodiumIntake;
      this.zincIntake = zincIntake;
      this.copperIntake = copperIntake;
      this.seleniumIntake = seleniumIntake;
      this.caroteneBetaIntake = caroteneBetaIntake;
      this.caroteneAlphaIntake = caroteneAlphaIntake;
      this.cryptoxanthinBetaIntake = cryptoxanthinBetaIntake;
      this.lycopeneIntake = lycopeneIntake;
      this.lutein_zeaxanthinIntake = lutein_zeaxanthinIntake;
      // this.mufa161 = mufa161;
      // this.mufa181 = mufa181;
      // this.mufa201 = mufa201;
      // this.mufa221 = mufa221;
      // this.sfa40 = sfa40;
      // this.sfa60 = sfa60;
      // this.sfa80 = sfa80;
      // this.sfa100 = sfa100;
      // this.sfa120 = sfa120;
      // this.sfa140 = sfa140;
      // this.sfa160 = sfa160;
      // this.sfa180 = sfa180;
      this.omega6Intake = omega6Intake;
      this.omega3Intake = omega3Intake;
      this.litersOfWater = litersOfWater;
      this.netCarbs = netCarbs;
    }
  }

  static styles = css`
    * {
      text-rendering: optimizeLegibility;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      word-break: break-word;
      color: rgb(238, 238, 238);
    }

    section {
      padding: 20px 0;
      margin: auto;
    }
    .div-nutrient-heading-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      text-transform: uppercase;
      padding-left: 30px;
      margin-top: 15px;
    }
    .div-nutrient-heading-flex {
      display: flex;
    }
    .p-heading {
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0.7px;
    }
    .p-heading span {
      font-size: 11px;
    }

    .div-nutrient-grid-container {
      display: grid;
      grid-template-columns: 28px 1fr;
      grid-template-rows: 1fr;
      margin-top: 2px;
      border: 1px solid rgba(0, 173, 181, 0.5);
    }
    .div-vertical {
      display: flex;
      padding: 2px;
      background: rgb(34, 40, 49);
      border-right: 1px solid rgba(0, 173, 181, 0.5);
    }
    .h3-vertical {
      font-size: 17px;
      text-align: end;
      text-transform: uppercase;
      writing-mode: vertical-rl;
      text-orientation: sideways;
      transform: rotate(180deg);
      margin-top: 3px;
    }

    .div-color-band:nth-child(odd) {
      background: rgb(34, 40, 49);
    }
    .div-nutrient-grid-with-dri {
      display: grid;
      grid-template-columns: minmax(105px, 1fr) minmax(67px, 1fr) minmax(
          120px,
          1fr
        );
      grid-template-rows: 1fr;
      align-items: start;
      padding: 10px 3px;
    }
    .div-nutrient-intake {
      padding-top: 1px;
    }
    .p-nutrient-name {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .p-nutrient-name span {
      font-size: 13px;
      letter-spacing: 0.5px;
    }
    .div-amount {
      display: flex;
      gap: 1px;
      align-items: center;
      padding-top: 3px;
    }
    .p-intake-symbol {
      font-size: 10px;
    }
    .p-nutrient-intake {
      font-size: 15px;
      font-weight: 700;
    }
    .p-nutrient-intake span {
      font-size: 12px;
      font-weight: 300;
      padding-left: 1px;
    }
    .div-nutrient-goal {
      display: grid;
      grid-template-columns: 1fr 36px;
      grid-template-rows: 1fr;
      padding-top: 3px;
    }
    .div-goal {
      display: flex;
    }
    .div-symbol {
      display: flex;
      align-items: end;
    }
    .p-goal-symbol {
      color: rgb(0, 173, 181);
      font-size: 12px;
    }
    .p-nutrient-goal {
      font-size: 15px;
    }
    .p-nutrient-goal span {
      font-size: 12px;
      padding-left: 1px;
    }
    .div-percentage {
      display: flex;
      justify-content: end;
      align-items: end;
    }
    .p-nutrient-percentage {
      font-size: 14px;
      font-weight: 700;
    }
    .p-nutrient-percentage span {
      font-size: 12px;
      font-weight: 300;
      padding-left: 1px;
    }

    .div-nutrient-grid-with-text {
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: minmax(75px, 1fr) minmax(70px, 1fr) minmax(
          120px,
          1fr
        );
      grid-template-rows: 1fr;
      align-items: end;
      padding: 10px 3px;
    }
    .div-nutrient-grid-no-dri {
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: minmax(115px, 1fr) minmax(70px, 1fr) minmax(
          105px,
          1fr
        );
      grid-template-rows: 1fr;
      align-items: end;
      padding: 10px 3px;
    }
    .p-down-arrow {
      color: red;
      font-size: 11px;
      font-weight: bold;
    }
    .p-recommended-text {
      font-size: 10px;
      font-style: italic;
      text-align: end;
    }
    .p-recommended-text span {
      color: rgb(0, 173, 181);
      font-size: 11px;
      font-weight: bold;
      font-style: normal;
    }
    .p-parentheses {
      font-size: 10px;
      text-transform: uppercase;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-nutrient-heading-grid">
          <p class="p-heading">N<span>utrient</span> I<span>ntake ⤵</span></p>
          <div class="div-nutrient-heading-flex">
            <p class="p-goal-symbol">◎</p>
            <p class="p-heading">R<span>ecommended</span> G<span>oal</span></p>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Macros</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>alories</span></p>
              </div>

              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.kcalIntake}<span>kcal</span>
                </p>
              </div>

              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.kcalEER}<span>kcal</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.kcalPercentage}<span>%</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">P<span>rotein</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.proteinIntake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofProtein}<span>g</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.proteinPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>arbohydrates</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.carbohydrateIntake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.minCarbohydrateAMDR}<span>-</span>${this
                      .maxCarbohydrateAMDR}<span>g</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.carbohydratePercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Fats</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">
                  T<span>otal</span> L<span>ipids</span>
                </p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.lipidIntake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.minFatAMDR}<span>-</span>${this.maxFatAMDR}<span
                      >g</span
                    >
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.lipidPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-text div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>holesterol</span></p>
              </div>
              <div class="div-amount">
                <p class="p-down-arrow">⬇</p>
                <p class="p-nutrient-intake">
                  ${this.cholesterolIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>As low as possible while consuming a
                  nutritionally adequate diet.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-with-text div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">S<span>aturated</span></p>
              </div>
              <div class="div-amount">
                <p class="p-down-arrow">⬇</p>
                <p class="p-nutrient-intake">
                  ${this.saturatedIntake}<span>g</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>As low as possible while consuming a
                  nutritionally adequate diet.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">M<span>onounsaturated</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.monounsaturatedIntake}<span>g</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">P<span>olyunsaturated</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.polyunsaturatedIntake}<span>g</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">O<span>mega 6</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.omega6Intake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofLinoleicAcid}<span>g</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.omega6Percentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">O<span>mega 3</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.omega3Intake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofALinoleicAcid}<span>g</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.omega3Percentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Mixed</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">
                  N<span>et</span> <span>Carbs</span>
                </p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">${this.netCarbs}<span>g</span></p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-with-text div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">S<span>ugars</span></p>
              </div>
              <div class="div-amount">
                <p class="p-down-arrow">⬇</p>
                <p class="p-nutrient-intake">
                  ${this.sugarIntake}<span>g</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>As low as possible while consuming a
                  nutritionally adequate diet.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">W<span>ater</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.litersOfWater}<span>L</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.cupsOfWaterInLiters} <span>cups</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.waterPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">F<span>iber</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.fiberIntake}<span>g</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">${this.AIofFiber}<span>g</span></p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.fiberPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>affeine</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.caffeineIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">T<span>heobromine</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.theobromineIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">A<span>lcohol</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.alcoholIntake}<span>g</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Vitamins</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin A</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminAIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofVitaminA}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminAPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin C</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminCIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofVitaminC}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminCPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin D</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminDIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofVitaminD}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminDPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin E</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminEIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofVitaminE}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminEPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <div>
                  <p class="p-nutrient-name">V<span>itamin E,</span></p>
                  <p class="p-parentheses">(added, synthesized)</p>
                </div>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.syntheticVitaminEIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin K</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminKIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofVitaminK}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminKPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin B1</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB1ThiaminIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofThiaminB1}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB1Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin B2</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB2RiboflavinIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofRiboflavinB2}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB2Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin B3</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB3NiacinIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofNiacinB3}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB3Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin B6</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB6Intake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofPyridoxineB6}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB6Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <div>
                  <p class="p-nutrient-name">V<span>itamin B9,</span></p>
                  <p class="p-parentheses">(and folic acid)</p>
                </div>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB9FolateIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofFolateB9}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB9Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">V<span>itamin B12</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.vitaminB12Intake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofCobalaminB12}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.vitaminB12Percentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>holine</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.cholineIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofCholine}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.cholinePercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Minerals</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>alcium</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.calciumIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofCalcium}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.calciumPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">I<span>ron</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.ironIntakeIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofIron}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.ironPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">M<span>agnesium</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.magnesiumIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofMagnesium}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.magnesiumPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">P<span>hosphorus</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.phosphorusIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofPhosphorus}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.phosphorusPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">P<span>otassium</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.potassiumIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofPotassium}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.potassiumPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">S<span>odium</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.sodiumIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.AIofSodium}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.sodiumPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">Z<span>inc</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.zincIntake}<span>mg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofZinc}<span>mg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.zincPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>opper</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.copperIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofCopper}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">${this.copperPercentage}%</p>
                </div>
              </div>
            </div>

            <div class="div-nutrient-grid-with-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">S<span>elenium</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.seleniumIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-nutrient-goal">
                <div class="div-goal">
                  <div class="div-symbol">
                    <p class="p-goal-symbol">◎</p>
                  </div>
                  <p class="p-nutrient-goal">
                    ${this.RDAofSelenium}<span>mcg</span>
                  </p>
                </div>
                <div class="div-percentage">
                  <p class="p-nutrient-percentage">
                    ${this.seleniumPercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <h3 class="h3-vertical">Antioxidants</h3>
          </div>

          <div>
            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>arotene Beta</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.caroteneBetaIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>arotene Alpha</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.caroteneAlphaIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">C<span>ryptoxanthin Beta</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.cryptoxanthinBetaIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">L<span>ycopene</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.lycopeneIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>

            <div class="div-nutrient-grid-no-dri div-color-band">
              <div class="div-nutrient-intake">
                <p class="p-nutrient-name">L<span>utein + zeaxanthin</span></p>
              </div>
              <div class="div-amount">
                <p class="p-intake-symbol">⤵</p>
                <p class="p-nutrient-intake">
                  ${this.lutein_zeaxanthinIntake}<span>mcg</span>
                </p>
              </div>
              <div class="div-recommended-text">
                <p class="p-recommended-text">
                  <span>◎</span>No recommendation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("nutrient-intake-element", NutrientIntakeElement);
