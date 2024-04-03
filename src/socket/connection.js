import {io} from "socket.io-client"
// import server from "../server/url"
try {
    var connect = io("http://localhost:5000/")
} catch (error) {
    console.log(error)
}

export const socket = connect