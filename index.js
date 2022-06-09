const express = require("express");
const mongoose = require("mongoose");
const {
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT
} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h1>Hi There!!!</h1>");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
