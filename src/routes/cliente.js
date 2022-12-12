const {Router} = require('express');
const { postCliente, getCliente, putCliente, getClientes, deleteCliente} = require('../controllers/cliente.js')
const {validarBodyCliente, validarParamsCliente} = require('../validators/cliente.js')
const router = Router();

router
  .get('/',getClientes)
  .get('/:id', validarParamsCliente,getCliente)
  .post('/',validarBodyCliente,postCliente)
  .put('/:id',validarParamsCliente,validarBodyCliente,putCliente)
  .delete('/:id',validarParamsCliente,deleteCliente)

module.exports = router;
