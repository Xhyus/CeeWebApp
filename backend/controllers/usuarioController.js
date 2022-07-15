const usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const servicio = require('../services/token')

const guardarUsuario = async (req, res) => {
    const passHash = await bcrypt.hash(req.body.password, 10)
    const { nombre, apellido, email, rol, estadoCuenta, carrera } = req.body
    const usuarioNuevo = new usuario({
        nombre,
        apellido,
        email,
        password: passHash,
        rol,
        estadoCuenta,
        carrera
    })
    usuarioNuevo.save((err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error al guardar el usuario` })
        }
        res.status(201).send({ usuario })
    })
}

const obtenerUsuarios = (req, res) => {
    usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(400).send({ message: `Error al obtener los usuarios` })
        }
        res.status(200).send({ usuarios })
    })
}

const obtenerUsuario = (req, res) => {
    const { id } = req.params
    usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error al obtener el usuario` })
        }
        res.status(200).send({ usuario })
    })
}

const modificarEstado = (req, res) => {
    const { id } = req.params
    const { estadoCuenta } = req.body
    console.log(estadoCuenta)
    usuario.findByIdAndUpdate(id, { estadoCuenta }, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error al actualizar el usuario` })
        }
        res.status(200).send({ usuario })
    })
}

const login = (req, res) => {
    usuario.findOne({ 'email': req.body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: `Error al validar el usuario`, error: 1 })
        }
        if (!usuario) {
            return res.status(400).send({ message: `El usuario no existe`, error: 2 })
        }
        if (usuario.estadoCuenta == 'noRegular') {
            return res.status(401).send({ message: `El usuario no está activo`, error: 3 })
        }
        bcrypt.compare(req.body.password, usuario.password, (err, result) => {
            if (err) {
                return res.status(500).send({ message: `Error al validar el usuario`, error: 4 })
            }
            if (!result) {
                return res.status(400).send({ message: `Contraseña incorrecta`, error: 5 })
            }
            res.status(200).send({ message: 'Contraseña correcta', 'token': servicio.createToken(usuario), carrera: usuario.carrera, rol: usuario.rol })
        })
    })
}


module.exports = {
    guardarUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    modificarEstado,
    login,
}