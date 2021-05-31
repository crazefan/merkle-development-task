export const countTotalPages = (totalResults) => {
  return Math.ceil(Number(totalResults) / 10);
};

export const hasToken = () => {
  return ![undefined, null, ""].includes(localStorage.getItem("token"));
};
