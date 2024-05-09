const mongoose = require('mongoose')

const Schema = mongoose.Schema

const URLSchema = new Schema({
    long: { type: String, required: true, minLentgh: 5 },
    alias: { type: String, required: true, minLentgh: 5 }
}, { timestamps: true })

URL = mongoose.model('URL', URLSchema)

module.exports = URL;