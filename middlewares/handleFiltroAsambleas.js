const Asamblea = require('../models/asamblea');
const Cee = require('../models/cee');

const handleRango = (req, res) => {
    if (req.query.inicio || req.query.fin) {
        req.query.inicio ? req.query.inicio = new Date(req.query.inicio) : new Date(2020, 0, 1);
        req.query.fin ? req.query.fin = new Date(req.query.fin) : new Date();
        if (req.query.inicio > req.query.fin) {
            res.status(400).send({ message: "La fecha de inicio no puede ser mayor a la fecha de fin" });
        }
    }
}

const handleTipo = (req, res) => {
    if (req.query.tipo) {
        if (req.query.tipo != 'informativa' || req.query.tipo != 'resolutiva') {
            res.status(400).send({ message: "El tipo debe ser informativa o resolutiva" });
        }
    }
}

const handleEstado = (req, res) => {
    if (req.query.estado) {
        if (req.query.estado != 'terminada' || req.query.estado != 'noTerminada') {
            res.status(400).send({ message: "El estado debe ser terminada o noTerminada" });
        }
        // req.query.estado == 'terminada' ? req.query.estado = { fecha: { lte: new Date() } } : req.query.estado = { fecha: { gte: new Date() } };
        let estado = req.query.estado
        busquedaEstado(req, res, estado)
    }
}

const busquedaEstado = (req, res, estado) => {
    Cee.find({}, (err, cees) => {
        if (err) {
            res.status(500).send({ message: "Error al buscar" });
        }
        if (cees.length == 0) {
            res.status(400).send({ message: "No hay CEEs" });
        }
        if (!cees) {
            res.status(400).send({ message: "No hay CEEs" });
        }
        Asamblea.find({ cee: { $in: cees }, estado }, (err, asambleas) => {
            if (err) {
                res.status(500).send({ message: "Error al buscar" });
            }
            if (asambleas.length == 0) {
                res.status(400).send({ message: "No hay asambleas" });
            }
            if (!asambleas) {
                res.status(400).send({ message: "No hay asambleas" });
            }
            console.log(asambleas)
        })
    })
}

const handleFiltro = (req, res, next) => {
    handleRango(req, res)
    handleTipo(req, res)
    handleEstado(req, res)
    next()

}


module.exports = { handleFiltro };