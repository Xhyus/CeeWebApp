'use strict'

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PuntoRoutes = require('./routes/puntoRoutes')
const RendicionRoutes = require('./routes/rendicionRoutes')
const AsambleaRoutes = require('./routes/asambleaRoutes')
const UsuarioRoutes = require('./routes/usuarioRoutes')

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/api', PuntoRoutes)
app.use('/api', RendicionRoutes)
app.use('/api', AsambleaRoutes)
app.use('/api', UsuarioRoutes)

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