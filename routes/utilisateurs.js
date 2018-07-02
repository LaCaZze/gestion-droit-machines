var express = require('express');
var router = express.Router();

var utilisateur = require("../controllers/UtilisateurController");

//recuperer les utilisateur
router.get("/", utilisateur.list);

//crée un utilisateur
router.get("/create", utilisateur.create);

//voir un utilisateur par son id
router.get("/show/:id", utilisateur.show);

//sauvegarder un utilisateur.
router.post("/save", utilisateur.save);

//editer un utilisateur
//router.get("/edit/:id", utilisateur.edit);






//export du module router
module.exports = router;