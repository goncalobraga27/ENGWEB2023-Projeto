var User = require('../models/user')

// User list
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

// Active users
module.exports.activeUsers = () => {
    return User.find({active: true})
               .sort({nome: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Deactivate users
module.exports.deactiveUsers = () => {
    return User.find({active: false})
               .sort({nome: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Serve para buscar um utilzador e para verificar se ele existe
module.exports.getUser = username => {
    return User.findOne({username: username})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// u tem que ser o objeto do user
module.exports.addUser = u => {
    return User.create(u)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Atualiza o campo lastAccess
module.exports.loginUser = (username, data) => {
    return User.updateOne({username: username}, {$set: {lastAccess: data}})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Evitar mudar o username (pode causar problemas porque é considerado um id)
module.exports.updateUser = newUser => {
    return User.updateOne({username: newUser.username}, newUser)  
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Faz a desativação (e não e eliminação) de um utilizador
module.exports.deactivateUser = username => {
    return User.updateOne({username: username}, {$set: {active: false}})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

// Faz a ativação de um utilizador
module.exports.activateUser = username => {
    return User.updateOne({username: username}, {$set: {active: true}})
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