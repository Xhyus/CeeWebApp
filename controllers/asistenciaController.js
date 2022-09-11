const asistencia = require('../models/asistencia');

const crearAsistencia = (req, res) => {
    const { nombre, apellido, rut, generacion } = req.body
    const nuevaAsistencia = new asistencia({
        nombre,
        apellido,
        rut,
        generacion
    })
    nuevaAsistencia.save((err, asistencia) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear asistencia" })
        }
        return res.status(200).send({ asistencia, id: asistencia._id })
    })
}

const obtenerAsistencia = (req, res) => {
    asistencia.find((err, asistencia) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener asistencia" })
        }
        return res.status(200).send({ asistencia })
    })
}

const obtenerAsistenciaPorId = (req, res) => {
    let id = req.params.id
    asistencia.findById(id, (err, asistencia) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener asistencia" })
        }
        return res.status(200).send({ asistencia })
    })
}

const actualizarAsistencia = (req, res) => {
    let id = req.params.id
    asistencia.findByIdAndUpdate(id, req.body, (err, asistencia) => {
        if (err) {
            return res.status(400).send({ message: "Error al actualizar asistencia" })
        }
        return res.status(200).send({ asistencia })
    })
}

const eliminarAsistencia = (req, res) => {
    let id = req.params.id
    asistencia.findByIdAndDelete(id, (err, asistencia) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar asistencia" })
        }
        return res.status(200).send({ asistencia })
    })
}

module.exports = {
    crearAsistencia,
    obtenerAsistencia,
    obtenerAsistenciaPorId,
    actualizarAsistencia,
    eliminarAsistencia
}