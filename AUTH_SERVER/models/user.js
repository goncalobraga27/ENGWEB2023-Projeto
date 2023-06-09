var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String, // Considerado o id (NÃO REPETÍVEL)
    // O campo password não é guardado, apenas é guardado um hash da password  
    password: String,
    level: String, // Level: Consumer ou Producer ou Administrator
    dateCreated: String, // Data da inserção do utilizador na BD
    lastAccess: String, // Data do último login à plataforma
    active: Boolean, // Vai servir para ativar e desativar uma conta (ao invés de a eliminar) 
    profilePic: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)