import axios from "axios";

//authentication request

export const authRequest = async (username, password) => {
  return await axios
    .get("http://localhost:5000/auth/login", {
      auth: { username: username, password: password },
    })
    .then(({ data }) => {
      return [data, null];
    })
    .catch((error) => {
      return [null, error];
    });
};

export const authVerifyToken = async () => {
  const authToken = localStorage.getItem("token");
  return await axios
    .get("http://localhost:5000/auth/verify", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then(({ data }) => {
      console.log(data);
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
    const authToken = localStorage.getItem("token");
    const result = await axios
      .get("http://localhost:5000/api/", {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { movie, page, year, type },
        cancelToken: token.token,
      })
      .then(({ data }) => {
        return [data, null];
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error);
          return [{ Response: "Cancelled" }, null];
        }
        console.log(error);
        return [null, error];
      });
    return result;
  };
};

export const fetchMovies = makeRequestCreator();
