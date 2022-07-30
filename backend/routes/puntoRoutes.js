"use strict";
const express = require("express");
const puntoController = require("../controllers/puntoController");

const api = express.Router();
api.post("/punto/:id", puntoController.crearPunto);
api.get("/puntos", puntoController.obtenerPuntos);
api.get("/punto/search/:id", puntoController.obtenerPunto);
api.put("/punto/update/:id", puntoController.modificarPunto);

module.exports = api;