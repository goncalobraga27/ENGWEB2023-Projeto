
var axios = require('axios')

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
module.exports.listnome = () => {
    return axios.get('http://localhost:3000/processos/nome')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
module.exports.listlugar = () => {
    return axios.get('http://localhost:3000/processos/lugar')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
module.exports.listdata = () => {
    return axios.get('http://localhost:3000/processos/data')
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
                console.log(resposta.data)
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Adicionar de um processo
module.exports.addProcesso = p => {
    return axios.post('http://localhost:3000/processos/registo' ,p)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
// Adicionar um processo
module.exports.updateProcesso = p => {
    console.log(p)
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
    return axios.delete('http://localhost:3000/processos/delete/' + p.id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}