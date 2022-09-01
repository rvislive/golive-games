const RoomModel = require('./room.model');
const getRandomQuestions = require('../questions/question');
const UserModel = require('../users/user.model');

// join-room
const joinRoom = async (userName, roomName) => {
    try {
        const roomData = await RoomModel.findOne({ roomName: roomName }, { memebers: 1 }).lean(); 
        if(roomData.members > 0) {
            const questions = await getRandomQuestions();
            return questions;
        }
        await RoomModel.updateOne({ roomName: roomName }, { members : [ userName ] });
    } catch (error) {
        throw error;
    }
}

// check Answer
const showAnswer = async (userName, roomName) => {
    try {
        const markData = await UserModel.findOne({ name: userName, roomName: roomName}, { marks : 1 }).lean().exec();
        return markData.marks; 
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    joinRoom,
    showAnswer
} 