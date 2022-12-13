const { Router } = require("express");
const { getClientes, postCliente, getCliente, putCliente, getMensajesCliente, getAlquilerCliente, deleteCliente } = require("../controllers/cliente.js")
const { validarBodyCliente } = require("../validators/cliente.js")
const router = Router();

router
    .get("/", getClientes)
    .get("/:id", getCliente)
    .get("/mensajes/:id", getMensajesCliente)
    .get("/alquiler/:id", getAlquilerCliente)
    .post("/", validarBodyCliente, postCliente)
    .put("/:id", validarBodyCliente, putCliente)
    .delete("/:id", deleteCliente)

module.exports = router;