var express = require('express');
var router = express.Router();
var Process = require('../controllers/process');
/* GET home page. */
router.get('/processos', function(req, res, next) {
  
  Process.list()
    .then (dados=> {
      /*res.render('index', { plist: dados, d: data });*/
      res.json(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});
router.get('/processos/registo', function(req, res, next) {
  
  res.render('addProcess', {d: data });
});
router.get('/processos/:id', function(req, res, next) {
  
  Process.getProcess(req.params.id)
    .then(dados => {
      /* res.render('process', { p: dados, d: data }); */
      res.json(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});
router.get('/processos/edit/:id', function(req, res, next) {
  
  Process.getProcess(req.params.id)
    .then(process => {
      /* res.render('ProcessFormEditPage', { p: process, d: data }); */
      res.json(process);
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição do processo pedido"})
    })
});
router.get('/processos/delete/:id', function(req, res, next) {
  
  Process.getProcess(req.params.id)
    .then(process => {
      /* res.render('processDeletePage', { p: process, d: data }); */
      res.json(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do processo em questão"})
    })
});
router.post('/processos',(req,res) => {
  Process.addProcess(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro:erro}))

})
router.post('/processos/edit/:id', function(req, res, next) {
  
  Process.updateProcess(req.body)
    .then(process =>{
      /* res.redirect('/processos') */
      res.json(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição do processo"})
    })
});
router.post('/processos/registo', function(req, res, next) {
  
  Process.addProcess(req.body)
  .then(process=>{
    /* res.redirect('/processos') */
    res.json(process)
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro no armazenamento do registo de aluno"})
  })
});
router.put('/processos/:id',(req,res) => {
  Process.updateProcess(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).json({erro:erro}))

})

router.delete('/processos/delete/:id',(req,res) => {
  Process.deleteProcess(req.params.id)
    .then(dados => /* res.redirect('/processos') */res.json(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

/* POST Delete Process */
router.post('/processos/delete/:id', function(req, res, next) {
  
  Process.deleteProcess(req.params.id)
    .then(process =>{
      /* res.redirect('/processos') */
      res.json(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na eliminação do processo"})
    })
});
module.exports = router;
