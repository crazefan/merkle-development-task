const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const redis = require("redis");
const basicAuth = require("express-basic-auth");
const cookieParser = require("cookie-parser");

const app = express();

//redis server is running on port 6379
const redisClient = redis.createClient(6379);

//server is running on 5000 port (or other specified in .env file)
const port = process.env.port || 5000;

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

app.use(cookieParser("642a04b66be1a2726b296aae3b52973f"));

//server's api fetching endpoint
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
  const options = {
    httpOnly: true,
    signed: true,
  };

  if (req.auth.user === "admin") {
    res.cookie("name", "admin", options).send("admin");
  } else if (req.auth.user === "merkle") {
    res.cookie("name", "merkle", options).send("merkle");
  }
});

app.get("/read-cookie", (req, res) => {
  if (req.signedCookies.name === "admin") {
    res.send({ username: "admin" });
  } else if (req.signedCookies.name === "merkle") {
    res.send({ username: "merkle" });
  } else {
    res.send({ error: "User not found" });
  }
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("name").end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Listening to port ${port}`));
