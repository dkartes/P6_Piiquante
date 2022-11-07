const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

//Création du schéma utilisateur
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//on applique le validator au schéma avant d'en faire un model
userSchema.plugin(uniqueValidator);

// play function before save into display:"block"
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* On export le schéma */
module.exports = mongoose.model("user", userSchema);
