const mongoose = require('mongoose')
const Schema = mongoose.Schema
const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: [
            "admin",
            "miembroCee",
            "secretaria",
            "tricel",
            "presidenteCee",
            "noPertenece"
        ]
    },
    estadoCuenta: {
        type: String,
        required: true,
        enum: [
            "regular",
            "noRegular"
        ]
    },
    carrera: {
        type: String,
        required: true,
        enum: [
            "ieci",
            "comercial",
            "cpa",
            "icinf"
        ]
    }
})
module.exports = mongoose.model('usuario', usuarioSchema)
