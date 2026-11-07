export const sortAscendingOrder = (array) => {
  const compare = (a, b) => {
    if (a.description.length < b.description.length) {
      return -1;
    }
    if (a.description.length > b.description.length) {
      return 1;
    }
    return 0;
  };
  return array.sort(compare);
};
