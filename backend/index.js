'use strict'

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PuntoRoutes = require('./routes/puntoRoutes')
const RendicionRoutes = require('./routes/rendicionRoutes')
const AsambleaRoutes = require('./routes/asambleaRoutes')
const UsuarioRoutes = require('./routes/usuarioRoutes')
const AsistenciaRoutes = require('./routes/asistenciaRoutes')
const ActaRoutes = require('./routes/actaRoutes')
const CEERoutes = require('./routes/ceeRoutes')
const ArchivoRoutes = require('./routes/archivoRoutes')
const app = express()
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest");
	next();
})
app.use(cors())
app.use(express.json())
app.options('*', cors())
app.use('/api', PuntoRoutes)
app.use('/api', RendicionRoutes)
app.use('/api', AsambleaRoutes)
app.use('/api', UsuarioRoutes)
app.use('/api', AsistenciaRoutes)
app.use('/api', ActaRoutes)
app.use('/api', CEERoutes)
app.use('/api', ArchivoRoutes)

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	autoIndex: true,
	keepAlive: true,
	poolSize: 10,
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000,
	socketTimeoutMS: 45000,
	family: 4,
	useFindAndModify: false,
	useUnifiedTopology: true
}
mongoose.connect(process.env.DB, options, function (error) {
	if (error) {
		console.log(error)
	}
})

app.listen(process.env.PORT, () => {
	console.log("Server running on PORT " + process.env.PORT)
})

module.exports = app;