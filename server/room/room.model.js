const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    roomName: String,
    members: [ String ]
}, { timestamps: true }); 

const RoomModel = mongoose.model('rooms', Schema);
module.exports = RoomModel;