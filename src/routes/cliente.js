const { Router } = require("express");
const { getClientes, postCliente, getCliente, putCliente, deleteCliente } = require("../controllers/cliente.js")
const { validarBodyCliente } = require("../validators/cliente.js")
const router = Router();

router
    .get("/", getClientes)
    .get("/:id", getCliente)
    .post("/", validarBodyCliente, postCliente)
    .put("/:id", validarBodyCliente, putCliente)
    .delete("/:id", deleteCliente)

module.exports = router;