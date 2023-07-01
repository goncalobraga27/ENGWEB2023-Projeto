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
    .find()
    .sort({UnitTitle:1})
    .skip(x * 500)
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
    .find()
    .sort({UnitDateFinal:1}) //.sort({Created:1})
    .skip(x * 500)
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
    .find({"ScopeContent": { $regex: /(?<=Natural e\/ou residente em ).+/}}).sort({ "ScopeContent": 1 })//.sort({Repository:1})
    .skip(x * 500)
    .limit(500) // 1348406
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
 
} // db.processes.find({"ScopeContent": { $regex: /(?<=Natural e\/ou residente em ).+/i, $options: 'i' }}).sort()
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

module.exports.addPost = async (post,idR) => {
    try {
      const process = await Process.findById(idR);
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


module.exports.addCommentToPost = async (idR, idP, commentData) => {
  try {
    const process = await Process.findById(idR).exec();
    if (!process) {
      
      return null;
    }

    const post = process.posts.find((p) => p._id === idP);
    if (!post) {

      return null;
    }

    post.Comments.push(commentData);
    await process.save();

   
    return post;
  } catch (error) {

    console.error('Erro ao adicionar o comentário:', error);
    throw error;
  }
};


  module.exports.getComments = async (idR, idP) => {
    try {
      const process = await Process.findById(idR).exec();
      if (!process) {
        // O processo com o _id fornecido não foi encontrado
        return null;
      }
  
      const post = process.posts.find((p) => p._id === idP);
      if (!post) {
        // O post com o _id fornecido não foi encontrado no processo
        return null;
      }
  
      const comments = post.Comments;
      return comments;
    } catch (error) {
      // Tratar erros de consulta do Mongoose
      console.error('Erro ao obter os comentários:', error);
      throw error;
    }
  };

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

module.exports.deletePost = async (idR, idP) => {
  try {
    const process = await Process.findById(idR); 
    const post = process.posts.find((p) => p._id === idP); 
    process.posts.pull({ _id: idP }); 
    await process.save(); 

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
};

module.exports.deleteComment = async (commentContent, idR, idP) => {
  try {
    const process = await Process.findById(idR); // Encontre o processo com base no ID

    if (!process) {
      return { success: false, message: 'Process not found' };
    }

    const post = process.posts.find((p) => p._id === idP); // Encontre o post com base no ID

    if (!post) {
      return { success: false, message: 'Post not found' };
    }

    const commentIndex = post.Comments.findIndex((comment) => comment.Description === commentContent.Description && comment.Autor === commentContent.Autor && comment.Assunto === commentContent.Assunto);

    if (commentIndex === -1) {
      return { success: false, message: 'Comment not found' };
    }

    post.Comments.splice(commentIndex, 1); // Remova o comentário do array de subdocumentos

    await process.save(); // Salve as alterações no processo

    return { success: true, message: 'Comment deleted successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
};

  module.exports.getLigacoes = id => {
    return  Process
    .findOne({_id: id})
     .then(dados=>{
         return dados.ligacoes
     })
     .catch(erro =>{
         return erro
     })
}
module.exports.deleteLigacao = async (ligacao,id) => {
    try {
      const processo = await Process.findById(id); // Encontre o documento do processo pelo _id
  
      if (!processo) {
        return { status: 404, message: 'Processo não encontrado' };
      }
  
      // Verifique se "ligacao" é um número ou uma lista de números
      if (Array.isArray(ligacao)) {
        // Remova todos os números presentes na lista "ligacao" da lista "ligacoes"
        processo.ligacoes = processo.ligacoes.filter(num => !ligacao.includes(num));
      } else {
        // Remova o número "ligacao" da lista "ligacoes"
        const keys = Object.keys(ligacao);
        const valor = keys[0];
        processo.ligacoes = processo.ligacoes.filter(num => num !== valor);
      }
  
      // Salve as alterações no documento do processo
      await processo.save();
  
      return processo;
    } catch (error) {
      return { status: 500, message: 'Erro ao apagar as ligações' };
    }
  };


module.exports.procuraRegex = (reg_ex) => {
    return  Process.
    find({ // nao falta?
    $or:[
      { _id: { $regex: reg_ex, $options: 'i' } },
      { DescriptionLevel: { $regex: reg_ex, $options: 'i' } },
      { EntityType: { $regex: reg_ex, $options: 'i' } },
      { CompleteUnitId: { $regex: reg_ex, $options: 'i' } },
      { UnitId: { $regex: reg_ex, $options: 'i' } },
      { RepositoryCode: { $regex: reg_ex, $options: 'i' } },
      { CountryCode: { $regex: reg_ex, $options: 'i' } },
      { UnitTitleType: { $regex: reg_ex, $options: 'i' } },
      { UnitTitle: { $regex: reg_ex, $options: 'i' } },
      { AlternativeTitle: { $regex: reg_ex, $options: 'i' } },
      { NormalizedFormsName: { $regex: reg_ex, $options: 'i' } },
      { OtherFormsName: { $regex: reg_ex, $options: 'i' } },
      { UnitDateInitial: { $regex: reg_ex, $options: 'i' } },
      { UnitDateFinal: { $regex: reg_ex, $options: 'i' } },
      { UnitDateInitialCertainty: { $regex: reg_ex, $options: 'i' } },
      { UnitDateFinalCertainty: { $regex: reg_ex, $options: 'i' } },
      { AllowUnitDatesInference: { $regex: reg_ex, $options: 'i' } },
      { AccumulationDates: { $regex: reg_ex, $options: 'i' } },
      { UnitDateBulk: { $regex: reg_ex, $options: 'i' } },
      { UnitDateNotes: { $regex: reg_ex, $options: 'i' } },
      { Dimensions: { $regex: reg_ex, $options: 'i' } },
      { AllowExtentsInference: { $regex: reg_ex, $options: 'i' } },
      { Repository: { $regex: reg_ex, $options: 'i' } },
      { Producer: { $regex: reg_ex, $options: 'i' } },
      { Author: { $regex: reg_ex, $options: 'i' } },
      { MaterialAuthor: { $regex: reg_ex, $options: 'i' } },
      { Contributor: { $regex: reg_ex, $options: 'i' } },
      { Recipient: { $regex: reg_ex, $options: 'i' } },
      { BiogHist: { $regex: reg_ex, $options: 'i' } },
      { GeogName: { $regex: reg_ex, $options: 'i' } },
      { LegalStatus: { $regex: reg_ex, $options: 'i' } },
      { Functions: { $regex: reg_ex, $options: 'i' } },
      { Authorities: { $regex: reg_ex, $options: 'i' } },
      { InternalStructure: { $regex: reg_ex, $options: 'i' } },
      { GeneralContext: { $regex: reg_ex, $options: 'i' } },
      { CustodHist: { $regex: reg_ex, $options: 'i' } },
      { AcqInfo: { $regex: reg_ex, $options: 'i' } },
      { Classifier: { $regex: reg_ex, $options: 'i' } },
      { ScopeContent: { $regex: reg_ex, $options: 'i' } },
      { Terms: { $regex: reg_ex, $options: 'i' } },
      { DocumentalTradition: { $regex: reg_ex, $options: 'i' } },
      { DocumentalTypology: { $regex: reg_ex, $options: 'i' } },
      { Marks: { $regex: reg_ex, $options: 'i' } },
      { Monograms: { $regex: reg_ex, $options: 'i' } },
      { Stamps: { $regex: reg_ex, $options: 'i' } },
      { Inscriptions: { $regex: reg_ex, $options: 'i' } },
      { Signatures: { $regex: reg_ex, $options: 'i' } },
      { Appraisal: { $regex: reg_ex, $options: 'i' } },
      { AppraisalElimination: { $regex: reg_ex, $options: 'i' } },
      { AppraisalEliminationDate: { $regex: reg_ex, $options: 'i' } },
      { Accruals: { $regex: reg_ex, $options: 'i' } },
      { Arrangement: { $regex: reg_ex, $options: 'i' } },
      { AccessRestrict: { $regex: reg_ex, $options: 'i' } },
      { UseRestrict: { $regex: reg_ex, $options: 'i' } },
      { PhysLoc: { $regex: reg_ex, $options: 'i' } },
      { OriginalNumbering: { $regex: reg_ex, $options: 'i' } },
      { PreviousLoc: { $regex: reg_ex, $options: 'i' } },
      { LangMaterial: { $regex: reg_ex, $options: 'i' } },
      { PhysTech: { $regex: reg_ex, $options: 'i' } },
      { OtherFindAid: { $regex: reg_ex, $options: 'i' } },
      { ContainerTypeTerm: { $regex: reg_ex, $options: 'i' } },
      { OriginalsLoc: { $regex: reg_ex, $options: 'i' } },
      { AltFormAvail: { $regex: reg_ex, $options: 'i' } },
      { RelatedMaterial: { $regex: reg_ex, $options: 'i' } },
      { Note: { $regex: reg_ex, $options: 'i' } },
      { AllowTextualContentInference: { $regex: reg_ex, $options: 'i' } },
      { TextualContent: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalDocumentState: { $regex: reg_ex, $options: 'i' } },
      { ApplySelectionTable: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalPolicy: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalReference: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalClassification: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalPeriod: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalApplyDate: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalFinalDestination: { $regex: reg_ex, $options: 'i' } },
      { RetentionDisposalObservations: { $regex: reg_ex, $options: 'i' } },
      { DescRules: { $regex: reg_ex, $options: 'i' } },
      { Revised: { $regex: reg_ex, $options: 'i' } },
      { Published: { $regex: reg_ex, $options: 'i' } },
      { Available: { $regex: reg_ex, $options: 'i' } },
      { Highlighted: { $regex: reg_ex, $options: 'i' } },
      { Creator: { $regex: reg_ex, $options: 'i' } },
      { Created: { $regex: reg_ex, $options: 'i' } },
      { Username: { $regex: reg_ex, $options: 'i' } },
      { ProcessInfoDate: { $regex: reg_ex, $options: 'i' } },
      { OtherDescriptiveData: { $regex: reg_ex, $options: 'i' } }
    ] 
    })
     .then(dados=>{
         return dados
     })
     .catch(erro =>{
         return erro
     })
  
  }
  