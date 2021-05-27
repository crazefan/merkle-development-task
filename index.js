const express = require("express");
const app = express();
const port = process.env.port || 5000;
const axios = require("axios");

const omdbApi = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=a4308228&i=tt1285016`,
});

omdbApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

app.get("/omdb", async (req, res) => {
  const response = await omdbApi.get();
  console.log(response);
  res.send(response);
});

app.listen(port, () => console.log(`Listening to port ${port}`));
