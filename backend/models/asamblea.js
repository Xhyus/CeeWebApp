const mongoose = require('mongoose')
const Schema = mongoose.Schema
const asambleaSchema = Schema({
    asunto: {
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
        ref: 'punto'
    }],
    acta: {
        type: Schema.ObjectId,
        ref: 'acta'
    },
})
module.exports = mongoose.model('asamblea', asambleaSchema)
