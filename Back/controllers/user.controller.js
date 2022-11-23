const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
require("dotenv").config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new UserModel({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch(err => res.status(400).json({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};

exports.login = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Utilisateur non trouvé/Mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(async valid => {
          if (!valid) {
            return res.status(401).json({
              error: "Utilisateur non trouvé/Mot de passe incorrecte",
            });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, JWT_SECRET_TOKEN, {
                expiresIn: 60 * 60 * 24,
              }),
            });
          }
        })
        .catch(err => res.status(500).json({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};
