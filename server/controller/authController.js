const Order = require("../models/Order");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../userPassAuth/authPass");
const JWT = require("jsonwebtoken");

exports.authRegisterController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({
        success: false,
        message: "Fill all the fields",
      });
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      res.status(401).send({
        success: false,
        message: "User already exist!",
      });
    }

    if (name.length > 30) {
      return res.status(400).send({
        success: false,
        message: "Name should be in 30 words",
      });
    }
    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password should be greater than 8 words",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Succeccfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to register",
      error,
    });
  }
};

exports.authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Fill all the fields !",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Wrong Email",
      });
    }

    const mathchPassword = await comparePassword(password, user.password);

    if (!mathchPassword) {
      return res.status(401).send({
        success: false,
        message: "Wrong Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Successfully logged in !",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong ! In Login!",
      error,
    });
  }
};

exports.getAllOrderController = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("items");
    // .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Unable to get all orders",
      error,
    });
  }
};

exports.testController = async (req, res) => {
  res.send("Its a login controller");
};
