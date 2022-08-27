const express = require('express');

// connect db
require('./server/utils/mongoose');

const getRandomQuestions = require('./server/questions/randomQuestion');

const hello = async () => {
    const he = await getRandomQuestions();
    console.log(he);
}

hello();