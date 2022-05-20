'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const puntoSchema = Schema([{
	asunto: {
		type: String,
		required: true
	},
	descripcion: {
		type: String,
		required: true
	}
}])
module.exports = mongoose.model('punto', puntoSchema)