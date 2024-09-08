const mongoose = require("mongoose");

const DinnerSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,
});

const DinnerModel = mongoose.model("dinneritems", DinnerSchema);

module.exports = DinnerModel;