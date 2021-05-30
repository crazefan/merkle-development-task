const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: {
    admin: "12345",
    tima: "12345",
  },
  unauthorizedResponse: getUnauthorizedResponse,
});

function getUnauthorizedResponse(req) {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
}

const port = process.env.port || 5000;

const omdbApi = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

omdbApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

omdbApi.interceptors.request.use((config) => {
  config.params = {
    apikey: "a4308228",
    ...config.params,
  };
  return config;
});

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/", async (req, res) => {
  const { movie, page, type, year } = req.query;
  console.log(movie, type, year);
  const response = await omdbApi.get("", { params: { s: movie, page: page, y: year, type: type } });
  console.log(response);
  res.send(response);
});

app.get("/auth/login", auth, (req, res) => {
  if (req.auth.user === "admin") {
    res.send("admin");
  } else if (req.auth.user === "tima") {
    res.send("tima");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening to port ${port}`));
// app
//   .use(express.static(path.join(__dirname, "/client/build")))
//   .listen(port, () => console.log(`Listening on ${port}`));
