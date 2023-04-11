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
const Event = require("../events/eventsModelSchema");

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

function getDayDiff(startDate, endDate) {
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs(endDate - startDate) / msInDay);
}

function timeDiff(startTime, endTime) {
  const time_A = startTime.split(":")[0];
  const time_B = endTime.split(":")[0];
  const timeDiffValue = Math.max(time_A, time_B) - Math.min(time_A, time_B);
  return Number(timeDiffValue);
}

router.post("/", async (req, res, next) => {
  const days_diff = getDayDiff(
    new Date(req.body.event.date_from),
    new Date(req.body.event.date_to)
  );

  const time_diff = timeDiff(req.body.event.time_from, req.body.event.time_to);

  const eventId = Date.now().toString().slice(11);

  const eventId2 = Date.now().toString();

  const randomNum_1 = Math.floor(Math.random() * 4);

  const code = Math.random().toString(36).substring(2, 7);

  const createDocumentId = `${code}${eventId}${req.body.event.meeting_title.charAt(
    0
  )}${req.body.event.meeting_title.charAt(
    req.body.event.meeting_title.length - 1
  )}`;

  try {
    const newEvent = new Event({
      _id: createDocumentId,
      meeting_title: req.body.event.meeting_title,
      meeting_url:
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        "w" +
        "/" +
        "viewevent" +
        "/" +
        createDocumentId,
      time_from: req.body.event.time_from,
      time_to: req.body.event.time_to,
      time: req.body.event.time_from + " to " + req.body.event.time_to,
      date_from: req.body.event.date_from,
      date_to: req.body.event.date_to,
      time_zone: req.body.event.time_zone,
      date_duration: req.body.event.date_from + " to " + req.body.event.date_to,
      time_gap: Number(time_diff),
      days_gap: Number(days_diff),
      active: true,
    });

    await newEvent
      .save()

      .then(() => {
        res.redirect(`http://localhost:5000/w/viewevent/${createDocumentId}`);
      })
      .catch((error) => {
        res.status(500).send();
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

/////////////

module.exports = router;
