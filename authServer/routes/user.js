var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var auth = require('../auth/auth')

var User = require('../controllers/user')

router.get('/get', auth.verificaAcesso, function(req, res){
  User.list()
    .then(users => {
      res.status(200).jsonp(users)
    })
    .catch(erro => res.status(502).jsonp({error: "Erro na obtenção da lista de users: " + erro}))
})

router.get('/get/:username', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(501).jsonp({error: "Erro na obtenção do user: " + erro}))
})

router.put('/edit/user/:username', auth.verificaAcesso, function(req, res){
  User.updateUser(req.body)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(503).jsonp({error: "Erro na edição do user: " + erro}))
})

router.put('/:username/profile/profilePic', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.username)
    .then(user => {
      user.profilePic = req.body.profilePic
      User.updateUser(user)
        .then(user => {
          res.status(200).jsonp(user)
        })
        .catch(erro => res.status(521).jsonp({error: "Erro na adição da foto de perfil: " + erro}))
    })
    .catch(erro => res.status(520).jsonp({error: "Erro na busca do utilizador: " + erro}))
})

router.post('/register', auth.verificaAcesso, function(req, res) {
  var d = new Date().toISOString().substring(0,19)
  userModel.register(new userModel({ email: req.body.email, name: req.body.name,
                                     username: req.body.username, level: req.body.level,
                                     dateCreated: d, active: true, profilePic: req.body.profilePic }), 
                req.body.password, 
                function(err, user) {
                  if (err) 
                    res.jsonp({error: err, message: "Register error: " + err})
                  else{
                    res.status(200).jsonp({message: "Utilizador criado com sucesso!"})
                     passport.authenticate("local")(req,res,function(){
                      jwt.sign({ username: req.user.username, level: req.user.level, 
                        sub: 'aula de EngWeb2023'}, 
                        "EngWeb2023",
                         {expiresIn: 3600},
                       function(e, token) {
                           if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                        else res.status(201).jsonp({token: token})
                         });
                     })
                  }     
  })
})
/*
Este router é usado para fazer o login caso não tenhamos a funcionar a ATIVAÇÃO e a DESATIVAÇÃO de users
router.post('/login', passport.authenticate('local'), function(req, res){
    jwt.sign({ username: req.user.username, level: req.user.level, 
      sub: 'aula de EngWeb2023'}, 
      "EngWeb2023",
      {expiresIn: 3600},
      function(e, token) {
        if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
        else res.status(201).jsonp({token: token})
    });

})
*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return res.status(500).jsonp({ error: 'Erro no servidor.' });
    }
    if (!user || !user.active) {
      return res.status(401).jsonp({ error: 'Acesso não permitido para este utilizador.' });
    }

    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).jsonp({ error: 'Erro ao fazer o login.' });
      }

      jwt.sign(
        { username: req.user.username, level: req.user.level, sub: 'aula de EngWeb2023' },
        'EngWeb2023',
        { expiresIn: 3600 },
        function(e, token) {
          if (e) {
            return res.status(500).jsonp({ error: 'Erro na geração do token: ' + e });
          } else {
            return res.status(201).jsonp({ token: token });
          }
        }
      );
    });
  })(req, res, next);
});
router.delete('/delete/user/:username',auth.verificaAcesso,function(req,res){
  User.deleteUser(req.params.username)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

router.put('/deactivate/user/:username', auth.verificaAcesso, function(req, res){
  User.deactivateUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(520).jsonp({error: "Erro na busca do utilizador: " + erro}))
})

router.put('/activate/user/:username', auth.verificaAcesso, function(req, res){
  User.activateUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(520).jsonp({error: "Erro na busca do utilizador: " + erro}))
})

module.exports = router;