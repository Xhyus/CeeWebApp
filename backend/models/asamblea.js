const mongoose = require('mongoose')
const Schema = mongoose.Schema
const asambleaSchema = Schema({
    asunto: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]{3,}$/
    },
    contexto: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s\.\,\;\:\!\?\¿\¡\(\)\[\]\{\}]{3,}$/
    },
    fecha: {
        type: Date,
        required: true,
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
        default: []
    }],
    acta: {
        type: Schema.ObjectId,
        ref: 'acta',
        default: ''
    },
    archivos: [{
        type: Schema.Types.ObjectId,
        ref: 'archivo',
        default: []
    }],
    ubicacion: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{3,}$/
    }

})
module.exports = mongoose.model('asamblea', asambleaSchema)
