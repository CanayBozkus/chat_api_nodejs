const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

const port = process.env.PORT ||  3000

const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(userRoutes)

app.listen(port, () => {
    console.log("Started")
})