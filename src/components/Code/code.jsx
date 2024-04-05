import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import styles from "./Code.module.css"
import Editor from "@monaco-editor/react";
import { BsClockHistory } from "react-icons/bs";
import { VscNewFile } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFileCode } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import axios from 'axios'
import server from '../../server/url';
import { toast } from 'sonner'
import { socket } from '../../socket/connection';

const Code = () => {

    const { ID } = useParams()
    const [data, setdata] = useState(null)
    const [code, setcode] = useState("")
    useEffect(() => {
        axios.get(`${server}code/${ID}/detail`).then(res => {
            setcode(res.data.codeSnippet[0].code)
            setdata(res.data)
        })
        socket.emit("join-room", {
            roomID: ID,
        })
    }, [ID]);
    console.log(data)

    const refreshPage = () => {
        window.location.reload()
    }

    socket.on('new-commit', msg => {
        toast('New commit Avaiable', {
            action: {
                label: 'Add',
                onClick: () => refreshPage()
            },
        })
    })


    const commitCode = async () => {
        const res = await axios.post(`${server}code/${ID}/commit`, {
            roomID: ID,
            snippetName: "index",
            newCode: code
        })
        if (res.status === 200) {
            socket.emit('commit-message', {
                roomID: ID,
            })

            toast.success('Commit successfully', {
                duration: 2000,
            })
        } else {
            alert("Not updated")
        }
    }
    const copytoClipboard = () => {
        navigator.clipboard.writeText(code);
        toast.success('Text Copied', {
            duration: 2000,
        })
    }
    return (
        <div className={styles.Code}  >


            <div className={styles.sidebar}>
                <div className={styles.siderbarActions}><VscNewFile /><MdDeleteOutline /></div>
                <div className={styles.sidebarfiles}>
                    {
                        data?.codeSnippet?.map(doc => {
                            return (
                                <span key={doc._id} ><FaRegFileCode />{doc.name}.{doc.language}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.editorhead}>
                <div className={styles.editorheadinfo}>
                    <h4>Room ID : {ID}</h4>
                    <span>
                        <div className={styles.editorheadcopy} onClick={copytoClipboard} ><FiCopy /></div>
                        <button onClick={refreshPage} >Rollback Changes</button>
                        <button onClick={commitCode} >Commit Changes</button>
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
                {
                    data?.activity?.map(doc => {
                        return (
                            <p key={doc._id} className={styles.activityspan} ><BsClockHistory />{doc} </p>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Code
