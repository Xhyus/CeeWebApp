const asamblea = require('../models/asamblea.js')

const crearAsamblea = (req, res) => {
    const { asunto, fecha, hora, tipoAsamblea, puntos, acta } = req.body;
    const nuevaAsamblea = new asamblea({
        asunto,
        fecha,
        tipoAsamblea,
        puntos,
        acta
    })
    nuevaAsamblea.save((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al guardar" })
        }
        res.status(201).send(asamblea)
    })
}

const listarAsambleas = (req, res) => {
    asamblea.find().populate({ path: 'acta puntos', populate: { path: 'asistencia puntos' } }).exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        res.status(200).send(asamblea)
    })
}

const listarAsambleasTerminadas = (req, res) => {
    asamblea.find({ fecha: { $lt: new Date() } }).populate({ path: 'acta puntos', populate: { path: 'asistencia puntos' } }).exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existen asambleas terminadas" })
        }
        res.status(200).send(asamblea)
    })
}

const listarAsambleasPorRealizar = (req, res) => {
    asamblea.find({ fecha: { $gte: new Date() } }).populate({ path: 'acta puntos', populate: { path: 'asistencia puntos' } }).exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existen asambleas por realizar" })
        }
        res.status(200).send(asamblea)
    })
}

const modificarAsamblea = (req, res) => {
    let id = req.params.id;
    asamblea.findByIdAndUpdate(id, req.body, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al modificar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(asamblea)
    })
}

const eliminarAsamblea = (req, res) => {
    let id = req.params.id;
    asamblea.findByIdAndRemove(id, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(asamblea)
    })
}

const buscarAsamblea = (req, res) => {
    let id = req.params.id;
    asamblea.findById(id, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al buscar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(asamblea)
    })
}

module.exports = {
    crearAsamblea,
    listarAsambleas,
    modificarAsamblea,
    eliminarAsamblea,
    buscarAsamblea,
    listarAsambleasTerminadas,
    listarAsambleasPorRealizar
}