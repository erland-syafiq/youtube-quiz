/**
 * Backend for Youtube Quizzer App
 * 
 * Takes in a youtube video id and creates a quiz from it
 * 
 * @author Erland A. Syafiq
 * 
 */

// Import statements
import { YoutubeTranscript } from 'youtube-transcript';
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
const app = express();
const PORT = 8080;

// Set API keys
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
})


// https://www.youtube.com/watch?v=n2Fluyr3lbc
/**
 * 
 */
app.get("/quiz", async (req, res) => {
    try {
        const transcriptJSON = await YoutubeTranscript.fetchTranscript("https://www.youtube.com/watch?v=n2Fluyr3lbc");
        const transcript = decodeTranscript(transcriptJSON);
        const question = await getMultipleChoice(transcript);
        res.send(question);

    }
    catch (e) {
        console.log("Client sent invalid URL");
        console.log(e);
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

/**
 * Creates a structured question and answer json form a transcript
 * @param {string} transcript 
 * @returns {json}
 */
async function getMultipleChoice(transcript) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: 'user', content: 'Say this is a test'}],
        model: 'gpt-3.5-turbo'
    })
    console.log(chatCompletion.choices[0])
    return chatCompletion;
}
/**
 * Decodes the transcript list object and combines it all into one string
 * @param {list} transcriptList 
 * @returns 
 */
function decodeTranscript(transcriptList) {
    var s = "";
    transcriptList.forEach((transcriptSegment) => {
        s += transcriptSegment["text"];
    });
    return s;
}

app.listen(PORT);