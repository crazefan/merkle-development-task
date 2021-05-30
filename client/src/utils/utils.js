export const countTotalPages = (totalResults) => {
  return Math.ceil(Number(totalResults) / 10);
};
