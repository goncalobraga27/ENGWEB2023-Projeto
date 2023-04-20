var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Na cb da homepage.")
  console.log(req.sessionID)
  if (req.user){
    res.render('index',{u: req.user});
  }
  else {
    res.render('index')
  }

});

function verificaAutenticacao(req, res, next){
  console.log('User (verif.): ' + JSON.stringify(req.user))
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    res.redirect("/login");
  }
}

router.get('/protegida', verificaAutenticacao, 
(req,res) => {
   			res.redirect('/')
})

// Login page
router.get('/login', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('loginForm')
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Na cb do POST login...')
  console.log('Auth: ' + JSON.stringify(req.user))
 	res.redirect('localhost:7777/processos')
})

router.get('/logout', function(req,res){
  console.log("Logout: a sair...");
  req.logOut(() => {
    return
  });
  res.redirect('/');
});

router.get('/register', function(req, res) {
  console.log('Na cb do GET register...')
  console.log(req.sessionID)
  res.render('registerForm')
})

router.post('/register',/*passport.authenticate('local'),*/ function(req,res){
  console.log("Na cb do post /register");
  User.register(new User({username:req.body.username}),
            req.body.password,
            function(err,user){
              if(err){
                console.log("Register error: " + err )
                return res.render('register',{user:user});
              }
              else{
                passport.authenticate('local')(req,res,function(){
                  res.redirect('/');
                });
              }
            });
});
module.exports = router;
