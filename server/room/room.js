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

module.exports = {
    joinRoom
} 