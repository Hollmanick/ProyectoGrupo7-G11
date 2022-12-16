const { Router } = require("express");
const { getAlquileres, postAlquiler, getAlquiler, putAlquiler, deleteAlquiler } = require("../controllers/alquiler.js")
const { validarBodyAlquiler } = require("../validators/alquiler.js")
const router = Router();

router
    .get("/mostrarAlquileres", getAlquileres)
    .get("/mostrarAlquiler/:id", getAlquiler)
    .post("agregarAlquiler/", validarBodyAlquiler, postAlquiler)
    .put("editarAlquiler/:id", validarBodyAlquiler, putAlquiler)
    .delete("eliminarAlquiler/:id", deleteAlquiler)

module.exports = router;