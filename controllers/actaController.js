const acta = require('../models/acta')
const crearActa = (req, res) => {
    const { puntos, asistencia } = req.body
    const nuevaActa = new acta({
        puntos,
        asistencia
    })
    nuevaActa.save((err, acta) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear acta" })
        }
        return res.status(200).send({ acta })
    })
}


const listarActas = (req, res) => {
    acta.find().populate('puntos asistencia').exec((err, acta) => {
        if (err) {
            return res.status(400).send({ message: "Error al listar actas" })
        }
        return res.status(200).send(acta)
    })
}

const buscarActa = (req, res) => {
    const { id } = req.params
    acta.findById(id).populate('puntos asistencia').exec((err, acta) => {
        if (err) {
            return res.status(400).send({ message: "Error al buscar acta" })
        }
        return res.status(200).send({ acta })
    })
}

const modificarActa = (req, res) => {
    let id = req.params.id
    acta.findByIdAndUpdate(id, req.body, (err, acta) => {
        if (err) {
            return res.status(400).send({ message: "Error al modificar acta" })
        }
        if (!acta) {
            return res.status(404).send({ message: "No existe el acta" })
        }
        return res.status(200).send({ acta })
    })
}

const eliminarActa = (req, res) => {
    let id = req.params.id
    acta.findByIdAndDelete(id, (err, acta) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar acta" })
        }
        if (!acta) {
            return res.status(404).send({ message: "No existe el acta" })
        }
        return res.status(200).send({ acta })
    })
}

module.exports = {
    crearActa,
    listarActas,
    modificarActa,
    eliminarActa,
    buscarActa
}