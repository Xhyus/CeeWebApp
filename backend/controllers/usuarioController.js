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
            return res.status(400).send({ message: `Error al guardar el usuario: ${err}` })
        }
        res.status(201).send({ usuario })
    })
}

const obtenerUsuarios = (req, res) => {
    usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(400).send({ message: `Error al obtener los usuarios: ${err}` })
        }
        res.status(200).send({ usuarios })
    })
}

const obtenerUsuario = (req, res) => {
    const { id } = req.params
    usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error al obtener el usuario: ${err}` })
        }
        res.status(200).send({ usuario })
    })
}

//! Revisar con tiempo, no entrega el correo que corresponde
// const obtenerUsuarioCorreo = (req, res) => {
//     const { email } = req.params
//     console.log(email)
//     usuario.find({ 'email': email }, (err, usuario) => {
//         if (err) {
//             return res.status(400).send({ message: `Error al obtener el usuario: ${err}` })
//         }
//         res.status(200).send({ usuario })
//     })
// }


const actualizarUsuario = (req, res) => {
    const { id } = req.params
    const { nombre, apellido, rol, estadoCuenta, carrera } = req.body
    usuario.findByIdAndUpdate(id, { nombre, apellido, rol, estadoCuenta, carrera }, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error al actualizar el usuario: ${err}` })
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
            return res.status(400).send({ message: `Error al actualizar el usuario: ${err}` })
        }
        res.status(200).send({ usuario })
    })
}

const verificacion = (req, res) => {
    usuario.findOne({ 'email': req.body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: `Error al verificar el usuario: ${err}` })
        }
        if (!usuario) {
            return res.status(400).send({ message: `El usuario no existe` })
        }
        if (usuario.estadoCuenta == 'noRegular') {
            return res.status(401).send({ message: `El usuario no está activo` })
        }
        res.status(200).send({ usuario })
    })
}

const validarPass = (req, res) => {
    const reqPass = req.body.password
    usuario.findOne({ 'email': req.body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: `Error al validar el usuario: ${err}` })
        }
        if (!usuario) {
            return res.status(400).send({ message: `El usuario no existe` })
        }

        bcrypt.compare(reqPass, usuario.password, (err, result) => {
            if (err) {
                return res.status(500).send({ message: `Error al validar el usuario: ${err}` })
            } else if (!result) {
                return res.status(400).send({ message: `Contraseña incorrecta` })
            } else {
                res.status(200).send({ message: 'Contraseña correcta', 'token': servicio.createToken(usuario), id: usuario.id })
            }
        })
    })
}

module.exports = {
    guardarUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    modificarEstado,
    verificacion,
    // obtenerUsuarioCorreo,
    validarPass,

}