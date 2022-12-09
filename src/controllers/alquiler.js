const { Alquiler } = require("../models/alquiler.js")
const { matchedData } = require("express-validator");

/**
 * Listar todos los documentos de la coleccion alquiler
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquileres = async (req, res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion alquiler
        const alquileres = await Alquiler.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res_description": "documentos existentes dentro de la coleccion alquiler",
            "data": alquileres
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Encontrar un documento de la coleccion alquiler por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquiler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const alquiler = await Alquiler.findById(id);
        console.log(alquiler);
        res.status(200).json({
            "code_response": 200,
            "res_description": `alquiler para id: ${id}`,
            "data": alquiler
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }

}

/**
 * Recupera el documento de la coleccion alquiler cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensajesAlquiler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Alquiler.aggregate(
            [
                // {   // primera etapa
                //     $match: {
                //         "_id": id // donde el campo id coincida
                //     } 
                // },
                {   // segunda etapa
                    $lookup: {
                        from: "mensajes", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreignField: "alquiler_id", // clave del documento foraneo
                        as: "mensajesAlquiler" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getMensajesAlquiler documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus mensajes`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }

}

/**
 * Recupera el documento de la coleccion alquiler cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquilerAlquiler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Alquiler.aggregate(
            [
                {   // primera etapa
                    $match: {
                        _id: id // donde el campo id coincida
                    }
                },
                {   // segunda etapa
                    $lookup: {
                        from: "Alquiler", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreingField: "alquiler_id", // clave del documento foraneo
                        as: "alquilerAlquiler" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getAlquilerAlquiler documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus alquiler`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }

}

/**
 * Crear un nuevo documento en la coleccion alquiler
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const postAlquiler = async (req, res) => {
    try {
        const body = matchedData(req);
        console.log("req.body", body);
        const newAlquiler = await Alquiler.create(body);
        console.log(newAlquiler);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Alquiler creado"
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }

}

/**
 * Modificar un documento de la coleccion alquiler
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const putAlquiler = async (req, res) => {
    try {
        const data = matchedData(req);
        console.log("req", data.params, data.body);
        const documento = await Alquiler.findByIdAndUpdate(Id, body)
        console.log("putAlquiler documento", documento)
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
 * Modificar un documento de la coleccion alquiler
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteAlquiler = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Alquiler.findByIdAndDelete(id)
        console.log("deleteAlquiler documento", documento)
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
    getAlquileres,
    getAlquiler,
    getMensajesAlquiler,
    getAlquilerAlquiler,
    postAlquiler,
    putAlquiler,
    deleteAlquiler
}