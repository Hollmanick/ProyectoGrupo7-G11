const { Router } = require("express");
const { getClientes, postCliente } = require("../controllers/cliente.js")
const { validarBodyCliente } = require("../validators/cliente.js")
const router = Router();

router
    .get("/", getClientes)
    .get("/:id",)
    .post("/", validarBodyCliente, postCliente)
    .put("/:id",)
    .delete("/:id",)

module.exports = router;