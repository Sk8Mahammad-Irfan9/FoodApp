const mongoose = require("mongoose");

const LunchSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,
});

const LunchModel = mongoose.model("lunchitems", LunchSchema);

module.exports = LunchModel;