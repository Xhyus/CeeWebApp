const mongoose = require('mongoose')
const Schema = mongoose.Schema
const asambleaSchema = Schema({
    asunto: {
        type: String,
        required: true
    },
    contexto: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tipoAsamblea: {
        type: String,
        required: true,
        enum: [
            "resolutiva",
            "informativa"
        ]
    },
    puntos: [{
        type: [Schema.Types.ObjectId],
        ref: 'punto',
        default: null
    }],
    acta: {
        type: Schema.ObjectId,
        ref: 'acta',
        default: null
    },
    archivos: [{
        ruta: {
            type: String,
            default: null
        },
        nombre: {
            type: String,
            required: true
        }
    }],

})
module.exports = mongoose.model('asamblea', asambleaSchema)
