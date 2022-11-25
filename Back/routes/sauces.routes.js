const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesControl = require("../controllers/sauces.controller");

//Création des routes des sauces
// trouver toutes les sauces
router.get("/", auth, saucesControl.getAllSauces);
// trouver une sauce spécifique
router.get("/:id", auth, saucesControl.getOneSauce);
// poster une sauce
router.post("/", auth, multer, saucesControl.createSauce);
// modifier une sauce
//router.put("/:id", auth, multer, sauceControl.modifySauce);

module.exports = router;
