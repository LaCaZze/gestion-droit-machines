var express = require('express');
var router = express.Router();
var user = require("../controllers/UserController");


function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
    }
};

//crée route vers l'inscription user
router.get("/ajouter", user.create);

//crée route vers l'identification user
router.get("/identifier", user.identificaition);

//route pour sauvegarder la saisie dans la base de données
router.post("/save", user.save);

//route pour voir la liste des users et mot de passe
router.get("/list", user.list);

// route vers l'authentification
router.post("/auth", user.auth);




module.exports = router;
