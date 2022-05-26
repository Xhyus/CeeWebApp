"use strict";
const express = require("express");
const asambleaController = require("../controllers/asambleaController");

const api = express.Router();
api.post("/asamblea", asambleaController.crearAsamblea);
api.get("/asambleas", asambleaController.listarAsambleas);
api.get("/asambleas/terminadas", asambleaController.listarAsambleasTerminadas);
api.get("/asambleas/terminadas/:id", asambleaController.listarAsambleasTerminadasId);
api.get("/asambleas/porRealizar", asambleaController.listarAsambleasPorRealizar);
// api.get("/asambleas/porRealizar/:id", asambleaController.listarAsambleasPorRealizarId);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id", asambleaController.eliminarAsamblea);



module.exports = api;