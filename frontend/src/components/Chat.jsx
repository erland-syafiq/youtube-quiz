import React, { useEffect } from 'react';
import styles from './Chat.module.css';
import loading from '../assets/loading.svg';
import isExtension from '../isExtension.js';

function Chat() {
    useEffect(() => {
        console.log("Component has mounted");
        if (isExtension()) {
            chrome.storage.local.get("tab_url", (url) => {
                console.log(url.tab_url);
            })
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