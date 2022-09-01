const UserModel = require('./user.model');

// get-user
const getUser = async (name) => {
    try {
        const user = await UserModel.findOne({ name: name }, { name: 1, _id: 1 }).lean().exec();
        return user; 
    } catch (error) {
        throw error;
    }
}

// add-or-update-user
const addUpdateUser = async (reqBody) => {
    try {
        if(reqBody._id) {
            await UserModel.updateOne({ name: reqBody.name}, reqBody); 
        } else {
            await UserModel.create(reqBody);
        }
    } catch (error) {
        throw error;
    }
}

// delete-user
const deleteUser = async (userName) => {
    try {
        await UserModel.deleteOne({ name: userName });
    } catch (error) {
        throw error;
    }
}

// get-user-marks
const getUserMarks = async (userName, roomName) => {
    try {
        const marks = await UserModel.findOne({ name: userName, roomName: roomName }, { marks: 1 }).lean().exec();
        return marks || 0; 
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUser,
    addUpdateUser,
    deleteUser,
    getUserMarks
}