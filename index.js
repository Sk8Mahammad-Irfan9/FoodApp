const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BreakfastModel = require("./models/Breakfast.js");
const DessertModel = require("./models/Dessert");
const DinnerModel = require("./models/Dinner");
const LunchModel = require("./models/Lunch");
const Order = require("./models/Order.js");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://SKIRFAN:hoJO1zEEgDO2kDcL@cluster1.n1wfid1.mongodb.net/test",
  console.log("connected")
);

app.get("/", (req, res) => {
  res.send("Its Worked");
});

app.get("/getBreakfast", async (req, res) => {
  await BreakfastModel.find()
    .then((breakfastitems) => res.json(breakfastitems))
    .catch((err) => res.json(err));
});

app.get("/getLunch", async (req, res) => {
  await LunchModel.find()
    .then((lunchitems) => res.json(lunchitems))
    .catch((err) => res.json(err));
});

app.get("/getDinner", async (req, res) => {
  await DinnerModel.find()
    .then((dinneritems) => res.json(dinneritems))
    .catch((err) => res.json(err));
});

app.get("/getDessert", async (req, res) => {
  await DessertModel.find()
    .then((dessertitems) => res.json(dessertitems))
    .catch((err) => res.json(err));
});

app.post("/api/create-order", async (req, res) => {
  const orderNo = Math.floor(1000 + Math.random() * 9000);
  const { items, totalPrice, quantity } = req.body;
  try {
    const newOrder = new Order({
      orderNo,
      totalPrice,
      items,
      quantity,
    });

    await newOrder.save();
    res.status(201).json({ orderNo: orderNo });
  } catch (err) {
    console.log("something went wrong in order", err);
    res.status(500).json({ err: "internal server error" });
  }
});

app.listen(4000, () => {
  console.log("server is running");
});
