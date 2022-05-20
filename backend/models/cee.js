'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ceeSchema = Schema({
	carrera: {
		type: String,
		required: true
	},
	asambleas: {
		type: [Schema.ObjectId],
		ref: "Asambleas"
	},
	// Rendiciones:{
	//    type:[
	//       Schema.ObjectId
	//    ],
	//    ref:"Rendiciones"
	// }
})
module.exports = mongoose.model('cee', ceeSchema)    
