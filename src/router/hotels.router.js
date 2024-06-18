const router = require("express").Router()
const controllers = require("../controllers/hotel.controller")


router.get("/", controllers.GetHotels)
router.post("/", controllers.CreateHotel)
router.get("/:id", controllers.FindHotelById)
router.put("/:id", controllers.UpdateHotelById)
router.delete("/:id", controllers.DeleteHotelById)

module.exports = router