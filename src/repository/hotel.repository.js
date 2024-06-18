const mongoose = require("mongoose")

var schema = new mongoose.Schema(
    {
        name: String,
        city: String,
        price: Number,
        date: Date,
    }
)

const hotel = mongoose.model('hotel', schema)

module.exports = hotel
