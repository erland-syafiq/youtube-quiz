import React, { useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import loading from '../assets/loading.svg';
import isExtension from '../isExtension.js';
import useWebSocket from 'react-use-websocket';

function backendConnect(url) {
    if (!url) {
        console.log(`Error: Url, ${url}, undefined`);
    }
    console.log(`Reading transcript from url: ${url}`);
}

function Chat() {
    const connection = useRef(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/");

        socket.addEventListener("open", (event) => {
            socket.send("Connection established");
        });
    
        socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });
    
        connection.current = socket;
        console.log("Component has mounted");
        if (isExtension()) {
            chrome.storage.local.get("tab_url", backendConnect)
        }
    }, []);

    return (
        <div className={styles.chat}>     
                <img src={loading} className={styles.loading}></img>
                <h2 className={styles.loadingSubtitle}>Loading transcript...</h2>
        </div>
    );
};

export default Chat;