var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/user')
var auth = require('../auth/auth')

var User = require('../controllers/user')

// Lista de todos os utilizadores
router.get('/get', auth.verificaAcesso, function(req, res){
  User.list()
    .then(users => {
      res.status(200).jsonp(users)
    })
    .catch(erro => res.status(502).jsonp({error: "Erro na obtenção da lista de users: " + erro}))
})

// Lista de todos os utilizadores ativos
router.get('/get/active', auth.verificaAcesso, function(req, res){
  User.activeUsers()
    .then(users => {
      res.status(200).jsonp(users)
    })
    .catch(erro => res.status(532).jsonp({error: "Erro na obtenção dos utilizadores ativos: " + erro}))
})

// Lista de todos os utilizadores desativos
router.get('/get/deactive', auth.verificaAcesso, function(req, res){
  User.deactiveUsers()
    .then(users => {
      res.status(200).jsonp(users)
    })
    .catch(erro => res.status(531).jsonp({error: "Erro na obtenção dos utilizadores desativos: " + erro}))
})

// Vai buscar um utilizador em específico
router.get('/get/:username', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(501).jsonp({error: "Erro na obtenção do user: " + erro}))
})

// Edição de um utilizador
router.put('/edit/user/:username', auth.verificaAcesso, function(req, res){
  User.updateUser(req.body)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(503).jsonp({error: "Erro na edição do user: " + erro}))
})

// Adicionar/atualizar foto de perfil
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

// Desativar um utilizador
router.put('/:username/deactivate', auth.verificaAcesso, function(req, res){
  User.deactivateUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(504).jsonp({error: "Erro na desativação do utilizador: " + erro}))
})

// Ativar um utilizador
router.put('/:username/activate', auth.verificaAcesso, function(req, res){
  User.activateUser(req.params.username)
    .then(user => {
      res.status(200).jsonp(user)
    })
    .catch(erro => res.status(505).jsonp({error: "Erro na ativação do utilizador: " + erro}))
})

// A rota do register tem que estar protegida
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
// A rota do login é a única que não está protegida
router.post('/login', passport.authenticate('local'), function(req, res){
  var d = new Date().toISOString().slice(0, 19).split('T').join(' ')
  User.getUser(req.user.username)
    .then(user => {
      // Só podemos fazer login se o user estiver ativo
      if(user.active == true){
        User.loginUser(req.user.username, d)
          .then(user => {
            jwt.sign({ username: req.user.username, level: req.user.level, 
              active: req.user.active,sub: 'aula de EngWeb2023'}, 
              "EngWeb2023",
              {expiresIn: 3600},
              function(e, token) {
                if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                else res.status(201).jsonp({token: token})
              });
          })
          .catch(erro => {res.status(506).jsonp({error: "Erro na atualização do user: " + erro})})
      }else{  
        res.status(201).jsonp({message: "Esta conta está desativada! Não é possível fazer login com a mesma."})
      }
    })
    .catch(erro => {res.status(510).jsonp({error: "Erro na obtenção do user: " + erro})})
})
*/
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

router.delete('/delete/user/:username',auth.verificaAcesso,function(req,res){
  User.deleteUser(req.params.username)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})
module.exports = router;