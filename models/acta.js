const mongoose = require('mongoose')
const Schema = mongoose.Schema
const actaSchema = Schema({
    puntos: {
        type: [
            Schema.ObjectId
        ],
        ref: "punto"
    },
    asistencia: {
        type: [
            Schema.ObjectId
        ],
        ref: "asistencia"
    }
})

module.exports = mongoose.model('acta', actaSchema)