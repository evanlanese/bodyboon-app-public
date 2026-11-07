export const calculatePertentageOfAchievedTarget = (part, whole) => {
  let percentage = (part / whole) * 100;
  percentage = Number(percentage.toFixed(1));
  percentage = Math.floor(percentage);
  if (percentage > 100) {
    percentage = 100;
  }
  return percentage;
};
