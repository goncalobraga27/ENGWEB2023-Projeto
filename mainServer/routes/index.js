var express = require('express');
var router = express.Router();
var Process = require('../controllers/process');
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
