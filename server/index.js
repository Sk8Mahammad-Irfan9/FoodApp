const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BreakfastModel = require("./models/Breakfast.js");
const DessertModel = require("./models/Dessert");
const DinnerModel = require("./models/Dinner");
const LunchModel = require("./models/Lunch");
const Order = require("./models/Order.js");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

const authRouter = require("./router/authRouter.js");

const cluster = require("cluster");
const os = require("os");
const numCpus = os.cpus().length;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECT, console.log("connected"));

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCpus; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log(`Starting another worker`);
//     cluster.fork();
//   });
// } else {
// const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// const cors = require("cors");
// app.use(cors());
// PORT = 4000;

// app.get("/getBreakfast", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   await BreakfastModel.find()
//     .then((breakfastitems) => res.json(breakfastitems))
//     .catch((err) => res.json(err));
// });

// app.get("/getLunch", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   await LunchModel.find()
//     .then((lunchitems) => res.json(lunchitems))
//     .catch((err) => res.json(err));
// });

// app.get("/getDinner", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   await DinnerModel.find()
//     .then((dinneritems) => res.json(dinneritems))
//     .catch((err) => res.json(err));
// });

// app.get("/getDessert", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   await DessertModel.find()
//     .then((dessertitems) => res.json(dessertitems))
//     .catch((err) => res.json(err));
// });

// app.get("/getOrders", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   await Order.find()
//     .then((orders) => res.json(orders))
//     .catch((err) => res.json(err));
// });

// app.post("/api/create-order", async (req, res) => {
//   const orderNo = Math.floor(1000 + Math.random() * 9000);
//   const { items, totalPrice, quantity, userEmail } = req.body;
//   try {
//     const newOrder = new Order({
//       orderNo,
//       totalPrice,
//       items,
//       quantity,
//       userEmail,
//     });
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     await newOrder.save();

//     await sendOrderConfirmationEmail(
//       userEmail,
//       orderNo,
//       items,
//       totalPrice,
//       quantity
//     );

//     res.status(201).json({ orderNo: orderNo });
//   } catch (err) {
//     console.log("something went wrong in order", err);
//     res.status(500).json({ err: "internal server error" });
//   }
// });
// async function sendOrderConfirmationEmail(
//   userEmail,
//   orderNo,
//   items,
//   totalPrice,
//   quantity
// ) {
//   // Create a nodemailer transporter
//   let transporter = nodemailer.createTransport({
//     service: "Gmail", // Assuming you are using Gmail. You need to provide your own SMTP credentials here.
//     port: 587,
//     auth: {
//       user: `${process.env.NODEMAILER_GMAIL}`, // Your email address
//       pass: `${process.env.NODEMAILER_PASSWORD}`, // Your email password
//     },
//   });

//   // Compose email
//   let mailOptions = {
//     from: `${process.env.NODEMAILER_GMAIL}`, // Sender address
//     to: userEmail, // List of recipients
//     subject: "Order Confirmation", // Subject line
//     html: `
//           <h1>Order Confirmation</h1>
//           <p>Your order with order number <b>${orderNo}</b> has been successfully placed.</p>
//           <h2>Order Details:</h2>
//           <ul>
//               ${items
//                 .map((item, index) => `<li>${index + 1}.Item : ${item}</li>`)
//                 .join("")}
//           </ul>
//           <p>Total Price: $ ${totalPrice}</p>
//           <p>Quantity: ${quantity}</p>
//       `,
//   };

//   // Send email
//   await transporter.sendMail(mailOptions);
// }
// app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.json(`server is running ${process.pid}`);
// });

// app.listen(PORT, () => {
//   console.log(PORT);
// });

// console.log(`Worker ${process.pid} started`);
// }

// const app = express();
// const bodyParser = require("body-parser");
app.use(bodyParser.json());
// const cors = require("cors");
// app.use(cors());
PORT = 4000;

app.get("/getBreakfast", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await BreakfastModel.find()
    .then((breakfastitems) => res.json(breakfastitems))
    .catch((err) => res.json(err));
});

app.get("/getLunch", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await LunchModel.find()
    .then((lunchitems) => res.json(lunchitems))
    .catch((err) => res.json(err));
});

app.get("/getDinner", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await DinnerModel.find()
    .then((dinneritems) => res.json(dinneritems))
    .catch((err) => res.json(err));
});

app.get("/getDessert", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await DessertModel.find()
    .then((dessertitems) => res.json(dessertitems))
    .catch((err) => res.json(err));
});

app.get("/getOrders", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await Order.find()
    .then((orders) => res.json(orders))
    .catch((err) => res.json(err));
});

app.post("/api/create-order", async (req, res) => {
  const orderNo = Math.floor(1000 + Math.random() * 9000);
  const { items, totalPrice, quantity, userEmail } = req.body;
  try {
    const newOrder = new Order({
      orderNo,
      totalPrice,
      items,
      quantity,
      userEmail,
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    await newOrder.save();

    await sendOrderConfirmationEmail(
      userEmail,
      orderNo,
      items,
      totalPrice,
      quantity
    );

    res.status(201).json({ orderNo: orderNo });
  } catch (err) {
    console.log("something went wrong in order", err);
    res.status(500).json({ err: "internal server error" });
  }
});
async function sendOrderConfirmationEmail(
  userEmail,
  orderNo,
  items,
  totalPrice,
  quantity
) {
  // Create a nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail", // Assuming you are using Gmail. You need to provide your own SMTP credentials here.
    port: 587,
    auth: {
      user: `${process.env.NODEMAILER_GMAIL}`, // Your email address
      pass: `${process.env.NODEMAILER_PASSWORD}`, // Your email password
    },
  });

  // Compose email
  let mailOptions = {
    from: `${process.env.NODEMAILER_GMAIL}`, // Sender address
    to: userEmail, // List of recipients
    subject: "Order Confirmation", // Subject line
    html: `
            <h1>Order Confirmation</h1>
            <p>Your order with order number <b>${orderNo}</b> has been successfully placed.</p>
            <h2>Order Details:</h2>
            <ul>
                ${items
                  .map((item, index) => `<li>${index + 1}.Item : ${item}</li>`)
                  .join("")}
            </ul>
            <p>Total Price: $ ${totalPrice}</p>
            <p>Quantity: ${quantity}</p>
        `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json(`server is running ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(PORT);
});
