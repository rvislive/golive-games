const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

const PORT = process.env.PORT || 4000;
app.use(cors());

// db connection & random questions function
require('./server/utils/mongoose');
const { getUser, addUpdateUser, deleteUser, getUserMarks } = require('./server/users/user');
const { joinRoom } = require('./server/room/room');
const { submitAnswer } = require('./server/questions/question');

// socket io connection start & end 
let users = [];
io.on("connection", (client) => {
    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== client.id);
    });

    // join game events
    client.on("join-game", async (userName, roomName) => {
        users.push({
            socketId: client.id,
            userName: userName,
            roomName: roomName
        });
        await addUpdateUser(users);
        const roomData = joinRoom(userName, roomName);
        return roomData; 
    });

    // person to play & other user as well
    client.on("submit-answer", async (room, answer, otherUserId = "") => {
        await submitAnswer(room, otherUserId, answer);
    });

    client.on("show-answer", async (room, otherUserId = "") => {
        subscribeOtherUser(room, otherUserId);
        await getUserMarks(otherUserId, room); 
        client.join(room);
    });

    // leave playground
    client.on("leave", (room) => {
        client.leave(room);
    });
});

function subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
            socketConn.join(room);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server Connected with http://localhost:${PORT}`);
});