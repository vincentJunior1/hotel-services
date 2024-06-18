const mongoose = require("mongoose")

var schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        city: {type: String, required: true},
        price: {type: Number, required: true},
        date: {type: Date, required: true},
    }
)

const hotel = mongoose.model('hotel', schema)

module.exports = hotel
