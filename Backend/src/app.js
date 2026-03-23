const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const rideRoutes = require('./routes/ride.routes')
const mapsRoutes = require('./routes/maps.routes')

const app = express()

const FRONTEND_URL = "https://uber-2l52qy1pw-shivamk-techs-projects.vercel.app"

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/ride', rideRoutes)
app.use('/api/maps', mapsRoutes)

module.exports = app