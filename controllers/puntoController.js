const punto = require('../models/punto');
const asamblea = require('../models/asamblea');

const crearPunto = (req, res) => {
    const { asunto, descripcion } = req.body;
    const asambleaID = req.params.id;
    console.log(asambleaID)
    const nuevoPunto = new punto({
        asunto,
        descripcion
    })
    nuevoPunto.save((err, punto) => {
        if (err) {
            return res.status(400).send({ message: "Error al crear" })
        }
        console.log(punto._id)
        asamblea.findByIdAndUpdate(asambleaID, { $push: { puntos: punto._id } }, (err, asamblea) => {

            if (err) {
                return res.status(400).send({ message: "Error al guardar" })
            }
            res.status(201).send(punto)
        })
    })
}
const obtenerPuntos = (req, res) => {
    punto.find({}, (err, puntos) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        } else {
            res.status(200).send(puntos)
        }
    })
}
const modificarPunto = (req, res) => {
    let id = req.params.id;
    punto.findByIdAndUpdate(id, req.body, (err, punto) => {
        if (err) {
            return res.status(400).send({ message: "Error al modificar" })
        }
        if (!punto) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(punto)
    })
}

const obtenerPunto = (req, res) => {
    let id = req.params.id
    punto.findById(id, (err, punto) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener" })
        }
        if (!punto) {
            return res.status(404).send({ message: "No existe" })
        }
        res.status(200).send(punto)
    })
}

module.exports = {
    crearPunto,
    obtenerPuntos,
    modificarPunto,
    obtenerPunto
}
