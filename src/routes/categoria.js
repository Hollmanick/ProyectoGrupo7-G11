const { Router } = require("express");
const { getCategorias, postCategoria, getCategoria, putCategoria, getMensajesCliente, getAlquilerCliente, deleteCategoria } = require("../controllers/categoria.js")
const { validarBodyCategoria } = require("../validators/categoria.js")
const router = Router();

router
    .get("/", getCategorias)
    .get("/:id", getCategoria)
    .get("/alquiler/:id", getAlquilerCliente)
    .post("/", validarBodyCategoria, postCategoria)
    .put("/:id", validarBodyCategoria, putCategoria)
    .delete("/:id", deleteCategoria)

module.exports = router;