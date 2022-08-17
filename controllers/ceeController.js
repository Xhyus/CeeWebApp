const cee = require('../models/cee')

const crearCee = (req, res) => {
    const { carrera, asambleas, rendiciones, usuarios } = req.body;
    const nuevoCee = new cee({
        carrera,
        asambleas,
        rendiciones,
        usuarios
    })
    nuevoCee.save((err, cee) => {
        if (err) {
            return res.status(400).send({ message: "Error al guardar" })
        }
        res.status(201).send(cee)
    })
}

const listarCee = (req, res) => {
    cee.find().populate({ path: 'asambleas rendiciones usuarios' }).exec((err, cee) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        res.status(200).send(cee)
    })
}

const buscarCee = (req, res) => {
    let id = req.params.id;
    cee.findById(id).populate({ path: 'asambleas rendiciones usuarios' }).exec((err, cee) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        if (!cee) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(cee)
    })
}

const modificarCee = (req, res) => {
    let id = req.params.id;
    cee.findByIdAndUpdate(id, req.body, (err, cee) => {
        if (err) {
            return res.status(400).send({ message: "Error al modificar" })
        }
        if (!cee) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(cee)
    })
}

const eliminarCee = (req, res) => {
    let id = req.params.id;
    cee.findByIdAndRemove(id, (err, cee) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar" })
        }
        if (!cee) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(cee)
    })
}

module.exports = {
    crearCee,
    listarCee,
    buscarCee,
    modificarCee,
    eliminarCee
}