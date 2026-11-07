export const calculateBMI = (kilograms, meters) => {
  /* source: https://www.cdc.gov/nccdphp/dnpao/growthcharts/training/bmiage/page5_1.html*/
  let cm = meters * 100;
  let bmi = (kilograms / cm / cm) * 10000;
  bmi = bmi.toFixed(1);
  return Number(bmi);
};
