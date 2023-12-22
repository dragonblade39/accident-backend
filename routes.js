const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = require("./Schema.js");
const Schema1 = require("./Schema1.js");

router.get("/data", async (req, res, next) => {
  try {
    const allRecords = await Schema.find();
    res.json(allRecords);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res, next) => {
  const { _id } = req.body;

  try {
    const deletedRecord = await Schema.findByIdAndDelete(_id);

    if (!deletedRecord) {
      return res.status(404).send("Record not found");
    }

    res.json(deletedRecord);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});
router.post("/open-link", async (req, res, next) => {
  const { latitude, longitude } = req.body;
  const currentDate = new Date(); // Current date and time
  const lastRecord = await Schema.findOne().sort({ date: -1 }).exec();

  try {
    const existingRecord = await Schema.findOne({
      date: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentDate.getHours(),
          currentDate.getMinutes()
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentDate.getHours(),
          currentDate.getMinutes() + 1
        ),
      },
    });
    if (
      lastRecord &&
      currentDate.getSeconds() === lastRecord.date.getSeconds()
    ) {
      return res.send("No new record added because minutes are the same.");
    } else {
      const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      const newUser = new Schema({
        accident: "Yes",
        location: {
          latitude: latitude,
          longitude: longitude,
          googleMapsLink: googleMapsLink,
        },
        date: currentDate,
      });
      setTimeout(async () => {
        await newUser.save();
        console.log(lastRecord);
        setTimeout(() => {
          return res.send("Accident record created successfully");
        }, 1000);
      }, 1000);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
