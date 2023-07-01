var express = require('express');
var router = express.Router();
var env = require('../config/env');
var Process = require('../controllers/process');
var auxiliar = require('../auxiliary/auxiliary');

var env = require('../config/env')
var axios = require('axios')
var jwt = require('jsonwebtoken')

var tipoUser = ""

// Verificação do token recebido na comunicação
function verificaToken(req, res, next){
  if (req.cookies && req.cookies.token){
    next()
  }
  else {
    res.redirect('/login')
  }
}

/* GET / */
router.get('/', function(req, res){
  res.redirect('/home');
})
  


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
          tipoUser = "User"
        }
        else{
          res.render('homepageAdmin', {u: payload})
          tipoUser = "Admin"
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
                res.render('indexMainPage', {type: tipoUser,  plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "retrieveAll"});
                })
              .catch(erro => {
                res.render('error', {error: erro, message: "Erro no processos da rota GET /retrieveAll"}) })
         }
         else{
          axios.get(env.apiAccessPoint+"/0?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "retrieveAll"});
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
    res.render('addProcess', {type: tipoUser, d: data});
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
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "nome"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /nome"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/nome?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "nome"});
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
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "lugar"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /lugar"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/lugar?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "lugar"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page == null na rota GET /lugar"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /lugar TAMANHO DA LISTA"})
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
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,t:processos.data.length,tipo: "data"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page na rota GET /data"})
              })
         }
         else{
          axios.get(env.apiAccessPoint+"/0/data?token=" + req.cookies.token)
              .then(processos => {
                
                res.render('indexMainPage', {type: tipoUser, plist: processos.data, d: data,prevPage:prevPage,nextPage:nextPage,tipo: "data"});
                })
              .catch(erro => {
              res.render('error', {error: erro, message: "Erro no req.query.page == null na rota GET /data"})
              })
         }
         })
        .catch(erro => {
             res.render('error', {error: erro, message: "Erro na rota GET /data no Tamanho da Lista"})
  })
});

/* GET /processos */
router.get('/processos',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos"+"?token=" + req.cookies.token)
    .then(processos => {
      res.render('index', {type: tipoUser, plist: processos.data, d: data });
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
  res.render('registerForm',{type: tipoUser})
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
  res.render('addPost', {type: tipoUser, d: data, id: req.params.id});
});
/* GET /processos/:id */
router.get('/processos/:id',verificaToken,function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('process', {type: tipoUser, p: dados.data, d: data}); 
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
      res.render('ProcessFormEditPage', {type: tipoUser, p: dados.data, d: data });
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
      res.render('processDeletePage', {type: tipoUser, p: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro,message: 'Erro nos dados da rota GET /processos/delete/:id'})
    })
});

/* POST /processos/edit/:id */
router.post('/processos/edit/:id',verificaToken, function(req, res, next) {
  axios.put(env.apiAccessPoint+"/processos/"+req.body._id+"?token=" + req.cookies.token,req.body)
    .then(dados => {
      res.redirect('/processos/'+req.params.id);
    })
    .catch(erro => {
      res.render('error', {error: erro,message: 'Erro nos dados da rota POST /processos/edit/:id'})
    })
});

/* POST /processos/delete/:id */
router.post('/processos/delete/:id',verificaToken, function(req, res, next) {
  axios.delete(env.apiAccessPoint+"/processos/delete/"+req.params.id+"?token=" + req.cookies.token)
    .then(process=>{
      res.redirect('/retrieveAll')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/delete/:id"})
    })
});

/* POST  /processos/registo*/
router.post('/processos/registo',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/registo?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/retrieveAll')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /processos/registo"})
    })
});

/* POST /processos/:id/posts/add */
router.post('/processos/:id/posts/add',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/posts/add/"+req.params.id+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/processos/'+req.params.id+'/posts');
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
      if (process.data.posts.length > 0){
        if (tipoUser == "User"){
        res.render('postsList', {type: tipoUser, p: process.data, d: data });
        }
        else {
          res.render('postsListAdmin', {type: tipoUser, p: process.data, d: data });
        }
     }
     else res.redirect('/retrieveAll');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota GET /processos/:id/posts"})
    })
});
/* POST /posts/addComments/:idR/:idP */
router.post('/posts/addComments/:idR/:idP',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/posts/addComments/"+req.params.idR+"/"+req.params.idP+"?token=" + req.cookies.token,req.body)
    .then(process =>{

      res.redirect('/posts/seeComments/'+req.params.idR+"/"+req.params.idP);
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota POST /posts/addComments/:id"})
    })
});

/* GET /posts/addComments/:idR/:idP */
router.get('/posts/addComments/:idR/:idP',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addComment', {type: tipoUser, d: data });
});
/* GET /posts/seeComments/:idR/:idP */
router.get('/posts/seeComments/:idR/:idP',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.apiAccessPoint+"/posts/seeComments/"+req.params.idR+"/"+req.params.idP+"?token=" + req.cookies.token)
    .then(process =>{
      var numberComments= process.data.length
      if (numberComments > 0){
        if (tipoUser == "User"){
          res.render('commentsList', {type: tipoUser, p: process.data, d: data,idR:req.params.idR,idP:req.params.idP});
        }
        else {
          res.render('commentsListAdmin', {type: tipoUser, p: process.data, d: data,idR:req.params.idR,idP:req.params.idP});
        }
      }
      else {
        res.redirect('/processos/'+req.params.idR+'/posts');
      }
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota GET /posts/seeComments/:idR/:idP"})
    })
});

/* GET /adminUsers */
router.get('/adminUsers',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  axios.get(env.authAccessPoint+"/get?token=" + req.cookies.token)
    .then(users =>{
      res.render('usersList', {type: tipoUser, u: users.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no users da rota GET /posts/seeComments/:id"})
    })
});

/* GET /edit/user/:username */
router.get('/edit/user/:username',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('userEditPage', {type: tipoUser, u: req.params.username, d: data });
   
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
  res.render('userEditPage', {type: tipoUser, u: req.params.username, d: data });
   
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
      res.render('userDeletePage', {type: tipoUser, u: dados.data, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no dados da rota GET /delete/user/:username"})
    })
});

/* GET /processos/:id/addLigacoes  */
router.get('/processos/:id/addLigacoes',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('addLigacoesPage', {type: tipoUser, id:req.params.id,d: data});
   
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

/* GET /pesquisaRapida/:exp */
router.get('/pesquisaRapida/:exp',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get(env.apiAccessPoint+"/regexSearch/"+req.params.exp+"?token=" + req.cookies.token)
    .then(dados => {
      res.render('searchList', {type: tipoUser, plist: dados.data, d: data });
    })
  .catch(erro => {
      res.render('error', {error: erro, message: "Erro no dados da rota GET /pesquisaRapida/:exp"})
  })
   
});

/* GET /search */
router.get('/search',verificaToken, function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  res.render('searchPage', {type: tipoUser, d: data});
   
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
    res.render ('searchList', {type: tipoUser, plist:dados.data,d:data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro nos dados da rota GET /searchReg?..."});
  })
});
/* GET /posts/deletePost/:idR/:idP*/
router.get('/posts/deletePost/:idR/:idP',verificaToken, function(req, res, next) {
  axios.delete(env.apiAccessPoint+"/posts/deletePost/"+req.params.idR+"/"+req.params.idP+"?token=" + req.cookies.token)
    .then(process=>{
        res.redirect('/processos/'+req.params.idR+'/posts')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota GET /posts/deletePost/:id?..."})
    })
});

/* GET /posts/deleteComment/:idR/:idP?...*/
router.get('/posts/deleteComment/:idR/:idP',verificaToken, function(req, res, next) {
  result = getFieldsWithContent(req.query)
  queryString=convertObjectToQueryString(result)
  axios.delete(env.apiAccessPoint+"/posts/deleteComment/"+req.params.idR+"/"+req.params.idP+"?token=" + req.cookies.token+"&"+queryString)
    .then(process=>{
        res.redirect('/posts/seeComments/'+req.params.idR+"/"+req.params.idP)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process da rota GET /posts/deleteComment/:idR/:idP?..."})
    })
});

/*GET /processos/:id/deleteLigacoes */
router.get('/processos/:id/deleteLigacoes',verificaToken,function(req, res,next){
  var data = new Date().toISOString().substring(0, 16);
  axios.get(env.apiAccessPoint+"/processos/"+req.params.id+"/deleteLigacoes?token="+req.cookies.token)
  .then(process =>{
    res.render ('deleteLigacoes', {type: tipoUser, llist:process.data,d:data,id:req.params.id});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro no process da rota GET /processos/:id/deleteLigacoes"})
  })
});
/* POST /processos/:id/deleteLigacoes */
router.post('/processos/:id/deleteLigacoes',verificaToken, function(req, res, next) {
  axios.post(env.apiAccessPoint+"/processos/"+req.params.id+"/deleteLigacoes?token=" + req.cookies.token,req.body.elementoSelec)
    .then(process =>{
      res.redirect('/retrieveAll');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process do POST /processos/:id/deleteLigacoes"})
    })
});
/* POST /deactivate/user/:username */
router.post('/deactivate/user/:username',verificaToken, function(req, res, next) {
  axios.put(env.authAccessPoint+"/deactivate/user/"+req.params.username+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/adminUsers');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process do  POST /deactivate/user/:username"})
    })
});

/* POST /activate/user/:username */
router.post('/activate/user/:username',verificaToken, function(req, res, next) {
  axios.put(env.authAccessPoint+"/activate/user/"+req.params.username+"?token=" + req.cookies.token,req.body)
    .then(process =>{
      res.redirect('/adminUsers');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no process do  POST /activate/user/:username"})
    })
});
module.exports = router;