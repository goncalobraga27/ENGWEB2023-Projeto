var jwt = require('jsonwebtoken')

module.exports.verificaAcesso = function (req, res, next){
    // Vai buscar o token primeiro à queryString e depois ao body
    var myToken = req.query.token || req.body.token
    // Se não tiver nem num, nem noutro este if dá falso
    if(myToken){
      jwt.verify(myToken, "EngWeb2023", function(e, payload){
        if(e){
          res.status(401).jsonp({error: e})
        }
        else{
          next()
        }
      })
    }
    else{
      res.status(401).jsonp({error: "Token inexistente!"})
    }
  }

