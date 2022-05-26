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
const app = express()
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
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

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	autoIndex: true, //this is the code I added that solved it all
	keepAlive: true,
	poolSize: 10,
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000,
	socketTimeoutMS: 45000,
	family: 4, // Use IPv4, skip trying IPv6
	useFindAndModify: false,
	useUnifiedTopology: true
}

mongoose.connect(`mongodb://ceewebapp:gF6eKxsEez6cnKj@ceewebapp-shard-00-00.eziad.mongodb.net:27017,ceewebapp-shard-00-01.eziad.mongodb.net:27017,ceewebapp-shard-00-02.eziad.mongodb.net:27017/ceewebapp?ssl=true&replicaSet=atlas-li16kg-shard-0&authSource=admin&retryWrites=true&w=majority`, options, function (error) {
	if (error) {
		console.log(error)
	}
})

app.listen(3001, () => {
	console.log("Server running on PORT " + 3001)
})

module.exports = app;