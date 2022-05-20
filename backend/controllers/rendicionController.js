const rendicion = require('../models/rendicion');

const crearRendicion = (req, res) => {
    const { asunto, fecha, totalGastado, detalle, boleta, tipoGasto } = req.body;
    const nuevaRendicion = new rendicion({
        asunto,
        fecha,
        totalGastado,
        detalle,
        boleta,
        tipoGasto
    })
    nuevaRendicion.save((err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al guardar"})
        }
        res.status(201).send(rendicion)
    })
}
const obtenerRendiciones = (req, res) => {
    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener"})
        }else{
            res.status(200).send(rendicion)
        }
    })
}
const modificarRendicion = (req, res) => {
    let id = req.params.id;
    rendicion.findByIdAndUpdate(id, req.body,(err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al modificar"})
        }
        if(!rendicion){
            return res.status(404).send({message: "No existe"})
        }
        res.status(200).send(rendicion)
    })
}

const eliminarRendicion = (req, res) => {
    let id = req.params.id;
    rendicion.findByIdAndDelete(id, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al modificar"})
        }
        if(!rendicion){
            return res.status(404).send({message: "No existe"})
        }
        res.status(200).send({message:"Eliminado"})
    })
}

module.exports = {
    crearRendicion,
    obtenerRendiciones,
    modificarRendicion,
    eliminarRendicion
}    
