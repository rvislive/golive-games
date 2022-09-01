const express = require('express');
const cors = require('cors');
const app = express();
const io = require('socket.io')(app);

const PORT = process.env.PORT || 4000;
app.use(cors());

// db connection & random questions function
require('./server/utils/mongoose');
const { getUser, addUpdateUser, deleteUser, getUserMarks } = require('./server/users/user');
const { joinRoom, showAnswer } = require('./server/room/room');
const { submitAnswer } = require('./server/questions/question');

// socket io connection start & end
io.on('connection', (socket) => {
    // join-game-room 
    // submit-answer
    socket.on("join-game-room", async (name, room) => {
        await joinRoom(name, room); 
    })

    socket.on("submit-answer", async (name, room, answer) => {
        await submitAnswer(name, room, answer); 
    })

    socket.on("disconnect", () => {
        
    })
})


app.listen(PORT, () => {
    console.log(`Server Connected with http://localhost:${PORT}`);
});