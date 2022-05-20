const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/usuario', usuarioController.guardarUsuario)
api.get('/usuarios', usuarioController.obtenerUsuarios)
api.get('/usuario/:id', usuarioController.obtenerUsuario)
// api.post('/usuario/correo', usuarioController.obtenerUsuarioCorreo)
api.put('/usuario/update/:id', usuarioController.actualizarUsuario)
api.put('/usuario/estado/:id', usuarioController.modificarEstado)
api.post('/usuario/verificacion', usuarioController.verificacion)
api.post('/usuario/validarPass', usuarioController.validarPass)

module.exports = api