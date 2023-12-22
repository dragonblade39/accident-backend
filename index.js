const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const SL = require("./routes");
const FL = require("./routes1");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://chethannv:chethan@chethan.kjdlxwb.mongodb.net/Accident",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});
db.on("error", () => {
  console.log("Database not Connected");
});
app.use(express.json());
app.use(cors());
const port = 5500;
app.use("/data", SL);
app.use("/history", FL);
app.listen(port, () => {
  console.log("Server Started on " + port);
});
