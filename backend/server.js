/**
 * Backend for Youtube Quizzer App
 * 
 * Takes in a youtube video id and creates a quiz from it
 * 
 * @author Erland A. Syafiq
 * 
 */

import { YoutubeTranscript } from 'youtube-transcript';

import express from 'express';
const app = express();
const PORT = 8080;

// n2Fluyr3lbc
/**
 * 
 */
app.get("/decode", async (req, res) => {
    try {
        
        const transcript = await YoutubeTranscript.fetchTranscript("n2Fluyr3lbc");
        res.send(transcript);
    }
    catch (e) {
        console.log("Client sent invalid URL");
        res.status(400).json({
            "message": "Invalid url"
        });
        
    }
    
})

app.get('/test', async (req, res) => {
    factsResponse = await fetch("https://cat-fact.herokuapp.com/facts");
    if (factsResponse.ok) {
        const data = await factsResponse.json();
        res.json(data);
    }
    else {
        console.log(factsResponse)
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to the Youtube Quizzer API!");
})

app.listen(PORT);