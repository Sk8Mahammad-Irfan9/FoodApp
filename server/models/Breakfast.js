const mongoose = require("mongoose");

const BrekfastSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,
});

const BreakfastModel = mongoose.model("breakfastitems", BrekfastSchema);

module.exports = BreakfastModel;
