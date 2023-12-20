const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    accident: { type: String },
    date: { type: Date },
    location: {
      latitude: { type: String },
      longitude: { type: String },
      googleMapsLink: { type: String },
    },
  },
  {
    collection: "accident",
  }
);

module.exports = mongoose.model("data", Schema);
