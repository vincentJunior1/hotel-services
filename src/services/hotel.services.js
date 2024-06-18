const hotel = require("../repository/hotel.repository")
const tmpHotel = require("../repository/editHotel.repository")
const moment = require("moment")
module.exports = {

    GetAllHotel: async (params) => {
        let {
            name,
            city,
            price,
            date,
            sort_field,
            sort_order
        } = params
        let query = {}
        let sort = {}
        if (name !== undefined && name.length !== null) {
            query['name'] = {
                $regex: name,
                $options: 'i'
            }
        }

        if (city != null) {
            query['city'] = city
        }

        if(price != null) {
            let newPrice = price.split(":")
            query['price'] = {
                $gte: newPrice[0],
                $lte: newPrice[1]
            }
        }

        if (date != null) {
            let newDate = date.split(":")
            query['date'] = {
                $gte: moment(newDate[0],'DD-MM-YYYY').utcOffset(0, true).toDate(),
                $lte: moment(newDate[1],'DD-MM-YYYY').utcOffset(0, true).toDate()
            }
        }

        if (sort_field != null && sort_order != null) {
            sort = {
                [sort_field]: sort_order,
            }
        }
        let data = await hotel.find(query).sort(sort)
        return data
    },
    CreateHotel: async (payload) => {
        let data = new hotel({
            name: payload.name,
            city: payload.city,
            price: payload.price,
            date: moment(payload.date,'DD-MM-YYYY').utcOffset(0, true).toDate()
        })
        let save = data.save()
        return save
    },
    GetHotelById: async(id) => {
        let data = await hotel.findById(id)

        return data
    },
    UpdateHotelById: async (id, payload) => {
        let newHotel = await hotel.findById(id)

        if (!newHotel) {
            throw new Error('Hotel Not found')
        }
        newHotel.name = payload.name
        newHotel.city = payload.city
        newHotel.price = payload.price
        newHotel.date = moment(payload.date,'DD-MM-YYYY').utcOffset(0, true).toDate()
        let data = await newHotel.save()

        return data
    },
    DeleteHotelById: async (id) => {
        await hotel.deleteOne({_id: id})
    },
    EditHotelById: async (id, payload) => {
        let newTmpHotel = await tmpHotel.findById(id)

        newHotel.name = payload.name
        newHotel.city = payload.city
        newHotel.price = payload.price
        newHotel.date = moment(payload.date,'DD-MM-YYYY').utcOffset(0, true).toDate()

        let data = await newTmpHotel.save()

        return data
    }
}