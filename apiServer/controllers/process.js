var Process = require("../models/process")

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

module.exports.listLimit = (x) => {
    return  Process
    .find({ _id: { $gt: 1348406 +x*500 } })
      .limit(500) // 1348406
     .then(dados=>{
         return dados
     })
     .catch(erro =>{
         return erro
     })
 
 }
module.exports.listLimitNome = (x) => {
    return  Process
    .find({ _id: { $gt: 1348406 +x*500 } })
    .sort({UnitTitle:1})
    .limit(500) // 1348406
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
 
}
module.exports.listLimitData = (x) => {
    return  Process
    .find({ _id: { $gt: 1348406 +x*500 } })
    .sort({Created:1})
    .limit(500) // 1348406
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
 
}
module.exports.listLimitLugar = (x) => {
    return  Process
    .find({ _id: { $gt: 1348406 +x*500 } })
    .sort({Repository:1})
    .limit(500) // 1348406
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
 
}
module.exports.listLength = () => {
    return  Process
    .count()
    .then(dados=>{
        //console.log(dados)
        return dados
    })
    .catch(erro =>{
         return erro
    })
 
}

module.exports.listnome = () => {
    return  Process
    .find()
    .sort({UnitTitle:1})
     .then(dados=>{
         return dados
     })
     .catch(erro =>{
         return erro
     })
 
 }
 module.exports.listdata = () => {
    return  Process
    .find()
    .sort({Created:1})
     .then(dados=>{
         return dados
     })
     .catch(erro =>{
         return erro
     })
 
 }
 module.exports.listlugar = () => {
    return  Process
    .find()
    .sort({Repository:1})
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

module.exports.addPost = post =>{
    try{
        const proc = Process.find({_id:post._id})
        proc.posts.push(post)
        proc.save()
        return { mensagem: 'Post adicionado com sucesso.' };
    }
    catch (error) { 
        throw new Error('Ocorreu um erro ao adicionar o post.');
    }
}

module.exports.getPosts = id => {
    return Process
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}