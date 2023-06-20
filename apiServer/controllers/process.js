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

module.exports.addPost = async (post) => {
    try {
      const process = await Process.findById(post._id);
      if (!process) {
        throw new Error('Process not found');
      }
  
      process.posts.push(post);
      await process.save();
  
      return { mensagem: 'Post adicionado com sucesso.' };
    } catch (error) {
      throw new Error('Ocorreu um erro ao adicionar o post: ' + error.message);
    }
};

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

module.exports.addCommentToPost = async (postId, comment) => {
    try {
      const process = await Process.findById(postId);
      if (!process) {
        throw new Error('Process not found');
      }
  
      const post = process.posts.find((p) => p._id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
  
      post.Comments.push(comment);
      await process.save();
  
      return process;
    } catch (error) {
      throw new Error('Failed to add comment to post: ' + error.message);
    }
  };

module.exports.getComments = id => {
    return Process
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.addLigacao = async (link, processId) => {
    try {
      const process = await Process.findById(processId);
      if (!process) {
        return { error: 'Process not found' };
      }
  
      process.ligacoes.push(link.Description);
      await process.save();
  
      return { message: 'Link added successfully' };
    } catch (error) {
      console.error(error);
      return { error: 'Server error' };
    }
  };

module.exports.getProcessos = query => {
    return  Process
    .find(query)
     .then(dados=>{
         return dados
     })
     .catch(erro =>{
         return erro
     })
}

module.exports.deletePost = async (postParams, processId) => {
    try {
      const process = await Process.findById(processId); // Encontre o processo com base no ID
  
      if (!process) {
        return { success: false, message: 'Process not found' };
      }
  
      const postIndex = process.posts.findIndex(post =>
        post.Title === postParams.Title &&
        post.Type === postParams.Type &&
        post.Description === postParams.Description
      );
  
      if (postIndex === -1) {
        return { success: false, message: 'Post not found' };
      }
  
      process.posts.splice(postIndex, 1); // Remova o post do array de subdocumentos
  
      await process.save(); // Salve as alterações no processo
  
      return { success: true, message: 'Post deleted successfully' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Internal server error' };
    }
  };

  module.exports.deleteComment = async (postParams, processId) => {
    try {
      // Procura o processo pelo ID
      const process = await Process.findById(processId);
  
      if (!process) {
        return { status: 404, message: 'Processo não encontrado' };
      }
  
      // Procura o índice do comentário com base no conteúdo
      const commentIndex = process.posts.findIndex(
        (post) => post.Comments.Description === postParams.commentContent
      );
  
      if (commentIndex === -1) {
        return { status: 404, message: 'Comentário não encontrado' };
      }
  
      // Remove o comentário da array de comentários
      process.posts[commentIndex].Comments.splice(commentIndex, 1);
  
      // Salva as alterações no processo
      await process.save();
  
      return { status: 200, message: 'Comentário removido com sucesso' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Erro ao apagar o comentário' };
    }
  };