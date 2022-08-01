const mongoose = require('mongoose')
const Schema = mongoose.Schema
const archivoSchema = Schema({
    ruta: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('archivo', archivoSchema)