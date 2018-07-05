var mongoose = require('mongoose');
var User = require("../models/User");
var bcrypt = require('bcrypt');
var session = require('express-session');

var userController = {};

//Affichier le formulaire d'inscription
userController.create = function (req, res) {
    res.render("../views/user/create");
};

//Affichier le formulaire d'identification
userController.identificaition = function (req, res) {
    res.render("../views/user/identification");
};

//enregistrement des users
userController.save = function (req, res) {

    if (req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                console.log(err);
                res.render("../views/user/create");
            } else {
                console.log("creation user OK");
                res.redirect("/users/list");
            }
        });
    };
}

//Liste les users
userController.list = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            console.log('Error : ', err);
        } else {
            console.log(users)
            res.render("../views/user/indexuser", { users: users });
        }
    });
};



//fonction qui recupere le username et le password et qui compare
// avec ce qu'il y'a en bdd

userController.auth = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({ username: username }).exec(function (err, users) {
      if (!err && users) {
        bcrypt.compare(password, users.password, function (err, result) {
          console.log(result);
          if (result === true) {
            req.session.userId = users._id;
            req.session.Username = user.username;
            req.session.success = 'Connexion Reussie';
            res.redirect('/droits');
          }else {
          //console.log(req.session.userName);
          res.redirect('/');
          };
        })
      
    } else {
        console.log("error =>", err);
        return res.redirect('/');
      }
  
    })
  };
  

//export du module
module.exports = userController;