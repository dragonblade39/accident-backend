const mongoose = require("mongoose");

const Schema1 = new mongoose.Schema(
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
    collection: "history",
  }
);

module.exports = mongoose.model("history", Schema1);
