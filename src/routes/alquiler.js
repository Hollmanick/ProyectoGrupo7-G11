const { Router } = require("express");
const { getAlquileres, postAlquiler } = require("../controllers/alquiler.js")
const { validarBodyAlquiler } = require("../validators/alquiler.js")
const router = Router();

router
    .get("/", getAlquileres)
    .get("/:id",)
    .post("/", validarBodyAlquiler, postAlquiler)
    .put("/:id",)
    .delete("/:id",)

module.exports = router;