const {Router} = require('express');
const {getClientes} =require('../controllers/cliente.js')
const router = Router();

router
  .get('/',getClientes)
  .post('',)
  .put('/',)
  .delete('/',)

module.exports = router;
