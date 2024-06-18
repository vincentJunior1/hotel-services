const mongoose = require('mongoose')
require('dotenv').config()
const connection = async () => {
    mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connected to mongo")
    })
    .catch((err) => {
        console.log("Failed to connect"+ err)
    })
} 

module.exports = connection