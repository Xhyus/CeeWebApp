const express = require("express");
const archivoController = require("../controllers/archivoController");
const upload = require('../middlewares/handleMulter');
require('dotenv').config();
const fileSize = require('../middlewares/fileSize');

const api = express.Router();
api.post("/archivos/:id/:carrera/:asunto", upload.array('archivos'), fileSize, archivoController.uploadNewFiles);
api.get("/archivo/:id", archivoController.obtenerUnArchivo);
api.get("/archivos", archivoController.listarArchivos);

module.exports = api;