const archivos = require('../models/archivo');
const asamblea = require('../models/asamblea');

const uploadNewFilesAsambleas = async (req, res) => {
    const { files } = req
    if (req.archivoValido === false) {
        return res.status(400).send({ message: 'Solo se aceptan archivos con extensiones .png, .jpg, .jpeg, .pdf, .docx, .xlsx, .csv' })
    }
    if (files.length === 0) {
        return res.status(400).send({ message: 'No se ha subido ningun archivo' })
    }
    let aux = files.map((file) => {
        const archivo = new archivos({
            nombre: file.originalname,
            ruta: file.path,
            tipo: file.mimetype
        })
        archivo.save((err, archivo) => {
            if (err) {
                return res.status(400).send({ message: 'Error al subir el archivo' })
            }
            asamblea.findOneAndUpdate({ _id: req.params.id }, { $push: { archivos: archivo._id } }, (err, asamblea) => {
                if (err) {
                    return res.status(400).send({ message: 'Error al subir el archivo' })
                }
                if (!asamblea) {
                    return res.status(404).send({ message: 'No existe la asamblea' })
                }
            })
        })
        return archivo
    })
    res.status(201).send(aux)
}

const listarArchivos = async (req, res) => {
    archivos.find({}, (err, archivos) => {
        if (err) {
            return res.status(400).send({ message: 'Error al buscar los archivos' })
        }
        if (!archivos) {
            return res.status(404).send({ message: 'No existen archivos' })
        }
        res.send(archivos)
    })
}

const obtenerUnArchivo = async (req, res) => {
    const { id } = req.params
    archivos.findById(id, (err, archivo) => {
        if (err) {
            return res.status(400).send({ message: 'Error al buscar el archivo' })
        }
        if (!archivo) {
            return res.status(404).send({ message: 'No existe el archivo' })
        }
        res.download('./' + archivo.ruta)
    })
}

const obtenerInformacionArchivo = async (req, res) => {
    const { id } = req.params
    archivos.findById(id, (err, archivo) => {
        if (err) {
            return res.status(400).send({ message: 'Error al buscar el archivo' })
        }
        if (!archivo) {
            return res.status(404).send({ message: 'No existe el archivo' })
        }
        res.send(archivo)
    })
}

module.exports = {
    uploadNewFilesAsambleas,
    listarArchivos,
    obtenerUnArchivo,
    obtenerInformacionArchivo
}