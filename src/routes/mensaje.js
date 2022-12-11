const { Router } = require("express");
const { getMensajes, postMensaje, getMensaje, putMensaje, getMensajesCliente, getAlquilerCliente, deleteMensaje } = require("../controllers/mensaje.js")
const { validarBodyMensaje } = require("../validators/mensaje.js")
const router = Router();

router
    .get("/", getMensajes)
    .get("/:id", getMensaje)
    .get("/alquiler/:id", getAlquilerCliente)
    .post("/", validarBodyMensaje, postMensaje)
    .put("/:id", validarBodyMensaje, putMensaje)
    .delete("/:id", deleteMensaje)

module.exports = router;