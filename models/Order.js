const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNo: String,
  totalPrice: Number,
  items: Array,
  quantity:Number
});

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;

