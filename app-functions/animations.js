export const startButtonLoadingAnimation = (button, element) => {
  button.disabled = true;
  element.textContent = "LOADING";

  return setInterval(() => {
    element.textContent += ".";
    if (element.textContent.length > 10) {
      element.textContent = "LOADING";
    }
  }, 700);
};

export const endButtonLoadingAnimation = (
  interval,
  button,
  element,
  textContent,
) => {
  button.disabled = false;
  element.textContent = textContent;
  return clearInterval(interval);
};