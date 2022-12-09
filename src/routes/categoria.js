const { Router } = require('express');
const { getCategorias, postCategoria } = require('../controllers/categoria.js')
const { validarBodyCategoria } = require('../validators/categoria.js')
const router = Router();

router
    .get('/', getCategorias)
    .get('/:id',)
    .post('/', validarBodyCategoria, postCategoria)
    .put('/:id',)
    .delete('/:id',)

module.exports = router;