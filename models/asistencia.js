const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const asistenciaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    generacion: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('asistencia', asistenciaSchema);