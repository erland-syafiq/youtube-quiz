import React from 'react';
import styles from './Chat.module.css';
import loading from '../assets/loading.svg';

function Chat() {
    return (
        <div className={styles.chat}>     
                <img src={loading} className={styles.loading}></img>
                <h2 className={styles.loadingSubtitle}>Loading transcript...</h2>
        </div>
    );
};

export default Chat;