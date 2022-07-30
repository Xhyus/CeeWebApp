const mongoose = require('mongoose')
const Schema = mongoose.Schema
const archivoSchema = Schema({
    ruta: {
        type: String,
        default: null,
        required: true
    },
    nombre: {
        type: String,
        default: null,
        required: true
    }
})
module.exports = mongoose.model('archivo', archivoSchema)