const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const redis = require("redis");
const basicAuth = require("express-basic-auth");
const { response } = require("express");

//redis server is running on port 6379
const redisClient = redis.createClient(6379);

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

omdbApi.interceptors.request.use((config) => {
  config.params = {
    apikey: "a4308228",
    ...config.params,
  };
  return config;
});

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/", (req, res) => {
  const { movie, page, type, year } = req.query;

  //first check if Redis has the request cached
  redisClient.get(`${movie}+${page}+${type}+${year}`, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    if (data) {
      console.log("Request successfully retrieved from Redis cache");
      res.status(200).send(JSON.parse(data));
    } else {
      omdbApi
        .get("", {
          params: { s: movie, page: page, y: year, type: type },
        })
        .then((response) => {
          const apiData = response.data;
          console.log(apiData);
          if (response.data) {
            //store successfull response in Redis after retrieving it from API
            redisClient.setex(`${movie}+${page}+${type}+${year}`, 600, JSON.stringify(apiData));
          }
          console.log("Request successfully retrieved from remote API");
          res.send(response.data);
        });
    }
  });
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
