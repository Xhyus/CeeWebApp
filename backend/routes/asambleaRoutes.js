"use strict";
const express = require("express");
const asambleaController = require("../controllers/asambleaController");

const api = express.Router();
api.post("/asamblea", asambleaController.crearAsamblea);
api.get("/asambleas/terminadas/:carrera", asambleaController.asambleasTerminadas);
api.get("/asambleas/noTerminadas/:carrera", asambleaController.asambleasNoTerminadas);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id", asambleaController.eliminarAsamblea);



module.exports = api;