require('dotenv').config()
const http = require('http')
const socketIO = require('socket.io')
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()

const server = http.createServer(app)

// ✅ FRONTEND URL
const FRONTEND_URL = process.env.FRONTEND_URL || "https://uber-zeta-henna.vercel.app"

const io = socketIO(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true
  }
})

// SOCKET LOGIC
io.on("connection", (socket) => {

  console.log("User connected:", socket.id)

  // join ride room
  socket.on("join-ride", (rideId) => {
    socket.join(`ride_${rideId}`)
    console.log(`User joined ride_${rideId}`)
  })

  // driver sends location
  socket.on("driver-location", ({ rideId, lat, lng }) => {
    socket.to(`ride_${rideId}`).emit("driver-location-update", {
      lat,
      lng
    })
  })

  // rider sends location
  socket.on("rider-location", ({ rideId, lat, lng }) => {
    socket.to(`ride_${rideId}`).emit("rider-location-update", {
      lat,
      lng
    })
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})