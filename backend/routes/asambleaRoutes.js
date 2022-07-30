const express = require("express");
const asambleaController = require("../controllers/asambleaController");
require('dotenv').config();
const auth = require('../middlewares/auth');
const handleFiltro = require('../middlewares/handleFiltroAsambleas');

const api = express.Router();
api.post("/asamblea/:carrera", asambleaController.crearAsamblea);
api.get("/asambleas/:carrera", asambleaController.asambleasPorCarrera);
api.get("/asamblea/:id", asambleaController.buscarAsamblea);
api.put("/asamblea/update/:id", asambleaController.modificarAsamblea);
api.delete("/asamblea/delete/:id", asambleaController.eliminarAsamblea);
api.post("/asambleas/filtro/fecha/:carrera", asambleaController.filtrarAsambleaPorFecha);
api.post("/asambleas/filtro/tipo/:carrera", asambleaController.filtrarPorTipoDeAsamblea);
api.post("/asambleas/filtro/:carrera", asambleaController.filtroAsambleas);
api.get("/filtro/:carrera", handleFiltro.handleFiltro, asambleaController.Filtro);


module.exports = api;