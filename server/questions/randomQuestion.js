const QuestionModel = require('./question.model');

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
    } finally {
        console.log(error); 
    }
}

const checkAnswer = async (userId, questionId, ans) => {
    try {
        
    } catch (error) {
        throw error; 
    } finally {
        console.log(error); 
    }
}

module.exports = getRandomQuestions;