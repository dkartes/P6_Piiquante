const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
  },
});

// play function before save into display:"block"
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* On export le schéma */
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
