const { Auto } = require("../models/Auto.js")
const { matchedData } = require("express-validator");

/**
 * Listar todos los documentos de la coleccion auto
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAutos = async (req, res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion auto
        const autos = await Auto.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res_description": "documentos existentes dentro de la coleccion auto",
            "data": autos
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Encontrar un documento de la coleccion auto por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAuto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const auto = await Auto.findById(id);
        console.log(auto);
        res.status(200).json({
            "code_response": 200,
            "res_description": `auto para id: ${id}`,
            "data": auto
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Recupera el documento de la coleccion auto cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquilerCliente = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Auto.aggregate(
            [
                {   // primera etapa
                    $match: {
                        _id: id // donde el campo id coincida
                    }
                },
                {   // segunda etapa
                    $lookup: {
                        from: "Auto", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreingField: "auto_id", // clave del documento foraneo
                        as: "autoAuto" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getAutoCliente documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus auto`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Crear un nuevo documento en la coleccion auto
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const postAuto = async (req, res) => {
    try {
        const body = matchedData(req);
        console.log("req.body", body);
        const newAuto = await Auto.create(body);
        console.log(newAuto);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Auto creado"
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Modificar un documento de la coleccion auto
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const putAuto = async (req, res) => {
    try {
        const data = matchedData(req);
        console.log("req", data.params, data.body);
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Auto.findByIdAndUpdate(id, data, { new: true });
        console.log("putAuto documento", documento)
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} actualizado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Modificar un documento de la coleccion auto
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteAuto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Auto.findByIdAndDelete(id)
        console.log("deleteAuto documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} eliminado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

module.exports = {
    getAutos,
    getAuto,
    getAlquilerCliente,
    postAuto,
    putAuto,
    deleteAuto
}