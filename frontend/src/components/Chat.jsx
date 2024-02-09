import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import loading from '../assets/loading.svg';
import isExtension from '../isExtension.js';
import useWebSocket, {ReadyState} from 'react-use-websocket';

const DEFAULT_URL = "https://www.youtube.com/watch?v=x7X9w_GIm1s";
const WS_URL = "ws://localhost:8080/";

function Chat() {
    const [messages, setMessages] = useState([]);

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

    function onReceived() {
        console.log(lastJsonMessage)
    }

    useEffect(() => {
        console.log("Connection state changed");

        if (isExtension()) 
            chrome.storage.local.get("tab_url", connectChat)
        else
            connectChat(DEFAULT_URL);
    }, [readyState]);

    useEffect(onReceived, [lastJsonMessage]);

    return (
        <div className={styles.chat}>     
                <img src={loading} className={styles.loading}></img>
                <h2 className={styles.loadingSubtitle}>Loading transcript...</h2>
        </div>
    );
};

export default Chat;