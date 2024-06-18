const express = require('express')
const app = express()
const dotenv = require('dotenv')
const routesNavigation = require("./src/routesNavigation")
dotenv.config()

const http = require('http')
const server = http.createServer(app)
const connection = require("./src/config/db")

connection()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use("/api", routesNavigation)


server.listen(process.env.PORT, () => {
    console.log(`This server running in port: ${process.env.PORT}`)
})