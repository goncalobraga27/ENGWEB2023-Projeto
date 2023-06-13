var express = require('express');
var router = express.Router();
var Process = require('../controllers/process');
/* GET home page. */
router.get('/api/processos', function(req, res, next) {
  Process.list()
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/api/len', function(req, res, next) {
  Process.listLength()
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/api/processos/nome', function(req, res, next) {
  
  Process.listnome()
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});
router.get('/api/processos/lugar', function(req, res, next) {
  
  Process.listlugar()
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});
router.get('/api/processos/data', function(req, res, next) {
  
  Process.listdata()
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});
router.get('/api/processos/:id', function(req, res, next) {
  Process.getProcess(req.params.id)
    .then(dados => {
      res.jsonp(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});
router.get('/api/processos/edit/:id', function(req, res, next) {
  Process.getProcess(req.params.id)
    .then(process => {
      res.jsonp(process);
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição do processo pedido"})
    })
});
router.get('/api/processos/delete/:id', function(req, res, next) {
  Process.getProcess(req.params.id)
    .then(process => {
      res.jsonp(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do processo em questão"})
    })
});
router.post('/api/processos',(req,res) => {
  Process.addProcess(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro:erro}))

})
router.post('/api/processos/edit/:id', function(req, res, next) {
  Process.updateProcess(req.body)
    .then(process =>{
      res.jsonp(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição do processo"})
    })
});
router.post('/api/processos/registo', function(req, res, next) {
  Process.addProcess(req.body)
  .then(process=>{
    res.jsonp(process)
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro no armazenamento do registo de aluno"})
  })
});
router.put('/api/processos/:id',(req,res) => {
  Process.updateProcess(req.body)
    .then(
      dados => {res.jsonp(dados)}
    )
    .catch(erro => res.status(604).json({erro:erro}))

})

router.delete('/api/processos/delete/:id',(req,res) => {
  Process.deleteProcess(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

router.get('/api/:pag', function(req, res, next) {
  console.log("Estou aqui")
  Process.listLimit(req.params.pag)
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/api/:pag/nome', function(req, res, next) {
  Process.listLimitNome(req.params.pag)
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/api/:pag/data', function(req, res, next) {
  Process.listLimitData(req.params.pag)
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});
router.get('/api/:pag/lugar', function(req, res, next) {
  Process.listLimitLugar(req.params.pag)
    .then (dados=> {
      res.jsonp(dados)
    }
    )
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.post('/api/processos/posts/add',function(req, res, next){
  Process.addPost(req.body)
  .then(process=>{
    res.jsonp(process)
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro no armazenamento do registo de um post"})
  })
});

router.get('/api/processos/:id/posts', function(req, res, next) {
  Process.getPosts(req.params.id)
    .then(process => {
      res.jsonp(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do processo em questão"})
    })
});

router.post('/api/posts/addComments/:id',function(req, res, next){
  Process.addCommentToPost(req.params.id,req.body)
  .then(process=>{
    res.jsonp(process)
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro no armazenamento do registo de um post"})
  })
});

router.get('/api/posts/seeComments/:id', function(req, res, next) {
  Process.getComments(req.params.id)
    .then(process => {
      res.jsonp(process)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do processo em questão"})
    })
});

module.exports = router;
