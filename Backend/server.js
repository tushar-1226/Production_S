require('dotenv').config()
const http = require('http')
const socketIO = require('socket.io')











const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()

const server = http.createServer(app)

const io = socketIO(server, {
    cors: {
        origin: "*"
    }
})

// SOCKET LOGIC 
io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data })
    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})

server.listen(3003, () => {
    console.log("Server is running on port 3003")
})