const { Router } = require("express");
const { getAlquileres, postAlquiler, getAlquiler, putAlquiler, getMensajesCliente, getAlquilerCliente, deleteAlquiler } = require("../controllers/alquiler.js")
const { validarBodyAlquiler } = require("../validators/alquiler.js")
const router = Router();

router
    .get("/", getAlquileres)
    .get("/:id", getAlquiler)
    .get("/mensajes/:id", getMensajesCliente)
    .get("/alquiler/:id", getAlquilerCliente)
    .post("/", validarBodyAlquiler, postAlquiler)
    .put("/:id", validarBodyAlquiler, putAlquiler)
    .delete("/:id", deleteAlquiler)

module.exports = router;