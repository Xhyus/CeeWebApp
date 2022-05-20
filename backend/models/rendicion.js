'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rendicionSchema = Schema({
    asunto: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    totalGastado: {
        type: Number,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    boleta: {
        type: String,
        required: true
    },
    tipoGasto: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('rendicion', rendicionSchema)    
