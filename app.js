const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()

dotenv.config()

const port = process.env.PORT ||  3000
const MONGODB_URL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?authSource=admin`

const socket = require('./socket')
const redis = require('./redis')

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const {checkLogin} = require("./middlewares/userMiddlewares");

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use(userRoutes)
app.use(messageRoutes)

mongoose
    .connect(MONGODB_URL)
    .then(async (result) => {
        console.log("Mongodb connected")
        const server = app.listen(port, () => {
            console.log("Server Started")
        })

        await redis.init()

        socket.init(server)
        socket.initListeners()


    })
    .catch(err => {
        console.log("Mongodb connection error", err)
    })