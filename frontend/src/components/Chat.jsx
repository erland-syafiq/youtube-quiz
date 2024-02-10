import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import loading from '../assets/loading.svg';
import isExtension from '../isExtension.js';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import ChatBubble from './ChatBubble.jsx';

const DEFAULT_URL = "https://www.youtube.com/watch?v=x7X9w_GIm1s";
const WS_URL = "ws://localhost:8080/";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [currMessage, setCurrMessage] = useState("");

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    function connectChat(url) {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                event: "meta",
                data: {
                    "url": url
                }
            });
        }
    }

    function recordMessage() {
        if (!lastJsonMessage) {
            return;
        }
        if (messages && messages.length > 0 && Object.entries(lastJsonMessage).toString() === Object.entries(messages.at(-1)).toString()){
            return;
        }
        setMessages([...messages, lastJsonMessage])
    }

    useEffect(() => {
        console.log("Connection state changed");

        if (isExtension()) 
            chrome.storage.local.get("tab_url", connectChat)
        else
            connectChat(DEFAULT_URL);
    }, [readyState]);

    useEffect(recordMessage, [lastJsonMessage]);

    useEffect(() => {
        console.log("Messages: ");
        console.log(messages);
    })

    function handleChange(event) {
        setCurrMessage(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const message = {
            event: 'user',
            data: {
                "message": currMessage
            },
            id: Math.random(99999)
        }
        setMessages([...messages, message]);
        setCurrMessage("");
        sendJsonMessage(message)
    }

    if (!messages)
        return (
            <div className={styles.chat}>     
                    <img src={loading} className={styles.loading}></img>
                    <h2 className={styles.loadingSubtitle}>Loading transcript...</h2>
            </div>
        );
    return (
        <div className={styles.chat}>
            { messages.map((message) => (
                <ChatBubble key={message.id} message={message.data["message"]} type={message.event} />
            ))}
            <form onSubmit={handleSubmit} className={styles.form}>  
                <input type="text" className={styles.input} value={currMessage} onChange={handleChange}/>
                <input type="submit" value="Submit" className={styles.submit} />
            </form>
        </div>
    )
};

export default Chat;