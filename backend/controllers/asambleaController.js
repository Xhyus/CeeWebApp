const asamblea = require('../models/asamblea.js')

const crearAsamblea = (req, res) => {
    const { asunto, fecha, hora, tipoAsamblea, puntos, } = req.body;
    const nuevaAsamblea = new asamblea({
        asunto,
        fecha,
        hora,
        tipoAsamblea,
        puntos,
    })
    nuevaAsamblea.save((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al guardar" })
        }
        res.status(201).send(asamblea)
    })
}

const listarAsambleas = (req, res) => {
    asamblea.find().populate('puntos').exec((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
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

// const modificarAsambleaPunto = (req, res) => {
//     let id = req.params.id;
//     let puntos = req.body.puntos;
//     asamblea.findByIdAndUpdate(id, req.body, (err, asamblea) => {
//         if (err) {
//             return res.status(400).send({ message: "Error al modificar" })
//         }
//         if (!asamblea) {
//             return res.status(404).send({ message: "No existe" })
//         }
//         puntos.prototype.filter(puntos => {
//             puntos.prototype.concat(req.body.)
//             res.status(200).send(asamblea)
//         }
//     })
// }

const eliminarAsamblea = (req, res) => {
    let id = req.params.id;
    asamblea.findByIdAndDelete(id, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar" })
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
    // modificarAsambleaPunto
}