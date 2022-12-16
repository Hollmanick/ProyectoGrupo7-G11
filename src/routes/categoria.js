const { Router } = require("express");
const { getCategorias, postCategoria, getCategoria, putCategoria, deleteCategoria } = require("../controllers/categoria.js")
const { validarBodyCategoria } = require("../validators/categoria.js")
const router = Router();

router
    .get("/mostrarCategorias", getCategorias)
    .get("/mostrarCategoria/:id", getCategoria)
    .post("/agregarCategoria", validarBodyCategoria, postCategoria)
    .put("/editarCategoria/:id", validarBodyCategoria, putCategoria)
    .delete("/eliminarCategoria/:id", deleteCategoria)

module.exports = router;