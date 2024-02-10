import React from 'react';
import styles from './ChatBubble.module.css';

function ChatBubble(props) {
    const roleStyle = props.type=="bot" ? styles.ChatBubbleBot : styles.ChatBubbleUser;
    
    return (
        <div className={`${styles.ChatBubble} ${roleStyle}`}>
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default ChatBubble;