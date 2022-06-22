"use strict";
const express = require("express");
const multer = require('multer');
const path = require('path');
const upload = require('../middlewares/handleMulter');
const asambleaController = require("../controllers/asambleaController");
require('dotenv').config();
const auth = require('../middlewares/auth');

const api = express.Router();
api.post("/asamblea", asambleaController.crearAsamblea);
api.get("/asambleas/:carrera", auth.isAuth, asambleaController.asambleasPorCarrera);
api.get("/asambleas/terminadas/:carrera", asambleaController.asambleasTerminadas);
api.get("/asambleas/noTerminadas/:carrera", asambleaController.asambleasNoTerminadas);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id", asambleaController.eliminarAsamblea);
api.post("/asambleas/filtro/fecha/:carrera", asambleaController.filtrarAsambleaPorFecha);
api.post("/asambleas/filtro/tipo/:carrera", asambleaController.filtrarPorTipoDeAsamblea);
api.post("/asamblea/archivos/:id/:carrera", upload.array('archivos'), asambleaController.subirArchivos);


module.exports = api;