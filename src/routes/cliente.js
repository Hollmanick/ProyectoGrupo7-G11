const {Router} = require('express');
const {getClientes, postCliente, getCliente, putCliente, getMensajesCliente, getAlquilerCliente} = require('../controllers/cliente.js')
const {validarBodyCliente} = require('../validators/cliente.js')
const router = Router();

router
  .get('/',getClientes)
  .get('/:id',getCliente)
  .get('/mensajes/:id',getMensajesCliente)
  .get('/alquiler/:id',getAlquilerCliente)
  .post('/',validarBodyCliente,postCliente)
  .put('/update/:id',validarBodyCliente,putCliente)
  .delete('/delete/:id',)

module.exports = router;
