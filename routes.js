const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = require("./Schema.js");

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

    // Check if the minutes are the same in the current and last record
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

      // Introduce a delay of 1 second before saving the record
      setTimeout(async () => {
        await newUser.save();
        console.log(lastRecord);

        // Introduce a delay of 1 second before sending the response
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
