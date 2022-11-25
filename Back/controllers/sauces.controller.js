const Sauce = require("../models/sauces.models");
//importe de Node FS (gestionnaire de fichier)
const fs = require("fs");

//fonction popur avoir toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(401).json({ err }));
};

//fonction pour avoir une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(err => res.status(401).json({ err }));
};

//fonciton pour poster une sauce
exports.createSauce = (req, res, next) => {
  //on parse l'objet requete
  const sauceObject = JSON.parse(req.body.sauce);
  //on supprime dans cet objet deux champs car on ne veut pas faire confiance au client. On utilise le userId qui vient du token d'identification
  delete sauceObject._id;
  delete sauceObject._userId;
  //on crée l'objet moins les deux champs supprimé
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    likes: 0,
    dislikes: 0,
    userDisliked: [],
    userLiked: [],
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "sauce enregistrée" });
    })
    .catch(err => {
      res.status(400).json({ err });
    });
};

// modifier une sauce
//exports.modifySauce = (req, res, next) => {};
