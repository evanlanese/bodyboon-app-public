import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { analysisContext } from "../../app-functions/context.js";

export class AnalysisElement extends LitElement {
  static properties = {
    category: { type: String },
    recipeName: { type: String },
    kcalIntake: { type: Number },
    cholesterolIntake: { type: Number },
    proteinIntake: { type: Number },
    fiberIntake: { type: Number },
    carbohydrateIntake: { type: Number },
    lipidIntake: { type: Number },
    saturatedIntake: { type: Number },
    monounsaturatedIntake: { type: Number },
    polyunsaturatedIntake: { type: Number },
    waterIntake: { type: Number },
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
    cupsOfWater: { type: Number },
    netCarbs: { type: Number },
  };

  constructor() {
    super();
    this.analysisConsumer = new ContextConsumer(this, {
      context: analysisContext,
      subscribe: true,
    });

    this.category = "";
    this.recipeName = "";
    this.kcalIntake = 0; // kcal
    this.cholesterolIntake = 0; // mg
    this.proteinIntake = 0; // g
    this.fiberIntake = 0; // g
    this.carbohydrateIntake = 0; // g
    this.lipidIntake = 0; // g
    this.saturatedIntake = 0; // g
    this.monounsaturatedIntake = 0; // g
    this.polyunsaturatedIntake = 0; // g
    this.waterIntake = 0; // g
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
    this.cupsOfWater = 0;
    this.netCarbs = 0; // g
  }

  async willUpdate() {
    if (this.analysisConsumer.value) {
      const {
        category,
        recipeName,
        kcalIntake,
        cholesterolIntake,
        proteinIntake,
        fiberIntake,
        carbohydrateIntake,
        lipidIntake,
        saturatedIntake,
        monounsaturatedIntake,
        polyunsaturatedIntake,
        waterIntake,
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
        cupsOfWater,
        netCarbs,
      } = this.analysisConsumer.value;

      this.category = category;
      this.recipeName = recipeName;
      this.kcalIntake = kcalIntake;
      this.cholesterolIntake = cholesterolIntake;
      this.proteinIntake = proteinIntake;
      this.fiberIntake = fiberIntake;
      this.carbohydrateIntake = carbohydrateIntake;
      this.lipidIntake = lipidIntake;
      this.saturatedIntake = saturatedIntake;
      this.monounsaturatedIntake = monounsaturatedIntake;
      this.polyunsaturatedIntake = polyunsaturatedIntake;
      this.waterIntake = waterIntake;
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
      this.cupsOfWater = cupsOfWater;
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
    :host {
      display: grid;
      grid-template-columns: 0.5fr minmax(360px, 720px) 0.5fr;
      grid-template-rows: 1fr;
    }
    section {
      grid-column: 2 / 3;
      min-width: 360px;
      padding: 10px;
      margin: auto;
      margin-bottom: 40px;
    }
    .div-lab-container {
      display: grid;
      grid-template-columns: 0.5fr 1fr 0.5fr
      grid-template-rows: 1fr;
    }
    .div-lab-heading {
      grid-column: 2 / 3;
      display: grid;
      gap: 5px;
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr;
    }
    .div-flex-h2 {
      display: flex;
      gap: 11px;
      align-items: end;
    }
    .div-flex-h2 img {
      padding: 3px 0;
    }
    h2 {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    h2 span {
      font-size: 20px;
    }
    .p-lab-heading {
      font-size: 14px;
      font-style: italic;
      opacity: 0.7;
      letter-spacing: 0.5px;
      line-height: 18px;
    }
    .p-lab-heading img {
      width: 16px;
      height: 16px;
      margin-bottom: -2px;
    }

    .div-chosen-recipe {
      grid-column: 2 / 3;
      text-transform: uppercase;
      padding-left: 40px;
      margin: 10px;
      transform: rotate(-1deg);
    }
    .p-category-name {
      font-size: 14px;
      font-weight: 700;
    }
    .p-category-name span {
      font-size: 12px;
    }
    .div-recipe-name {
      display: flex;
      gap: 5px;
      padding: 0 15px;
    }
    .p-recipe-name {
      font-size: 16px;
      font-weight: 700;
      font-style: italic;
      padding-top: 2px;
    }
    .p-recipe-name span {
      font-size: 12px;
    }

    .div-nutrient-heading {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      text-transform: uppercase;
      padding-left: 40px;
      margin-top: 15px;
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
      grid-template-columns: 40px 1fr;
      grid-template-rows: 1fr;
      margin-top: 5px;
      border: 1px solid rgba(0, 173, 181, 0.5);
    }
    .div-vertical {
      display: flex;
      padding: 5px;
    }
    .p-vertical-text {
      font-size: 17px;
      text-align: end;
      text-transform: uppercase;
      writing-mode: vertical-rl;
      text-orientation: sideways;
      transform: rotate(180deg);
    }

    .div-nutrient-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      padding: 5px;
    }
    .div-nutrient-grid:nth-child(odd) {
      background: rgb(34, 40, 49);
    }
    .div-nutrient-flex {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .p-nutrient {
      font-size: 15px;
      text-transform: uppercase;
    }
    .p-nutrient span {
      font-size: 12px;
    }
    .p-nutrient-amounts {
      font-size: 15px;
    }
    .p-nutrient-amounts span {
      font-size: 12px;
    }
    .p-parentheses {
      font-size: 10px;
      text-transform: uppercase;
    }
    .p-down-arrow {
      color: red;
      font-size: 10px;
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <section>
        <div class="div-lab-container">
          <div class="div-lab-heading">
            <div class="div-flex-h2">
              <img
                src="../../img/experiment-light.svg"
                alt="Symbol of a science beacon"
              />
              <h2>T<span>he</span> L<span>ab</span></h2>
            </div>
            <p class="p-lab-heading">
              Any recipe created in
              <img
                src="../img/dining-light.svg"
                alt="Symbol of a fork and spoon"
              />
              may have its nutrition analyzed and reviewed here.
            </p>
          </div>

          <div class="div-chosen-recipe">
            <p class="p-category-name">
              ${!this.category.length
                ? null
                : html`${this.category[0]}<span
                      >${this.category.slice(1)}</span
                    >`}
            </p>
            <div class="div-recipe-name">
              <p>${!this.recipeName.length ? null : html`⤷`}</p>
              <p class="p-recipe-name">
                ${!this.recipeName.length
                  ? null
                  : html`${this.recipeName[0]}<span
                        >${this.recipeName.slice(1)}</span
                      >`}
              </p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-heading">
          <p class="p-heading">N<span>utrient</span></p>
          <p class="p-heading">T<span>otals</span></p>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Macros</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>alories</span></p>
              <p class="p-nutrient-amounts">
                ${this.kcalIntake}<span>kcal</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">P<span>rotein</span></p>
              <p class="p-nutrient-amounts">
                ${this.proteinIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>arbohydrates</span></p>
              <p class="p-nutrient-amounts">
                ${this.carbohydrateIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">N<span>et</span> C<span>arbs</span></p>
              <p class="p-nutrient-amounts">${this.netCarbs}<span>g</span></p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Fats</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <div class="div-nutrient-flex">
                <p class="p-nutrient">C<span>holesterol</span></p>
                <p class="p-down-arrow">⬇</p>
              </div>
              <p class="p-nutrient-amounts">
                ${this.cholesterolIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">T<span>otal</span> L<span>ipids</span></p>
              <p class="p-nutrient-amounts">
                ${this.lipidIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <div class="div-nutrient-flex">
                <p class="p-nutrient">S<span>aturated</span></p>
                <p class="p-down-arrow">⬇</p>
              </div>
              <p class="p-nutrient-amounts">
                ${this.saturatedIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">M<span>onounsaturated</span></p>
              <p class="p-nutrient-amounts">
                ${this.monounsaturatedIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">P<span>olyunsaturated</span></p>
              <p class="p-nutrient-amounts">
                ${this.polyunsaturatedIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">O<span>mega 6</span></p>
              <p class="p-nutrient-amounts">
                ${this.omega6Intake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">O<span>mega 3</span></p>
              <p class="p-nutrient-amounts">
                ${this.omega3Intake}<span>g</span>
              </p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Mixed</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">W<span>ater</span></p>
              <p class="p-nutrient-amounts">
                ${this.litersOfWater}<span>L</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <div class="div-nutrient-flex">
                <p class="p-nutrient">S<span>ugars</span></p>
                <p class="p-down-arrow">⬇</p>
              </div>
              <p class="p-nutrient-amounts">
                ${this.sugarIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>affeine</span></p>
              <p class="p-nutrient-amounts">
                ${this.caffeineIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">F<span>iber</span></p>
              <p class="p-nutrient-amounts">
                ${this.fiberIntake}<span>g</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">T<span>heobromine</span></p>
              <p class="p-nutrient-amounts">
                ${this.theobromineIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">A<span>lcohol</span></p>
              <p class="p-nutrient-amounts">
                ${this.alcoholIntake}<span>g</span>
              </p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Vitamins</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin A</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminAIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin C</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminCIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin D</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminDIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin E</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminEIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <div>
                <p class="p-nutrient">V<span>itamin E, added</span></p>
                <p class="p-parentheses">(synthesized)</p>
              </div>
              <p class="p-nutrient-amounts">
                ${this.syntheticVitaminEIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin K</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminKIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin B1</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminB1ThiaminIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin B2</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminB2RiboflavinIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin B3</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminB3NiacinIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin B6</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminB6Intake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <div>
                <p class="p-nutrient">V<span>itamin B9</span></p>
                <p class="p-parentheses">(and folic acid)</p>
              </div>
              <p class="p-nutrient-amounts">
                ${this.vitaminB9FolateIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">V<span>itamin B12</span></p>
              <p class="p-nutrient-amounts">
                ${this.vitaminB12Intake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>holine</span></p>
              <p class="p-nutrient-amounts">
                ${this.cholineIntake}<span>mg</span>
              </p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Minerals</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>alcium</span></p>
              <p class="p-nutrient-amounts">
                ${this.calciumIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">I<span>ron</span></p>
              <p class="p-nutrient-amounts">
                ${this.ironIntakeIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">M<span>agnesium</span></p>
              <p class="p-nutrient-amounts">
                ${this.magnesiumIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">P<span>hosphorus</span></p>
              <p class="p-nutrient-amounts">
                ${this.phosphorusIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">P<span>otassium</span></p>
              <p class="p-nutrient-amounts">
                ${this.potassiumIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">S<span>odium</span></p>
              <p class="p-nutrient-amounts">
                ${this.sodiumIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">Z<span>inc</span></p>
              <p class="p-nutrient-amounts">
                ${this.zincIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>opper</span></p>
              <p class="p-nutrient-amounts">
                ${this.copperIntake}<span>mg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">S<span>elenium</span></p>
              <p class="p-nutrient-amounts">
                ${this.seleniumIntake}<span>mcg</span>
              </p>
            </div>
          </div>
        </div>

        <div class="div-nutrient-grid-container">
          <div class="div-vertical">
            <p class="p-vertical-text">Antioxidants</p>
          </div>

          <div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>arotene Beta</span></p>
              <p class="p-nutrient-amounts">
                ${this.caroteneBetaIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>arotene Alpha</span></p>
              <p class="p-nutrient-amounts">
                ${this.caroteneAlphaIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">C<span>ryptoxanthin Beta</span></p>
              <p class="p-nutrient-amounts">
                ${this.cryptoxanthinBetaIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">L<span>ycopene</span></p>
              <p class="p-nutrient-amounts">
                ${this.lycopeneIntake}<span>mcg</span>
              </p>
            </div>
            <div class="div-nutrient-grid">
              <p class="p-nutrient">L<span>utein + zeaxanthin</span></p>
              <p class="p-nutrient-amounts">
                ${this.lutein_zeaxanthinIntake}<span>mcg</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("analysis-element", AnalysisElement);
