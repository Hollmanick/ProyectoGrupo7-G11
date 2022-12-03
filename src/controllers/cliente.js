
/**
 * Listar todos los clientes de la base de datos
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getClientes = (req,res) => {
    res.status(200).json({
        "code_response": 200
    })
}

module.exports = {
    getClientes
}