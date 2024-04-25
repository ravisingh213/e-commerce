const mongoose = require("mongoose")

const catogarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unquie: true
    },
    slug: {
        type: String,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("catogary", catogarySchema)