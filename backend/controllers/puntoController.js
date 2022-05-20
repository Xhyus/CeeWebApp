const punto = require('../models/punto');

const crearPunto = (req, res) => {
    const { asunto, descripcion } = req.body;
    const nuevoPunto = new punto({
        asunto,
        descripcion
    })
    nuevoPunto.save((err, punto) => {
        if (err) {
            return res.status(400).send({message: "Error al guardar"})
        }
        res.status(201).send(punto)
    })
}
const obtenerPuntos = (req, res) => {
    punto.find({}, (err, puntos) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener"})
        }else{
            res.status(200).send(puntos)
        }
    })
}
const modificarPunto = (req, res) => {
    let id = req.params.id;
    punto.findByIdAndUpdate(id, req.body,(err, punto) => {
        if (err) {
            return res.status(400).send({message: "Error al modificar"})
        }
        if(!punto){
            return res.status(404).send({message: "No existe"})
        }
        res.status(200).send(punto)
    })
}

module.exports = {
crearPunto,
obtenerPuntos,
modificarPunto,
}    
