const { check, validationResult } = require("express-validator");

const validarBodyCliente = [
    check("email").exists().notEmpty().isString().isEmail(),
    check("contrasena").exists().notEmpty().isLength({ min: 8, max: 50 }),
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("edad").exists().notEmpty().toInt(),
    check("mensaje_id").isMongoId().optional({checkFalsy: true}),
    check("alquiler_id").isMongoId().optional({checkFalsy: true}),
    (req, res, next) => {
        console.log('req.body para validador',req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

const validarParamsCliente = [
    check("id").exists().notEmpty().isString().isMongoId(),
    (req, res, next) => {
        console.log('req.params para validador',req.params)
        const errors = validationResult(req.params);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

module.exports = { validarBodyCliente, validarParamsCliente };