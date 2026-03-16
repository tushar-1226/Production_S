const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const rideRoutes = require('./routes/ride.routes')
const mapsRoutes = require('./routes/maps.routes')

const app = express()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/ride', rideRoutes)
app.use('/api/maps', mapsRoutes)

module.exports = app