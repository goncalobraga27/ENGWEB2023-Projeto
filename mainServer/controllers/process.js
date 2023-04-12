
var axios = require('axios')
/*
// Process list
module.exports.list = () => {
   return  Process
   .find()
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}

module.exports.getProcess = id => {
    return Process
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.addProcess = p => {
    return Process.create(p)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.updateProcess = p => {
    return Process.updateOne({_id:p._id},p)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.deleteProcess = id => {
    return Process.deleteOne({_id:id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}
*/

// Pedido da lista de processos
module.exports.list = () => {
    return axios.get('http://localhost:3000/processos')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Pedido de um processo
module.exports.getProcesso = id => {
    return axios.get('http://localhost:3000/processos/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Adicionar de um processo
module.exports.addProcesso = p => {
    return axios.post('http://localhost:3000/processos' ,p)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Adicionar um processo
module.exports.updateProcesso = p => {
    return axios.put('http://localhost:3000/processos/' + p._id,p)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Remover um processo
module.exports.deleteProcesso = p => {
    return axios.delete('http://localhost:3000/processos/' + p.id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}