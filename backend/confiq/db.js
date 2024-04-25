const mongoose = require("mongoose")

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connection successful ${conn.connection.host}`)
    } catch (error) {
        console.log(`connection error ${error}`)
    }
}

module.exports = connect