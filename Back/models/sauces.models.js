const mongoose = require("mongoose");

//Création du schéma sauce
const sauceSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  heat: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  usersLiked: {
    type: ["String<userId>"],
  },
  usersDisliked: {
    type: ["String<userId>"],
  },
});

const Sauce = mongoose.model("Sauce", sauceSchema);
module.exports = Sauce;
