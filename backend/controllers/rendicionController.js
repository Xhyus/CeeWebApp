const rendicion = require('../models/rendicion');

//* .: CREAR RENDICIÓN :. *//

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

//* .: OBTENER RENDICIONES :. *//

const obtenerRendiciones = (req, res) => {
    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener"})
        }else{
            res.status(200).send(rendicion)
        }
    })
}

//* .: FILTROS :. *//

const obtenerRendicionesMenor10K = (req, res) => {
    const rendicionesFiltradas = [];

    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener rendiciones < 10.000 CLP"})
        }
        else {
            //? Filtramos las rendiciones.
            rendicion.map((gasto, index) => {

                if (gasto.totalGastado < 10000) {
                    rendicionesFiltradas.push(gasto);
                }

            })
            
            //? Se retornan los datos.
            res.status(200).send(rendicionesFiltradas)
        }
    })
}

const obtenerRendicionesMenor3K = (req, res) => {
    const rendicionesFiltradas = [];

    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener rendiciones < 3.000 CLP"})
        }
        else {
            //? Filtramos las rendiciones.
            rendicion.map((gasto, index) => {
                
                if (gasto.totalGastado < 3000) {
                    rendicionesFiltradas.push(gasto);
                }

            })
            
            //? Se retornan los datos.
            res.status(200).send(rendicionesFiltradas)
        }
    })
}

const obtenerRendicionesOficina = (req, res) => {
    const rendicionesFiltradas = [];

    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener rendiciones < 3.000 CLP"})
        }
        else {
            //? Filtramos las rendiciones.
            rendicion.map((gasto, index) => {
                
                if (gasto.tipoGasto === "Oficina") {
                    rendicionesFiltradas.push(gasto);
                }

            })
            
            //? Se retornan los datos.
            res.status(200).send(rendicionesFiltradas)
        }
    })
}

const obtenerRendicionesActividades = (req, res) => {
    const rendicionesFiltradas = [];

    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener rendiciones < 3.000 CLP"})
        }
        else {
            //? Filtramos las rendiciones.
            rendicion.map((gasto, index) => {
                
                if (gasto.tipoGasto === "Actividad") {
                    rendicionesFiltradas.push(gasto);
                }

            })
            
            //? Se retornan los datos.
            res.status(200).send(rendicionesFiltradas)
        }
    })
}

const obtenerRendicionesOtros = (req, res) => {
    const rendicionesFiltradas = [];

    rendicion.find({}, (err, rendicion) => {
        if (err) {
            return res.status(400).send({message: "Error al obtener rendiciones < 3.000 CLP"})
        }
        else {
            //? Filtramos las rendiciones.
            rendicion.map((gasto, index) => {
                
                if (gasto.tipoGasto === "Otros") {
                    rendicionesFiltradas.push(gasto);
                }

            })
            
            //? Se retornan los datos.
            res.status(200).send(rendicionesFiltradas)
        }
    })
}

//* .: MODIFICACIONES :. *//

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
    obtenerRendicionesMenor10K,
    obtenerRendicionesMenor3K,
    obtenerRendicionesOficina,
    obtenerRendicionesActividades,
    obtenerRendicionesOtros,
    modificarRendicion,
    eliminarRendicion
}    
