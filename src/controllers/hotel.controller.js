const helpers = require("../helper/response")
const hotel = require("../repository/hotel.repository")
const moment = require("moment")
module.exports = {
    GetHotels: async(req,res) => {
        try {
            let data = await hotel.find()
            helpers.response(res, 200, "Success",data)
        }catch(err) {
            console.log(err)
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
            let newDate = moment(date,'DD-MM-YYYY' ).toDate()
            let model = await hotel.create({name, city,price,date: newDate})
            helpers.response(res, 201, "Success", model)
        }catch(err) {
            helpers.response(res, 400, err)
        }
    }
}