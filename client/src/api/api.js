import axios from "axios";

//authentication request
export const authRequest = async (username, password) => {
  return await axios
    .get("http://localhost:5000/auth/login", {
      auth: { username, password },
    })
    .then((data) => {
      return [data, null];
    })
    .catch((error) => {
      return [null, error];
    });
};

// request creator is needed to cancel unnecessary calls on client side using axios cancel token
const makeRequestCreator = () => {
  //token is declared outside a called function so that previous token is untouched
  let token;

  return async ({ movie, page, year, type }) => {
    if (token) token.cancel("Request is cancelled");

    token = axios.CancelToken.source();

    const result = await axios
      .get("http://localhost:5000/api/", {
        params: { movie, page, year, type },
        cancelToken: token.token,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error);
          return { Response: "Cancelled" };
        }
        console.log(error);
      });
    return result;
  };
};

export const fetchMovies = makeRequestCreator();
