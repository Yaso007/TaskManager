const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"], // frontend URLs
    credentials: true,  // allow cookies, Authorization headers, etc.
  }));
app.use(cookieParser())

const routeHandler = require('./routes/route')
PORT = 3000


app.use(express.json())
app.use('/api',routeHandler)
console.log(process.env.MO)
// DB handling
mongoose.connect(`${process.env.MONGODB}`

).then(()=>{
    console.log("DB Connection Successful")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log("Sever started at port" + PORT)
})

//db connection