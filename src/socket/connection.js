import {io} from "socket.io-client"
// import server from "../server/url"
try {
    var connect = io("https://sharearxus.onrender.com")
} catch (error) {
    console.log(error)
}

export const socket = connect