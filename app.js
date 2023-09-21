const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const app = express()

dotenv.config()

const port = process.env.PORT ||  3000
const MONGODB_URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?authSource=admin`

const socket = require('./socket')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')



app.use(cookieParser())
app.use(express.json())
app.use(userRoutes)
app.use(messageRoutes)

mongoose
    .connect(MONGODB_URL)
    .then(result => {
        console.log("Mongodb connected")
        const server = app.listen(port, () => {
            console.log("Server Started")
        })

        socket.init(server)

        const io = socket.getIO()

        io.on('connection', socket => {
            console.log('connected', socket.id)
        })
    })
    .catch(err => {
        console.log("Mongodb connection error", err)
    })