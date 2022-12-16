const { Router } = require("express");
const { getClientes, postCliente, getCliente, putCliente, deleteCliente } = require("../controllers/cliente.js")
const { validarBodyCliente } = require("../validators/cliente.js")
const router = Router();

router
    .get("/mostrarClientes", getClientes)
    .get("/mostrarCliente/:id", getCliente)
    .post("agregarCliente/", validarBodyCliente, postCliente)
    .put("editarCliente/:id", validarBodyCliente, putCliente)
    .delete("eliminarCliente/:id", deleteCliente)

module.exports = router;