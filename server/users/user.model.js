const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    roomName: String,
    marks: Number
}, { timestamps: true }); 

const UserModel = mongoose.model('users', Schema);
module.exports = UserModel;