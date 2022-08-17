const express = require('express');
const asistenciaController = require('../controllers/asistenciaController');

const api = express.Router()
api.post("/asistencia", asistenciaController.crearAsistencia)
api.get("/asistencias", asistenciaController.obtenerAsistencia)
api.get("/asistencia/:id", asistenciaController.obtenerAsistenciaPorId)
api.put("/asistencia/update/:id", asistenciaController.actualizarAsistencia)
api.delete("/asistencia/delete/:id", asistenciaController.eliminarAsistencia)

module.exports = api