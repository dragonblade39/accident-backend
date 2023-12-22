const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = require("./Schema.js");
const Schema1 = require("./Schema1.js");

router.post("/history", async (req, res, next) => {
  try {
    const { accident, location, date } = req.body;

    const { latitude, longitude, googleMapsLink } = location;

    const newRecord = new Schema1({
      accident,
      location: {
        latitude,
        longitude,
        googleMapsLink,
      },
      date: new Date(date),
    });

    await newRecord.save();

    res.send("Accident record added to history!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/data", async (req, res, next) => {
  try {
    const allRecords = await Schema1.find();
    res.json(allRecords);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
