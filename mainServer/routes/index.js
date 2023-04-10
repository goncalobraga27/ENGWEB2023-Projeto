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

module.exports = router;
