"use strict";
const express = require("express");
const rendicionesController = require("../controllers/rendicionController");

const api = express.Router();

//? Crear rendición.
api.post("/rendicion", rendicionesController.crearRendicion);

//? Rendiciones por filtro.
api.get("/rendiciones", rendicionesController.obtenerRendiciones);
api.get("/rendicion/:id", rendicionesController.obtenerRendicionPorID);
api.get("/rendicionesMenor10K", rendicionesController.obtenerRendicionesMenor10K);
api.get("/rendicionesMenor3K", rendicionesController.obtenerRendicionesMenor3K);
api.get("/rendicionesOficina", rendicionesController.obtenerRendicionesOficina);
api.get("/rendicionesActividades", rendicionesController.obtenerRendicionesActividades);
api.get("/rendicionesOtros", rendicionesController.obtenerRendicionesOtros);

//? Modificaciones.
api.put("/rendicion/update/:id", rendicionesController.modificarRendicion);
api.delete("/rendicion/delete/:id", rendicionesController.eliminarRendicion);

module.exports = api;