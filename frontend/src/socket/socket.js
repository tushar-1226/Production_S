import { io } from "socket.io-client"
import BASE_URL from "../config/api"

const socket = io(BASE_URL)

export default socket