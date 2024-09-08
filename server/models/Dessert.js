const mongoose = require("mongoose");

const DessertSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,
});

const DessertModel = mongoose.model("dessertitems", DessertSchema);

module.exports = DessertModel;