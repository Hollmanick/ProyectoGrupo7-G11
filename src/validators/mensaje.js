const { check, validationResult } = require("express-validator");

const validarBodyMensaje = [
    check("titulo").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("descripcion").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("auto_id").isMongoId().optional({ checkFalsy: true }),
    check("cliente_id").isMongoId().optional({ checkFalsy: true }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

module.exports = { validarBodyMensaje };