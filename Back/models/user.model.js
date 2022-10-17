const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minLengh: 6,
  },
});
