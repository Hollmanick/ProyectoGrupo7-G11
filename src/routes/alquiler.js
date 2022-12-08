const {Router} = require('express');
const {getAlquileres,postAlquiler} = require('../controllers/alquiler.js')
const {validarBodyAlquiler} = require('../validators/alquiler.js')
const router = Router();

router
  .get('/',getAlquileres)
  .get('/:id',)
  .post('/guardarAlquiler',validarBodyAlquiler,postAlquiler)
  .put('/actualizarAlquiler/:id',)
  .delete('eliminarAlquiler/:id',)

module.exports = router;