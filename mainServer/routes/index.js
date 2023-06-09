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
        res.render('homepage')
      }
      else{
        res.render('homepage', {u: payload})
      }
    })
  } 
  else 
  res.render('homepage')
})

router.get('/retrieveAll', verificaToken, function(req, res) {
  var data = new Date().toISOString().substring(0,19)
    axios.get(env.apiAccessPoint+"/listas?token=" + req.cookies.token)
      .then(response => {
        res.render('listas', { lists: response.data, d: data });
      })
      .catch(err => {
        res.render('error', {error: err})
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


/* GET /processos. */
router.get('/processos', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.list()
    .then(processos => {
      res.render('index', { plist: processos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});




/* GET /processos/nome */
router.get('/processos/nome', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.listnome()
    .then(processos => {
      res.render('index', { plist: processos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});
/* GET /processos/data */
router.get('/processos/data', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.listdata()
    .then(processos => {
      res.render('index', { plist: processos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});
/* GET /processos/lugar */
router.get('/processos/lugar', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.listlugar()
    .then(processos => {
      
      res.render('index', { plist: processos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});
/* GET /processos/registo */ 
router.get('/processos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addProcess', {d: data });
});
/* GET /processos/:id/posts/add */ 
router.get('/processos/:id/posts/add', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPost', {d: data });
});
/* GET /processos/:id */
router.get('/processos/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.getProcesso(req.params.id)
    .then(dados => {
      const atributos = Object.keys(dados)
      const tratados = auxiliar.typeSpacer(atributos)
      //console.log(atributos.length + " : " + tratados.length)
      res.render('process', { p: dados, atrib: atributos, trat: tratados, d: data }); 
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});
/* GET /processos/edit/:id */
router.get('/processos/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.getProcesso(req.params.id)
    .then(dados => {
      res.render('ProcessFormEditPage', {p: dados, d: data });
    })
    .catch(erro => res.status(603).json(({erro: erro})))
});
/* GET /processos/delete/:id */
router.get('/processos/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.getProcesso(req.params.id)
    .then(dados => {
      res.render('processDeletePage', {p: dados, d: data });
    })
    .catch(erro => res.status(605).json(({erro: erro})))
});

router.get('/:num',function(req, res, next) {
  //console.log(total)
  var data = new Date().toISOString().substring(0, 16)
  //console.log(0)
  Process.lista500(0)
    .then(processos => {
           Process.listLength()
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos, d: data, t : total, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

router.get('/:num/lugar',function(req, res, next) {
  //console.log(total)
  var data = new Date().toISOString().substring(0, 16)
  //console.log(0)
  Process.lista500Lugar(0)
    .then(processos => {
           Process.listLength()
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos, d: data, t : total, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

router.get('/:num/data',function(req, res, next) {
  //console.log(total)
  var data = new Date().toISOString().substring(0, 16)
  //console.log(0)
  Process.lista500Data(0)
    .then(processos => {
           Process.listLength()
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos, d: data, t : total, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

router.get('/:num/nome',function(req, res, next) {
  //console.log(total)
  var data = new Date().toISOString().substring(0, 16)
  //console.log(0)
  Process.lista500Nome(0)
    .then(processos => {
           Process.listLength()
             .then(total => {
              var tp = Math.ceil(total / 500)
              var act = parseInt(req.params.num)
              res.render('indexMainPage', { plist: processos, d: data, t : total, pagTotal : tp , pagNow : act });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});
router.get('/',function(req, res, next) {
  //console.log(total)
  var data = new Date().toISOString().substring(0, 16)
  //console.log(0)
  Process.lista500(0)
    .then(processos => {
           Process.listLength()
             .then(total => {
              var tp = Math.ceil(total / 500)
              
              res.render('indexMainPage', { plist: processos, d: data, t : total, pagTotal : tp , pagNow : 0 });
            })
                .catch(erro => {
                  res.render('error', {error: erro, message: "total"})
                })})
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de processos levantados"})
    })
});

/* POST /processos/edit/:id */
router.post('/processos/edit/:id', function(req, res, next) {
  
  Process.updateProcesso(req.body)
    .then(dados => {
      res.redirect('/processos');
    })
    .catch(erro => res.status(604).json(({erro: erro})))
});

/* POST /processos/delete/:id */
router.post('/processos/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.deleteProcesso(req.body)
    .then(process=>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/delete/:id tem um erro"})
    })
});

/* POST  /processos/registo*/
router.post('/processos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Process.addProcesso(req.body)
    .then(process =>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Rota POST /processos/registo tem um erro"})
    })
});
module.exports = router;
