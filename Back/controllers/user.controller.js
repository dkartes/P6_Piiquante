const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

// COURS OC

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
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, JWT_SECRET_TOKEN, {
              expiresIn: "24h",
              message: "Vous etes connecté",
            }),
          });
        })
        .catch(err => res.status(500).json({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};

/* From Scratch 

/*

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    res.status(201).json({ message: "Utilisateur crée !" });
  } catch (err) {
    res.status(200).send({ err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
};

*/
