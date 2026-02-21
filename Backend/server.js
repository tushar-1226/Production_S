require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()
    

app.listen(3003, ()=>{
    console.log('Server is running on port 3003')
})