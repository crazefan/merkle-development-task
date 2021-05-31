require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const redis = require("redis");
const basicAuth = require("express-basic-auth");
const jwt = require("jsonwebtoken");

const app = express();

//redis server is running on port 6379
const redisClient = redis.createClient(6379);

//server is running on 5000 port (or other specified in .env file)
const port = process.env.PORT || 5000;

const secret = "c681d5a8e4f2a0cb7d1ac717c370429d";

//setting up users with access to API endpoint
const auth = basicAuth({
  users: {
    admin: "12345",
    merkle: "12345",
  },
  unauthorizedResponse: getUnauthorizedResponse,
});

function getUnauthorizedResponse(req) {
  return req.auth
    ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
    : "No credentials provided";
}

function generateAccessToken(username) {
  return jwt.sign(username, secret, { expiresIn: "1800s" });
}

//middleware for token authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

// creating axios instance to fetch from remote API
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

//server's api fetching endpoint secured by client token authentication
app.get("/api/", authenticateToken, (req, res) => {
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
  console.log(req.auth.user);

  if (req.auth.user === "admin") {
    const token = generateAccessToken({ username: req.auth.user });
    res.json(token);
  }
});

//endpoint for verifying token
app.get("/auth/verify", authenticateToken, (req, res) => {
  res.send("valid");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening to port ${port}`));
