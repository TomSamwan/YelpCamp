const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//    V V Here V V
const UserSchema = new Schema({});

// adds a username and password to ^^^ UserSchema ^^^
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);