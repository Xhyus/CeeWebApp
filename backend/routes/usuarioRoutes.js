const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/usuario', usuarioController.guardarUsuario)
api.get('/usuarios', usuarioController.obtenerUsuarios)
api.get('/usuario/buscar/:id', usuarioController.obtenerUsuario)
api.put('/usuario/estado/:id', usuarioController.modificarEstado)
api.post('/usuario/login', usuarioController.login)

module.exports = api