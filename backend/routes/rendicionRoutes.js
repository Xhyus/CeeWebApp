"use strict";
const express = require("express");
const rendicionesController = require("../controllers/rendicionController");

const api = express.Router();
api.post("/rendicion", rendicionesController.crearRendicion);
api.get("/rendiciones", rendicionesController.obtenerRendiciones);
api.put("/rendicion/update/:id", rendicionesController.modificarRendicion);
api.delete("/rendicion/delete/:id", rendicionesController.eliminarRendicion);

module.exports = api;