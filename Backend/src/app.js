const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use(cors({
    credentials:true
}
))

module.exports = app;