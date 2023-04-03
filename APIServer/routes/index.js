var express = require('express');
var router = express.Router();
var Process = require('../controllers/process');
/* GET home page. */
router.get('/processos', function(req, res, next) {
  console.log("Estou a user a get para ver a lista de processos")
  var data = new Date().toISOString().substring(0, 16)
  Process.list()
    .then (dados=> {
      res.render('index', { plist: dados, d: data });
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/processos/:id', function(req, res, next) {
  console.log("Estou a user a get para ver o processo")
  Process.getProcess(req.params.id)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

router.post('/processos',(req,res) => {
  console.log("Estou a user a post para colocar o processo")
  Process.addProcess(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro:erro}))

})

router.put('/processos/:id',(req,res) => {
  console.log("Estou a user a get para dar o update ao processo")
  Process.updateProcess(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).json({erro:erro}))

})

router.delete('/processos/:id',(req,res) => {
  console.log("Estou a user a get para deletar o processo")
  Process.deleteProcess(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

module.exports = router;
