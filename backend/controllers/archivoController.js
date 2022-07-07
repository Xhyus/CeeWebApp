const archivos = require('../models/archivo');

const uploadNewFiles = async (req, res) => {
    const { files } = req
    if (req.archivoValido === false) {
        return res.status(400).send({ message: 'Solo se aceptan archivos con extensiones .png, .jpg, .jpeg, .pdf, .docx, .xlsx, .csv' })
    }
    if (req.sizeFile === false) {
        return res.status(400).send({ message: 'El archivo es demasiado grande' })
    }
    if (files.length === 0) {
        return res.status(400).send({ message: 'No se ha subido ningun archivo' })
    }
    let aux = files.map((file) => {
        const archivo = new archivos({
            nombre: file.originalname,
            ruta: file.path
        })
        archivo.save()
            .catch(err => {
                return res.status(400).send({ message: 'Error al subir archivo' })
            })
        return archivo
    })
    res.status(201).send(aux)

}
const downloadFiles = (req, res) => {
    const { id } = req.params
    archivos.findById(id, (err, archivo) => {
        if (err) {
            return res.status(400).send({ message: 'Error al buscar el archivo' })
        }
        if (!archivo) {
            return res.status(404).send({ message: 'No existe el archivo' })
        }
        res.sendFile(archivo.ruta)
    })
}


module.exports = {
    uploadNewFiles,
    downloadFiles
}