const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const app = express()

dotenv.config()

const port = process.env.PORT ||  3000

const userRoutes = require('./routes/userRoutes')

app.use(cookieParser())
app.use(express.json())
app.use(userRoutes)



mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vw09pqu.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => {
        console.log("Mongodb connected")
        app.listen(port, () => {
            console.log("Server Started")
        })
    })
    .catch(err => {
        console.log("Mongodb connection error", err)
    })