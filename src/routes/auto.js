const { Router } = require("express");
const { getAutos, postAuto, getAuto, putAuto, deleteAuto } = require("../controllers/auto.js")
const { validarBodyAuto } = require("../validators/auto.js")
const router = Router();

router
    .get("/mostrarAutos", getAutos)
    .get("/mostrarAuto/:id", getAuto)
    .post("agregarAuto/", validarBodyAuto, postAuto)
    .put("editarAuto/:id", validarBodyAuto, putAuto)
    .delete("eliminarAuto/:id", deleteAuto)

module.exports = router;