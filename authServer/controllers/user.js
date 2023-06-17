var User = require('../models/user')


module.exports.list = () => {
    return User.find()
               .sort({nome: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}



module.exports.getUser = username => {
    return User.findOne({username: username})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addUser = u => {
    return User.create(u)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.loginUser = (username, data) => {
    return User.updateOne({username: username}, {$set: {lastAccess: data}})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateUser = newUser => {
    return User.updateOne({username: newUser.username}, newUser)  
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteUser = username => {
    return User.deleteOne({username:username})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}