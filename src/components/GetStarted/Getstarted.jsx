import React, { useRef, useState } from 'react'
import styles from "./Getstarted.module.css"
import { socket } from '../../socket/connection'
import { nanoid } from 'nanoid'
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { loadingactions } from '../../store'

const Getstarted = () => {

  const joinroomCode = useRef(null)
  const [joinroomerror, setjoinroomerror] = useState(null)
  const dispatch = useDispatch()


  const navigate = useNavigate()
  const languageRef = useRef()
  const connectWithSocket = () => {
    const tempararyID = localStorage.getItem("tempID") || nanoid(8)
    const roomID = nanoid(6)
    console.log(tempararyID, roomID)
    try {
      dispatch(loadingactions.setLoading(true))
      socket.emit('create-room', {
        tempararyID,
        roomID,
        firstLanguage: languageRef.current.value
      })

    } catch (error) {
      dispatch(loadingactions.setLoading(false))

      console.log(error)
    }
    socket.on("room-joined", msg => {
      localStorage.setItem("tempID", tempararyID)
      localStorage.setItem("roomID", roomID)
      console.log(msg)
      // window.open(`http://localhost:3000/`, null , 'popup')
      toast.info('Someone Joined', msg.roomID)
      dispatch(loadingactions.setLoading(false))
      // alert(`I joined at ${msg.roomID}`)
      navigate(`/code/${msg.roomID}`)

    })
  }
  const joinroom = () => {
    const tempararyID = localStorage.getItem("tempID") || nanoid(8)
    if (!joinroomCode.current.value) return setjoinroomerror("Can't be empty value");
    dispatch(loadingactions.setLoading(true))

    socket.emit("join-room", {

      roomID: joinroomCode.current.value,
      tempararyID,

    })
    socket.on("room-joined", msg => {
      localStorage.setItem("tempID", tempararyID)
      localStorage.setItem("roomID", joinroomCode.current.value)
      console.log(msg)
      // window.open(`http://localhost:3000/`, null , 'popup')
      // alert(`I joined at ${msg.roomID}`)
      toast.info('Someone Joined', msg.roomID)
      dispatch(loadingactions.setLoading(false))

      navigate(`/code/${msg.roomID}`)

    })
  }

  return (
    <div className={styles.getstartedcont}>

      <div className={styles.Getstarted} >
        <div className={styles.cont}>
          <h1>Create a Room</h1>
          <select name="language" id="" ref={languageRef} required>
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
          <input type="text" name='roomCode' placeholder='Enter Room Code' ref={joinroomCode} />
          {joinroomerror && <p style={{ color: "red" }} >{joinroomerror}</p>}
          <button onClick={joinroom} >Join</button>
        </div>
      </div>
    </div>
  )
}

export default Getstarted
