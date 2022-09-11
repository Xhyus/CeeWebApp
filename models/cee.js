'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ceeSchema = Schema({
	carrera: {
		type: String,
		required: true,
		enum: [
			"ieci",
			"comercial",
			"cpa",
			"icinf"
		],
		uniquie: true
	},
	asambleas: {
		type: [Schema.ObjectId],
		ref: "asamblea"
	},
	rendiciones: {
		type: [
			Schema.ObjectId
		],
		ref: "rendicion"
	},
	usuarios: {
		type: [
			Schema.ObjectId
		],
		ref: "usuario"
	},
})
module.exports = mongoose.model('cee', ceeSchema)
