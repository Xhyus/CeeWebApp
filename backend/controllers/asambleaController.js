const asamblea = require('../models/asamblea.js')
const cee = require('../models/cee.js')

const crearAsamblea = (req, res) => {
    const { asunto, fecha, contexto, tipoAsamblea, puntos, acta } = req.body;
    const nuevaAsamblea = new asamblea({
        asunto,
        fecha,
        contexto,
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

const asambleasTerminadas = (req, res) => {
    if (req.params.carrera === null || req.params.carrera === undefined) {
        res.status(400).send({ message: "No se ha especificado la carrera" })
    }
    asamblea.find({ fecha: { $lt: new Date() } }).populate({ path: 'acta puntos', populate: { path: 'asistencia puntos' } }).exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al buscar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existen asambleas terminadas" })
        }
        cee.find({ carrera: req.params.carrera }).populate({ path: 'asamblea' }).exec((err, cee) => {
            if (cee.length === 0) {
                return res.status(404).send({ message: "No existen el cee" })
            }
            if (err) {
                return res.status(400).send({ message: "Error al buscar" })
            }
            if (!cee) {
                return res.status(404).send({ message: "No existen cee" })
            }
            let asambleas = asamblea.filter(asamblea => {
                return cee[0].asambleas.includes(asamblea._id)
            })
            res.status(200).send(asambleas)
        })
    })
}

const asambleasNoTerminadas = (req, res) => {
    if (req.params.carrera === null || req.params.carrera === undefined) {
        res.status(400).send({ message: "No se ha especificado la carrera" })
    }
    asamblea.find({ fecha: { $gte: new Date() } }).populate({ path: 'acta puntos', populate: { path: 'asistencia puntos' } }).exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al buscar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existen asambleas terminadas" })
        }
        cee.find({ carrera: req.params.carrera }).populate({ path: 'asamblea' }).exec((err, cee) => {
            if (cee.length === 0) {
                return res.status(404).send({ message: "No existen el cee" })
            }
            if (err) {
                return res.status(400).send({ message: "Error al buscar" })
            }
            if (!cee) {
                return res.status(404).send({ message: "No existen cee" })
            }
            let asambleas = asamblea.filter(asamblea => {
                return cee[0].asambleas.includes(asamblea._id)
            })
            res.status(200).send(asambleas)
        })
    })
}

module.exports = {
    crearAsamblea,
    modificarAsamblea,
    eliminarAsamblea,
    buscarAsamblea,
    asambleasTerminadas,
    asambleasNoTerminadas
}