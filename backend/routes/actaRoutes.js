const express = require('express');
const actaController = require('../controllers/actaController');

const api = express.Router()
api.post("/acta", actaController.crearActa);
api.get("/actas", actaController.listarActas);
api.get("/acta/:id", actaController.buscarActa);
api.put("/acta/update/:id", actaController.modificarActa);
api.delete("/acta/delete/:id", actaController.eliminarActa);

module.exports = api