const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    maxLength: 30,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 8,
  },
  role: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
