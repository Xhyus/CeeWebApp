const express = require("express");
const asambleaController = require("../controllers/asambleaController");
require('dotenv').config();
const auth = require('../middlewares/auth');
const handleFiltro = require('../middlewares/handleFiltroAsambleas');
const asamblea = require("../models/asamblea");

const api = express.Router();
api.post("/asamblea/:carrera", asambleaController.crearAsamblea);
api.get("/asambleas/:carrera", asambleaController.asambleasPorCarrera);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id/:carrera", asambleaController.eliminarAsamblea);
api.get("/asambleas/filtros/:carrera", asambleaController.filtro);

module.exports = api;