const asamblea = require('../models/asamblea.js')
const cee = require('../models/cee.js')
const mailSender = require('../controllers/mailSender.js')

const crearAsamblea = (req, res) => {
    const carrera = req.params.carrera
    const { asunto, fecha, contexto, tipoAsamblea, puntos, acta, archivos, ubicacion } = req.body;
    const nuevaAsamblea = new asamblea({
        asunto,
        fecha,
        contexto,
        tipoAsamblea,
        puntos,
        acta,
        archivos,
        ubicacion
    })
    nuevaAsamblea.save((err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al guardar" })
        }
        cee.updateOne({ carrera }, { $push: { asambleas: asamblea._id } }, (err, cee) => {
            if (err) {
                return res.status(400).send({ message: "Error al guardar" })
            }
            mailSender(asamblea.asunto, asamblea.fecha, asamblea.contexto, asamblea.tipoAsamblea, asamblea.puntos, asamblea.ubicacion, carrera)
            res.status(201).send(asamblea)
        })
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
    let { id, carrera } = req.params;

    asamblea.findById(id, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al eliminar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existe" })
        }
        cee.updateOne({ carrera: carrera }, { $pull: { asambleas: asamblea._id } }, (err, cee) => {
            if (err) {
                return res.status(400).send({ message: "Error al eliminar" })
            }
            asamblea.remove((err, asamblea) => {
                if (err) {
                    return res.status(400).send({ message: "Error al eliminar" })
                }
                if (!asamblea) {
                    return res.status(404).send({ message: "No existe" })
                }
                res.status(200).send(asamblea)
            }
            )
        }
        )
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

const asambleasPorCarrera = (req, res) => {
    if (req.params.carrera === null || req.params.carrera === undefined) {
        res.status(400).send({ message: "No se ha especificado la carrera" })
    }
    asamblea.find({}, (err, asamblea) => {
        if (err) {
            return res.status(400).send({ message: "Error al buscar" })
        }
        if (!asamblea) {
            return res.status(404).send({ message: "No existen asambleas terminadas" })
        }
        cee.find({ carrera: req.params.carrera }).populate({ path: 'asamblea' }).sort({ fecha: -1 }).exec((err, cee) => {
            if (cee.length === 0) {
                return res.status(404).send({ message: "No existen el cee" })
            }
            if (err) {
                return res.status(400).send({ message: "Error al buscar" })
            }
            if (!cee) {
                return res.status(404).send({ message: "No existe el cee" })
            }
            let asambleas = asamblea.filter(asamblea => {
                return cee[0].asambleas.includes(asamblea._id)
            })
            let asambleasTerminadas = asambleas.filter(asamblea => {
                return asamblea.fecha < new Date()
            })
            let asambleasNoTerminadas = asambleas.filter(asamblea => {
                return asamblea.fecha > new Date()
            })
            asambleas = {
                asambleasTerminadas: asambleasTerminadas,
                asambleasNoTerminadas: asambleasNoTerminadas
            }
            res.status(200).json(asambleas)
        })
    })
}

const filtro = (req, res) => {
    let Filtro = {}, fechas = {}, tipos = {}
    let { inicio, fin, estado, tipo } = req.query
    cee.find({ carrera: req.params.carrera }, (err, cee) => {
        if (cee.length === 0) {
            return res.status(404).send({ message: "No existen el cee" })
        }
        if (err) {
            return res.status(400).send({ message: "Error al buscar" })
        }
        if (!cee) {
            return res.status(404).send({ message: "No existe el cee" })
        }
        if (inicio || fin) {
            if (inicio && fin) {
                fechas = { fecha: { $lte: new Date(fin), $gte: new Date(inicio) } }
            } else if (inicio) {
                fechas = { fecha: { $lte: new Date(), $gte: new Date(inicio) } }
            } else if (fin) {
                fechas = { fecha: { $lte: new Date(), $gte: new Date(2020, 1, 1) } }
            }
            Filtro = { ...fechas }
        }
        if (tipo) {
            if (tipo == "resolutiva") {
                tipos = { tipoAsamblea: "resolutiva" }
            } else {
                tipos = { tipoAsamblea: "informativa" }
            }
            Filtro = { ...Filtro, ...tipos }
        }
        asamblea.find(Filtro, (err, asambleaFiltrada) => {
            if (err) {
                return res.status(400).send({ message: "Error al buscar" })
            }
            if (!asambleaFiltrada) {
                return res.status(404).send({ message: "No existen asambleas con estos criterios" })
            }
            let asambleas = asambleaFiltrada.filter(asamblea => {
                return cee[0].asambleas.includes(asamblea._id)
            })
            if (estado) {
                if (estado == "terminada") {
                    asambleas = asambleas.filter(asamblea => {
                        return asamblea.fecha < new Date()
                    })
                } else {
                    asambleas = asambleas.filter(asamblea => {
                        return asamblea.fecha > new Date()
                    })
                }
                return res.status(200).json(asambleas)
            } else {
                res.status(200).json(asambleas)
            }
        })
    })
}

module.exports = {
    crearAsamblea,
    modificarAsamblea,
    eliminarAsamblea,
    buscarAsamblea,
    asambleasPorCarrera,
    filtro
}