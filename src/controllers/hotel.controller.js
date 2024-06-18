const helpers = require("../helper/response")
const hotel = require("../repository/hotel.repository")
const hotelServices = require("../services/hotel.services")
const moment = require("moment")
module.exports = {
    GetHotels: async(req,res) => {
        try {
            let data = await hotelServices.GetAllHotel(req.query)
            helpers.response(res, 200, "Success",data)
        }catch(err) {
            helpers.response(res, 400, err)
        }
    },
    CreateHotel: async(req, res) => {
        try {
            const {
                name,
                city,
                price,
                date,
            } = req.body
            let model = await hotelServices.CreateHotel({name, city,price,date})
            helpers.response(res, 201, "Success", model)
        }catch(err) {
            console.log(err)
            let msg = "Bad Request"
            if (err.errors != null) {
                let field = err.errors.name.properties.path
                msg = `Field ${field} is required`
            }
            helpers.response(res, 400, msg)
        }
    },
    FindHotelById: async(req,res) => {
        try {
            let {id} = req.params
            let code = 200
            let msg = "Success"
            let data = await hotelServices.GetHotelById(id)
            if (data === null) {
                code = 404
                msg = "Data not found"
            }
            helpers.response(res, code, msg, data)
        }catch(err) {
            helpers.response(res, 400, "Bad Request")
        }
    },
    UpdateHotelById: async(req, res) => {
        try {
            const {
                name,
                city,
                price,
                date,
            } = req.body
            let {id} = req.params
            let newHotel = await hotelServices.UpdateHotelById(id, {name, city, price,date})

            if (newHotel === null) {
                code = 404
                msg = "Data not found"
            }

            helpers.response(res, 200, "Success", newHotel)
        }catch(err) {
            console.log(err)
            let msg = "Unprocesssable Entity"
            if (err.errors != null) {
                let field = err.errors.name.properties.path
                msg = `Field ${field} is required`
            }

            if (err == "Hotel not found") {
                msg = err
                code = 404
            }
            helpers.response(res, 422, msg)
        }
    },
    DeleteHotelById: async(req, res) => {
        try {
            let {id} = req.params
            await hotelServices.DeleteHotelById(id)
            helpers.response(res, 200, "Success Delete Hotel")
        }catch(err) {
            helpers.response(res, 400, "Bad Request")
        }
    }
}