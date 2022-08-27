const mongoose = require('mongoose');

const getDbConnection = async () => {
    await mongoose.connect('mongodb://localhost:27017/local', (err) => {
        if(err) {
            console.log("Failed to connect db");
        }
        console.log("DB Connected to LocalDb");
    });
}

getDbConnection(); 