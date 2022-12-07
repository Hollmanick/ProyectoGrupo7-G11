const {Router} = require('express');
const {getAlquilers,postAlquiler} = require('../controllers/alquiler.js')
const {validarBodyAlquiler} = require('../validators/alquiler.js')
const router = Router();

router
  .get('/',getAlquilers)
  .get('/:id',)
  .post('/',validarBodyAlquiler,postAlquiler)
  .put('/',)
  .delete('/',)

module.exports = router;