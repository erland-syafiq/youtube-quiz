import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.highlight}>
            <h1 className={styles.h1}>AI Video Quizzer</h1>
        </div>
    );
};

export default Navbar;