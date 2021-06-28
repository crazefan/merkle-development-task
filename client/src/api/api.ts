import axios, { CancelTokenSource } from "axios";
import { MakeRequestType } from "../types";

//authentication request
export const authRequest = async (username: string, password: string) => {
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

// request creator is needed to cancel unnecessary calls on client side using axios cancel token
const makeRequestCreator = () => {
  //token is declared outside a called function so that previous token is untouched
  let token: CancelTokenSource;

  return async ({ movie, page, year, type }: MakeRequestType) => {
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
          return [{ Response: "Cancelled" }, null];
        }

        return [null, error];
      });
    return result;
  };
};

export const fetchMovies = makeRequestCreator();
