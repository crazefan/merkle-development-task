import axios from "axios";

// request creator is needed to cancel unnecessary calls on client side using axios cancel token
const makeRequestCreator = () => {
  //token is declared outside a called function so that previous token is untouched
  let token;

  return async ({ movie, year, type }) => {
    if (token) token.cancel("Request is cancelled");

    token = axios.CancelToken.source();

    const result = await axios
      .get("http://localhost:5000/", {
        params: { movie: movie, year: year, type: type },
        cancelToken: token.token,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error);
          return { Response: "false" };
        }
        console.log(error);
      });
    return result;
  };
};

export const fetchMovies = makeRequestCreator();
