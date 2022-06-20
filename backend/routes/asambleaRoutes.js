"use strict";
const express = require("express");
const asambleaController = require("../controllers/asambleaController");

const api = express.Router();
api.post("/asamblea", asambleaController.crearAsamblea);
api.get("/asambleas/:carrera", asambleaController.asambleasPorCarrera);
api.get("/asambleas/terminadas/:carrera", asambleaController.asambleasTerminadas);
api.get("/asambleas/noTerminadas/:carrera", asambleaController.asambleasNoTerminadas);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id", asambleaController.eliminarAsamblea);
api.post("/asambleas/filtro/fecha/:carrera", asambleaController.filtrarAsambleaPorFecha);
api.post("/asambleas/filtro/tipo/:carrera", asambleaController.filtrarPorTipoDeAsamblea);


module.exports = api;