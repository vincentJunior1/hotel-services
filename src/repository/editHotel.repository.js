const mongoose = require("mongoose")

var schema = new mongoose.Schema(
    {
        parent_id: {type: String, required: true},
        name: {type: String, required: true},
        city: {type: String, required: true},
        price: {type: Number, required: true},
        date: {type: Date, required: true},
    }
)

const tmpHotel = mongoose.model('tmp_hotel', schema)

module.exports = tmpHotel
