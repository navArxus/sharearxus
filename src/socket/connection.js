import {io} from "socket.io-client"
// import server from "../server/url"
try {
    var connect = io("https://sharearxus-backend-mdh6.onrender.com")
} catch (error) {
    console.log(error)
}

export const socket = connect