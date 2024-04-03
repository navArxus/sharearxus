import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styles from "./Code.module.css"
import Editor from "@monaco-editor/react";
import { BsClockHistory } from "react-icons/bs";
import { VscNewFile } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFileCode } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

const Code = () => {
    const { ID } = useParams()
    // const code = "console.log('Hello world')"
    const [code, setcode] = useState("")
    return (
        <div className={styles.Code}  >
            <div className={styles.sidebar}>
                <div className={styles.siderbarActions}><VscNewFile /><MdDeleteOutline /></div>
                <div className={styles.sidebarfiles}>
                    <span><FaRegFileCode />index.html</span>
                    <span><FaRegFileCode />index.html</span>
                    <span><FaRegFileCode />index.html</span>
                    <span><FaRegFileCode />index.html</span>
                </div>
            </div>
                <div className={styles.editorhead}>
                    <div className={styles.editorheadinfo}>
                        <h4>Room ID : {ID}</h4>
                        <span>
                            <div className={styles.editorheadcopy}><FiCopy /></div>
                            <button>Rollback Changes</button>
                            <button>Commit Changes</button>
                        </span>
                    </div>
                    <Editor
                        height="85vh"
                        width="72vw"
                        language="javascript"
                        theme="hc-black"
                        value={code}
                        onChange={val => setcode(val)}
                        options={{
                            inlineSuggest: true,
                            fontSize: "16px",
                            formatOnType: true,
                            autoClosingBrackets: true,
                            minimap: { scale: 10 }
                        }}
                    />
                </div>
            <div className={styles.sidebar}>
                    <h3>Activity</h3>
                    <p className={styles.activityspan} ><BsClockHistory />edited 5 hours ago </p>
                
            </div>
        </div>
    )
}

export default Code
