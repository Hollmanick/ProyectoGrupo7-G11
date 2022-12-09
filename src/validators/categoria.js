const { check, validationResult } = require("express-validator");

const validarBodyCategoria = [
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("descripcion").exists().notEmpty().isLength({ min: 3, max: 50 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

module.exports = { validarBodyCategoria };