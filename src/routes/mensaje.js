const { Router } = require("express");
const { getMensajes, postMensaje, getMensaje, putMensaje, deleteMensaje } = require("../controllers/mensaje.js")
const { validarBodyMensaje } = require("../validators/mensaje.js")
const router = Router();

router
    .get("/mostrarMensajes", getMensajes)
    .get("/mostrarMensaje/:id", getMensaje)
    .post("agregarMensaje/", validarBodyMensaje, postMensaje)
    .put("editarMensaje/:id", validarBodyMensaje, putMensaje)
    .delete("eliminarMensaje/:id", deleteMensaje)

module.exports = router;