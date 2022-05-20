"use strict";
const express = require("express");
const puntoController = require("../controllers/puntoController");

const api = express.Router();
api.post("/punto", puntoController.crearPunto);
api.get("/puntos", puntoController.obtenerPuntos);
api.put("/punto/update/:id", puntoController.modificarPunto);

module.exports = api;