const { Router } = require("express");
const { getMensajes, postMensaje, getMensaje, putMensaje, deleteMensaje } = require("../controllers/mensaje.js")
const { validarBodyMensaje } = require("../validators/mensaje.js")
const router = Router();

router
    .get("/", getMensajes)
    .get("/:id", getMensaje)
    .post("/", validarBodyMensaje, postMensaje)
    .put("/:id", validarBodyMensaje, putMensaje)
    .delete("/:id", deleteMensaje)

module.exports = router;
