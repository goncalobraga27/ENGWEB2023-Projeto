var express = require('express');
var router = express.Router();
var env = require('../config/env');
var Process = require('../controllers/process');
var auxiliar = require('../auxiliary/auxiliary');

var env = require('../config/env')
var axios = require('axios')
var jwt = require('jsonwebtoken')

// Verificação do token recebido na comunicação
function verificaToken(req, res, next){
  if (req.cookies && req.cookies.token){
    next()
  }
  else {
    res.redirect('/login')
  }
}


/* GET /home */
router.get('/home', function(req, res){
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
  res.render('login')
})
// GET /retrieveAll
router.get('/retrieveAll', verificaToken, function(req, res) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
        .then(total => {
          const currentPage = parseInt(req.query.page) || 0;
          const prevPage = currentPage > 1 ? currentPage - 1 : 0;
          const nextPage = currentPage < parseInt(total.data) ? currentPage + 1 : currentPage;
         if(req.query.page){
          axios.get(env.apiAccessPoint+"/"+req.query.page+"?token=" + req.cookies.token)
              .then(processos => {
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "retrieveAll"});
                })
              .catch(erro => {
                res.render('error', {error: erro, message: "Erro no processos da rota GET /retrieveAll"}) })
         }
         else{
          axios.get(env.apiAccessPoint+"/0?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "retrieveAll"});
                })
              .catch(erro => {
                res.render('error', {error: erro, message: "Erro no req.query.page == 0 da rota GET /retrieveAll"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /retrieveAll"})
  })

});

/* GET /processos/registo */ 
router.get('/processos/registo',verificaToken, function(req, res, next) {
    var data = new Date().toISOString().substring(0, 16)
    res.render('addProcess', {d: data});
});
// GET /nome 
router.get('/nome',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
        .then(total => {
          const currentPage = parseInt(req.query.page) || 0;
          const prevPage = currentPage > 1 ? currentPage - 1 : 0;
          const nextPage = currentPage < parseInt(total.data) ? currentPage + 1 : currentPage;
         if(req.query.page){
          axios.get(env.apiAccessPoint+"/"+req.query.page+"/nome?token=" + req.cookies.token)
              .then(processos => {
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "nome"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /nome"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/nome?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "nome"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page == null na rota GET /nome"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /nome"})
  })

});
// GET /lugar
router.get('/lugar',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
        .then(total => {
          const currentPage = parseInt(req.query.page) || 0;
          const prevPage = currentPage > 1 ? currentPage - 1 : 0;
          const nextPage = currentPage < parseInt(total.data) ? currentPage + 1 : currentPage;
         if(req.query.page){
          axios.get(env.apiAccessPoint+"/"+req.query.page+"/lugar?token=" + req.cookies.token)
              .then(processos => {
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "lugar"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /lugar"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/lugar?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "lugar"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page == null na rota GET /lugar"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /lugar"})
  })
});
// GET /data
router.get('/data',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+"/len"+"?token=" + req.cookies.token)
        .then(total => {
          const currentPage = parseInt(req.query.page) || 0;
          const prevPage = currentPage > 1 ? currentPage - 1 : 0;
          const nextPage = currentPage < parseInt(total.data) ? currentPage + 1 : currentPage;
         if(req.query.page){
          axios.get(env.apiAccessPoint+"/"+req.query.page+"/data?token=" + req.cookies.token)
              .then(processos => {
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "data"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /data"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/data?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', { plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "data"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page == null na rota GET /data"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /data"})
  })
});

/* GET /processos */
router.get('/processos',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos"+"?token=" + req.cookies.token)
    .then(processos => {
      res.render('index', { plist: processos.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro nos processos da rota GET /processos "})
    })
});

// GET /login
router.get('/login', function(req, res){
  res.render('loginForm')
})

// POST /login
router.post('/login', (req, res) => {
  axios.post(env.authAccessPoint + '/login', req.body)
  .then(resp => {
    res.cookie('token', resp.data.token)
    res.redirect('/home')
  })
  .catch(error => {
    res.render('error', {error: error,message:"Erro na resp da rota POST /login"})
  })
})

// GET /logout
router.get('/logout', verificaToken, (req, res) => {
  res.cookie('token', "revogado.revogado.revogado")
  res.redirect('/home')
})
// GET /register
router.get('/register', (req, res)=>{
  res.render('registerForm')
})
// POST /register
router.post('/register', (req, res)=>{
  console.log("Token : "+req.cookies.token)
  axios.post(env.authAccessPoint + '/register?token='+req.cookies.token, req.body )
  .then(resp => {
    
    res.cookie('token', resp.data.token)
    res.redirect('/home')
  })
  .catch(error => {
    res.render('error', {error: error,message: 'Erro na resp da rota POST /register'})
  })
})

// Função que nos dá o número total de processos
function get_total(){
   Process.listLength()
    .then(p => {
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
    .catch(erro =>{
      res.render('error', {error: erro,message: 'Erro nos dados da rota GET /processos/:id'})
    })
});
/* GET /processos/edit/:id */
router.get('/processos/edit/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('ProcessFormEditPage', {p: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro,message: 'Erro nos dados da rota GET /processos/edit/:id'})
    })
});
/* GET /processos/delete/:id */
router.get('/processos/delete/:id',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('processDeletePage', {p: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro,message: 'Erro nos dados da rota GET /processos/delete/:id'})
    })
});

/* POST /processos/edit/:id */
router.post('/processos/edit/:id',verificaToken, function(req, res, next) {
  axios.put(env.apiAccessPoint+"/processos/"+req.body._id+"?token=" + req.cookies.token,req.body)
    .then(dados => {
      res.redirect('/processos');
    })
    .catch(erro => {
      res.render('error', {error: erro,message: 'Erro nos dados da rota POST /processos/edit/:id'})
    })
});

/* POST /processos/delete/:id */
router.post('/processos/delete/:id',verificaToken, function(req, res, next) {
  axios.delete(env.apiAccessPoint+"/processos/delete/"+req.body._id+"?token=" + req.cookies.token)
    .then(process=>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/delete/:id"})
    })
});

/* POST  /processos/registo*/
router.post('/processos/registo',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/registo?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/processos')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/registo"})
    })
});

/* POST /processos/:id/posts/add */
router.post('/processos/:id/posts/add',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/posts/add?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/retrieveAll')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/:id/posts/add"})
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
      res.render('error', {error: erro, message: "Erro no process da rota GET /processos/:id/posts"})
    })
});
/* POST /posts/addComments/:id */
router.post('/posts/addComments/:id',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/posts/addComments/"+req.params.id+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/processos/'+req.params.id+'/posts');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /posts/addComments/:id"})
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
      res.render('error', {error: erro, message: "Erro no process da rota GET /posts/seeComments/:id"})
    })
});

/* GET /posts/seeComments/:id */
router.get('/adminUsers',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.authAccessPoint+"/get?token=" + req.cookies.token)
    .then(users =>{
      res.render('usersList', {u: users.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no users da rota GET /posts/seeComments/:id"})
    })
});

/* GET /edit/user/:username */
router.get('/edit/user/:username',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('userEditPage', {u: req.params.username, d: data });
   
});

/* POST /edit/user/:username */
router.post('/edit/user/:username',verificaToken, function(req, res, next) {
  axios.put(env.authAccessPoint+"/edit/user/"+req.params.username+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/adminUsers');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /edit/user/:username"})
    })
});

/* GET /edit/user/:username */
router.get('/edit/user/:username',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('userEditPage', {u: req.params.username, d: data });
   
});

/* POST /delete/user/:username */
router.post('/delete/user/:username',verificaToken, function(req, res, next) {
  axios.delete(env.authAccessPoint+"/delete/user/"+req.body.username+"?token=" + req.cookies.token)
    .then(process=>{
      res.redirect('/adminUsers')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /delete/user/:username"})
    })
});
/* GET /delete/user/:username */
router.get('/delete/user/:username',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.authAccessPoint+"/get/"+req.params.username+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('userDeletePage', {u: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no dados da rota GET /delete/user/:username"})
    })
});

/* GET /processos/:id/addLigacoes  */
router.get('/processos/:id/addLigacoes',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('addLigacoesPage', {id:req.params.id,d: data});
   
});

/* POST /processos/:id/addLigacoes */
router.post('/processos/:id/addLigacoes',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/"+req.params.id+"/addLigacoes?token=" + req.cookies.token,req.body)
    .then(process=>{
      res.redirect('/retrieveAll')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/:id/addLigacoes"})
    })
});

/* GET /search */
router.get('/search',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('searchPage', {d: data});
   
});
// Função que nos dá o parametros que não são nulos
function getFieldsWithContent(obj) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== '') {
      result[key] = obj[key];
    }
  }

  return result;
}
function convertObjectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== '') {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return keyValuePairs.join('&');
}
/* GET /searchReg?...*/
router.get('/searchReg',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  result = getFieldsWithContent(req.query)
  queryString=convertObjectToQueryString(result)
  axios.get(env.apiAccessPoint +"/searchReg?"+"token="+req.cookies.token+"&"+queryString)
  .then (dados =>{
    res.render ('searchList', {plist:dados.data,d:data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro nos dados da rota GET /searchReg?..."});
  })
});

module.exports = router;
