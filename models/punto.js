const mongoose = require('mongoose')
const Schema = mongoose.Schema
const puntoSchema = Schema([{
	asunto: {
		type: String,
		required: true,
		length: 250,
		match: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-]+$/
	},
	descripcion: {
		type: String,
		default: null,
		match: /^[a-zA-Z0-9\s\.\,\;\:\!\?\¿\¡\(\)\[\]\{\}]{3,}$/,
		maxlength: 500
	}
}])
module.exports = mongoose.model('punto', puntoSchema)