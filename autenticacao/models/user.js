var mongoose = require ('mongoose');
const passport = require('passport');
    Schema = mongoose.Schema,
    passportLocalMoongose = require('passport-local-mongoose');



var User= new Schema({
    username: String,
    password: String,
    name: String
});

User.plugin(passportLocalMoongose);

module.exports = mongoose.model('user',User)