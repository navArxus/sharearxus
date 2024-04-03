import React from 'react'
import styles from "./Getstarted.module.css"
import { socket } from '../../socket/connection'
import { nanoid } from 'nanoid'
import {useNavigate} from "react-router-dom"

const Getstarted = () => {

  const navigate = useNavigate()

  const connectWithSocket = () => {
    const tempararyID = localStorage.getItem("tempID") || nanoid(8)
    const roomID =  "Gxp7cF"
    console.log(tempararyID, roomID)
    try {
      socket.emit('create-room', {
        tempararyID,
        roomID
      })
      
    } catch (error) {
      console.log(error)
    }
    socket.on("room-joined", msg => {
      localStorage.setItem("tempID", tempararyID)
      localStorage.setItem("roomID", roomID)
      console.log(msg)
      // window.open(`http://localhost:3000/`, null , 'popup')
      alert(`I joined at ${msg.roomID}`)
      navigate(`/code/${msg.roomID}`)

    })
  }


  return (
    <div className={styles.getstartedcont}>

      <div className={styles.Getstarted} >
        <div className={styles.cont}>
          <h1>Create a Room</h1>
          <select name="language" id="">
            <option value="java">java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="others">others</option>
          </select>
          <button onClick={connectWithSocket} >Create Room</button>
        </div>
        <div className={styles.cont}>
          <h1>Join room</h1>
          <input type="text" name='roomCode' placeholder='Enter Room Code' />
          <button>Join</button>
        </div>
      </div>
    </div>
  )
}

export default Getstarted
