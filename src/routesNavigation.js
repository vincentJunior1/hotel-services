const router = require('express').Router()
const hotelRoutes = require("./router/hotels.router")

router.use("/hotel", hotelRoutes)

module.exports = router