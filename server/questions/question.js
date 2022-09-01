const QuestionModel = require('./question.model');
const UserModel = require('../users/user.model');

const getRandomQuestions = async () => {
    try {
        const questions = await QuestionModel.find({}, { correctIndex: 0 }).lean().exec();
        const questionSet = new Set();
    
        while(questionSet.size !== 5) {
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            questionSet.add(randomQuestion);
        }
    
        let result = [];
        for (const item of questionSet) {
            result.push(item);
        }
        return result; 
    } catch (error) {
        throw error; 
    }
}

const submitAnswer = async (userName, roomName, answers) => {
    try {
        let marks = 0;
        answers.forEach((id, ans) => {
            const correctAns = await QuestionModel.findOne({ _id: id }, { correctIndex: 1 }).lean().exec();
            if(correctAns.correctIndex === ans) marks++;
        });

        await UserModel.create({ 
            name: userName,
            roomName: roomName,
            marks: marks
        });
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getRandomQuestions,
    submitAnswer
}