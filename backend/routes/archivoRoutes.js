const express = require("express");
const archivoController = require("../controllers/archivoController");
const upload = require('../middlewares/handleMulter');
require('dotenv').config();

const api = express.Router();
api.post("/archivos/:id/:carrera/:asunto", upload.array('archivos'), archivoController.uploadNewFiles);


module.exports = api;