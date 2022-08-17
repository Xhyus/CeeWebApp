const express = require("express");
const archivoController = require("../controllers/archivoController");
const upload = require('../middlewares/handleMulter');
require('dotenv').config();
const fileSize = require('../middlewares/fileSize');

const api = express.Router();
api.post("/archivos/:id/:carrera/:asunto", upload.array('archivos'), fileSize, archivoController.uploadNewFiles);
api.get("/archivo/download/:id", archivoController.obtenerUnArchivo);
api.get("/archivos", archivoController.listarArchivos);
api.get("/archivo/:id", archivoController.obtenerInformacionArchivo);

module.exports = api;