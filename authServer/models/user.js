var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    username: String, 
    password: String,
    level: String, 
    dateCreated: String, 
    lastAccess: String, 
    active: Boolean,
    profilePic: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)