const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let fecha = new Date();
        fecha = fecha.getFullYear() + '_' + (fecha.getMonth() + 1) + '_' + fecha.getDate() + '_' + fecha.getHours() + '_' + fecha.getMinutes() + '_' + fecha.getSeconds()
        console.log(fecha)
        let nombreArchivo = req.params.carrera + '_' + req.params.id + '_' + fecha + '_' + file.originalname.replace(/\s/g, '_', file.originalname);
        console.log(nombreArchivo)

        cb(null, nombreArchivo);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "text/csv") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb('Only .png, .jpg and .jpeg format allowed!');
        }
    }
});

module.exports = upload;
