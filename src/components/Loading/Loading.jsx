import React from 'react'
import styles from "./Loading.module.css"
const Loading = () => {
    return (
        <div className={styles.loader_wrapper}>
            <div className={styles.loader}></div>
            <p>Sometimes it takes 50 seconds to spin up our backend instance.</p>
        </div>
    )
}

export default Loading
