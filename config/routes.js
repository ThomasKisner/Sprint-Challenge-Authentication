const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const jwt = require('jsonwebtoken');
const { authenticate } = require("./middlewares"); 

jwtSecret = "Nicholas Cage is an academy award winning actor";
function generateToken(user) {
  const jwtPayload = {
    ...user,
    hello: "hello ;^)"
  };

  const jwtOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hash;

  db("users")
    .insert(newUser)
    .then(userId => {
      if (userId) {
        res.status(200).json(req.body);
      } else {
        res.status(404).send("error creating user");
      }
    })
    .catch(err => {
      res.status(200).send(err);
    });
}

function login(req, res) {
  const credentials = req.body;

  db("users")
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token: token });
      } else {
        res.status(404).send("Not today junior");
      }
    })
    .catch(err => {
      res.status(500).json(err.message );
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
