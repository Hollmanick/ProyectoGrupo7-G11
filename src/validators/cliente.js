const { check, validationResult } = require("express-validator");

const validarBodyCliente = [
    check("correo").exists().notEmpty().isString().isEmail(),
    check("contrasena").exists().notEmpty().isLength({ min: 8, max: 50 }),
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("edad").exists().notEmpty().toInt(),
    check("img").isString().optional({ checkFalsy: true }),
    check("mensaje_id").isMongoId().optional({ checkFalsy: true }),
    check("alquiler_id").isMongoId().optional({ checkFalsy: true }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

module.exports = { validarBodyCliente };