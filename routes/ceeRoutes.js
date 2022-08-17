const express = require("express");
const ceeController = require("../controllers/ceeController");

const api = express.Router()
api.post("/cee", ceeController.crearCee);
api.get("/cees", ceeController.listarCee);
api.get("/cee/:id", ceeController.buscarCee)
api.put("/cee/update/:id", ceeController.modificarCee);
api.delete("/cee/delete/:id", ceeController.eliminarCee);

module.exports = api