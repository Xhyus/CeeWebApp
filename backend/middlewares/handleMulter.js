const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ruta = './uploads/' + req.params.carrera + '/' + req.params.asunto + '/' + req.params.id;
        if (!fs.existsSync(ruta)) {
            fs.mkdirSync(ruta, { recursive: true });
        }
        cb(null, ruta)
    },
    filename: function (req, file, cb) {
        let fecha = new Date();
        fecha = fecha.getFullYear() + '_' + (fecha.getMonth() + 1) + '_' + fecha.getDate() + '_' + fecha.getHours() + '_' + fecha.getMinutes() + '_' + fecha.getSeconds()
        let nombreArchivo = fecha + '_' + file.originalname.replace(/\s\+/g, '_', file.originalname);
        cb(null, nombreArchivo);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "text/csv") {
            req.params.archivoValido = true;
            cb(null, req.params.archivoValido);
        } else {
            req.params.archivoValido = false;
            cb(null, req.params.archivoValido);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;