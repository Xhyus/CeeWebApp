const mongoose = require('mongoose')
const Schema = mongoose.Schema
const puntoSchema = Schema([{
	asunto: {
		type: String,
		required: true,
		match: /^[a-zA-Z\s]{3,}$/
	},
	descripcion: {
		type: String,
		default: null,
		match: /^[a-zA-Z0-9\s\.\,\;\:\!\?\¿\¡\(\)\[\]\{\}]{3,}$/,
		maxlength: 500
	}
}])
module.exports = mongoose.model('punto', puntoSchema)