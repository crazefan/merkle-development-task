//calculate total number of pages for the result (10 results on the page)
export const countTotalPages = (totalResults) => {
  return Math.ceil(Number(totalResults) / 10);
};

//check if localStorage has token
export const hasToken = () => {
  return ![undefined, null, ""].includes(localStorage.getItem("token"));
};
