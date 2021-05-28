const express = require("express");
const app = express();
const port = process.env.port || 5000;
const axios = require("axios");
const cors = require("cors");

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

app.get("/", async (req, res) => {
  const { movie, type, year } = req.query;
  console.log(movie, type, year);
  const response = await omdbApi.get("", { params: { s: movie, y: year, type: type } });
  console.log(response);
  res.send(response);
});

app.listen(port, () => console.log(`Listening to port ${port}`));
