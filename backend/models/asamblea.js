const mongoose = require('mongoose')
const Schema = mongoose.Schema
const asambleaSchema = Schema({
    asunto: {
        type: String,
        required: true,
        // match: /^[a-zA-Z\s]{3,}$/
    },
    contexto: {
        type: String,
        required: true,
        // match: /^[a-zA-Z0-9\s\.\,\;\:\!\?\¿\¡\(\)\[\]\{\}]{3,}$/
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
        // match: /^[a-zA-Z0-9\s]{3,}$/
    },
    url: {
        type: String,
        // match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    },
    horaTermino: {
        // type time (hh:mm)
        type: String,
        default: '',
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    }

})
module.exports = mongoose.model('asamblea', asambleaSchema)
