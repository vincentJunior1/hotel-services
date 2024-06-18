const router = require("express").Router()
const controllers = require("../controllers/hotel.controller")


router.get("/", controllers.GetHotels)
router.post("/", controllers.CreateHotel)

module.exports = router