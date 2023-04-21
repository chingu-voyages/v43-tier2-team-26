const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
const Events = require("../events/eventsModelSchema");

app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

router.get("/", async (req, res, next) => {
  console.log(req.params);

  res.send(req.params["eventtitle"]);
});

module.exports = router;
