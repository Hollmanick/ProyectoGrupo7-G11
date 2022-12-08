var express = require("express");
var MessageController = require("../controllers/mensaje");

var router = express.Router();


router.post("/guardarMensaje", MessageController.save);
router.post("/loginMensaje", MessageController.login);
router.put("/actualizarMensaje/:id", MessageController.update);
router.delete("/eliminarMensaje/:id", MessageController.eliminar);
router.get("/Mensajes", MessageController.ListaMensajes);
router.get("/Mensaje/:id", MessageController.mostrarMensaje);

module.exports = router;