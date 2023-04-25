var express = require('express');
var router = express.Router();
var Process = require('../controllers/process');

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
      res.render('process', { p: dados, d: data }); 
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
