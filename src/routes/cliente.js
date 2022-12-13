const { Router } = require("express");
const { getClientes, postCliente, getCliente, putCliente, getClienteCliente, deleteCliente } = require("../controllers/cliente.js")
const { validarBodyCliente } = require("../validators/cliente.js")
const router = Router();

router
    .get("/", getClientes)
    .get("/:id", getCliente)
    .get("/alquiler/:id", getClienteCliente)
    .post("/", validarBodyCliente, postCliente)
    .put("/:id", validarBodyCliente, putCliente)
    .delete("/:id", deleteCliente)

module.exports = router;