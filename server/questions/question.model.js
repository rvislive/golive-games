const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    question: String,
    answers: [ String ],
    correctIndex: Number
}, { timestamps: true }); 

const QuestionModel = mongoose.model('questions', Schema);
module.exports = QuestionModel;