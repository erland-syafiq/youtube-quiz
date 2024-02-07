const express = require('express');
const app = express();
const PORT = 8080;

app.get('/test', async (req, res) => {
    factsResponse = await fetch("https://cat-fact.herokuapp.com/facts");
    if (factsResponse.ok) {
        const data = await factsResponse.json();
        res.json(data);
    }
    else {
        console.log(res)
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to the Youtube Quizzer API!");
})

app.listen(PORT);