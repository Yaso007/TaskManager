const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const routeHandler = require('./routes/route')
PORT = 3000

const app = express()

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