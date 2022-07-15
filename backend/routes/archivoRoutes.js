const express = require("express");
const archivoController = require("../controllers/archivoController");
const upload = require('../middlewares/handleMulter');
require('dotenv').config();

const api = express.Router();
api.post("/archivos/:id/:carrera/:asunto", upload.array('archivos'), archivoController.uploadNewFiles);
api.get("/archivo/download/:id", archivoController.downloadFiles);
api.get("/archivo/:id", archivoController.obtenerUnArchivo);
api.get("/archivos", archivoController.listarArchivos);

module.exports = api;