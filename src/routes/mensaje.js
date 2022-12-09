const { Router } = require('express');
const { getMensajes, postMensaje } = require('../controllers/mensaje.js')
const { validarBodyMensaje } = require('../validators/mensaje.js')
const router = Router();

router
    .get('/', getMensajes)
    .get('/:id',)
    .post('/', validarBodyMensaje, postMensaje)
    .put('/:id',)
    .delete('/:id',)

module.exports = router;