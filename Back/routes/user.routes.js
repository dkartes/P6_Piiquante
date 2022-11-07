const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//const bcrypt = require("bcrypt");
//const UserModel = require("../models/user.model");
//const ObjectID = require("mongoose").Types.ObjectId;

// authentification
router.post("/signup", userController.signUp);
// login
router.post("/login", userController.login);

module.exports = router;
