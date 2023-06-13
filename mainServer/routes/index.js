var express = require('express');
var router = express.Router();
var env = require('../config/env');
var Process = require('../controllers/process');
var auxiliar = require('../auxiliary/auxiliary');

var env = require('../config/env')
var axios = require('axios')
var jwt = require('jsonwebtoken')

function verificaToken(req, res, next){
  if (req.cookies && req.cookies.token){
    next()
  }
  else {
    res.redirect('/login')
  }
}


/* GET home page. */
router.get('/home', function(req, res){
  console.log("ESTOU NESTA ROTA GET /home")
  if (req.cookies && req.cookies.token){
    jwt.verify(req.cookies.token, "EngWeb2023", function(e, payload){
      if(e){
        
        res.render('login')
      }
      else{
        if (payload.level == "User"){
          res.render('homepage', {u: payload})
        }
        else{
          res.render('homepageAdmin', {u: payload})
        }
      }
    })
  } 
  else 
   // Esta view tem de ser alterada para apenas permitir dar login (Usada tanto por users como por Admins)
  res.render('login')
})

router.get('/retrieveAll', verificaToken, function(req, res) {
  var data = new Date().toISOString().substring(0,19)
    axios.get(env.apiAccessPoint+"/"+"0"+"?token=" + req.cookies.token)
    .then(processos => {
      axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
        .then(total => {
         var tp = Math.ceil(total / 500)
         res.render('indexMainPage', { plist: processos.data, d: data, t : total.data, pagTotal : tp , pagNow : 0 });
       })
           .catch(erro => {
             res.render('error', {error: erro, message: "total"})
           })})
    .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

/* GET /processos/registo */ 
router.get('/processos/registo',verificaToken, function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    res.render('addProcess', {d: data });
});

router.get('/:num/nome',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/"+"0"+"/nome?token=" + req.cookies.token)
    .then(processos => {
      axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos.data, d: data, t : total.data, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

router.get('/:num/lugar',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/"+"0"+"/lugar?token=" + req.cookies.token)
    .then(processos => {
      axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos.data, d: data, t : total.data, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

router.get('/:num/data',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/"+"0"+"/data?token=" + req.cookies.token)
    .then(processos => {
            axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos.data, d: data, t : total.data, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

/* GET /processos. */
router.get('/processos',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos"+"?token=" + req.cookies.token)
    .then(processos => {
      res.render('index', { plist: processos.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});


router.get('/retrieveList/:id', verificaToken, function(req, res) {
  var data = new Date().toISOString().substring(0,19)
    axios.get(env.apiAccessPoint+"/listas/" + req.params.id + "?token=" + req.cookies.token)
      .then(response => {
        res.render('listaCompras', { list: response.data, d: data });
      })
      .catch(err => {
        res.render('error', {error: err})
      })
});

router.get('/lista/:idLista/deleteProduto/:idProd', function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  console.log(req.params.idProd)
  axios.delete(env.apiAccessPoint+"/listas/"+ req.params.idLista +"/produtos/"+ req.params.idProd)
    .then(response => {
      res.redirect('/retrieveList/' + req.params.idLista)
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});

// Login
router.get('/login', function(req, res){
  res.render('loginForm')
})

router.post('/login', (req, res) => {
  axios.post(env.authAccessPoint + '/login', req.body)
  .then(resp => {
    res.cookie('token', resp.data.token)
    res.redirect('/home')
  })
  .catch(error => {
    res.render('error', {error: error})
  })
})

router.get('/logout', verificaToken, (req, res) => {
  res.cookie('token', "revogado.revogado.revogado")
  res.redirect('/home')
})

router.get('/register', (req, res)=>{
  console.log("ESTOU NESTA ROTA GET /register")
  res.render('registerForm')
})

router.post('/register', (req, res)=>{
  console.log("Token : "+req.cookies.token)
  axios.post(env.authAccessPoint + '/register?token='+req.cookies.token, req.body )
  .then(resp => {
    // Falta fazer a template de confirmação do registo
    res.cookie('token', resp.data.token)
    res.redirect('/home')
  })
  .catch(error => {
    console.log("Estou no error da rota POST /register")
    res.render('error', {error: error})
  })
})
/***************************************************************************************************************************************************/ 
function get_total(){
   Process.listLength()
    .then(p => {
      console.log("->" + p);
      return p;
    })
    .catch(erro => {
      return 0;
    })
}

var total = 0;








/* GET /processos/:id/posts/add */ 
router.get('/processos/:id/posts/add', verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPost', {d: data, id: req.params.id});
});
/* GET /processos/:id */
router.get('/processos/:id',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      // const atributos = Object.keys(dados.data)
      // const tratados = auxiliar.typeSpacer(atributos)
      res.render('process', { p: dados.data, d: data }); 
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});
/* GET /processos/edit/:id */
router.get('/processos/edit/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('ProcessFormEditPage', {p: dados.data, d: data });
    })
    .catch(erro => res.status(603).json(({erro: erro})))
});
/* GET /processos/delete/:id */
router.get('/processos/delete/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('processDeletePage', {p: dados.data, d: data });
    })
    .catch(erro => res.status(605).json(({erro: erro})))
});

/* POST /processos/edit/:id */
router.post('/processos/edit/:id',verificaToken, function(req, res, next) {
  axios.put(env.apiAccessPoint+"/processos/"+req.body._id+"?token=" + req.cookies.token,req.body)
    .then(dados => {
      res.redirect('/processos');
    })
    .catch(erro => res.status(604).json(({erro: erro})))
});

/* POST /processos/delete/:id */
router.post('/processos/delete/:id',verificaToken, function(req, res, next) {
  axios.delete(env.apiAccessPoint+"/processos/delete/"+req.body._id+"?token=" + req.cookies.token)
    .then(process=>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/delete/:id tem um erro"})
    })
});

/* POST  /processos/registo*/
router.post('/processos/registo',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/registo?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/registo tem um erro"})
    })
});

/* POST /processos/:id/posts/add */
router.post('/processos/:id/posts/add',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/posts/add?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/retrieveAll')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/:id/posts/add tem um erro"})
    })
});
/* GET /processos/:id/posts */
router.get('/processos/:id/posts',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"/posts?token=" + req.cookies.token)
    .then(process =>{
      res.render('postsList', {p: process.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota GET /processos/:id/posts/add tem um erro"})
    })
});
/* POST /posts/addComments/:id */
router.post('/posts/addComments/:id',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/posts/addComments/"+req.params.id+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/processos/'+req.params.id+'/posts');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/:id/posts/add tem um erro"})
    })
});

/* GET /posts/addComments/:id */
router.get('/posts/addComments/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addComment', { d: data });
});

/* GET /posts/seeComments/:id */
router.get('/posts/seeComments/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/posts/seeComments/"+req.params.id+"?token=" + req.cookies.token)
    .then(process =>{
      res.render('commentsList', {p: process.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota GET /processos/:id/posts/add tem um erro"})
    })
});

module.exports = router;
