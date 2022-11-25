const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

// On export le schéma
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
