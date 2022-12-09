const { Categoria } = require("../models/categoria.js")
const { matchedData } = require("express-validator");

/**
 * Listar todos los documentos de la coleccion categoria
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getCategorias = async (req, res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion categoria
        const categorias = await Categoria.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res_description": "documentos existentes dentro de la coleccion categoria",
            "data": categorias
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Encontrar un documento de la coleccion categoria por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const categoria = await Categoria.findById(id);
        console.log(categoria);
        res.status(200).json({
            "code_response": 200,
            "res_description": `categoria para id: ${id}`,
            "data": categoria
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }

}

/**
 * Recupera el documento de la coleccion categoria cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensajesCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Categoria.aggregate(
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
                        foreignField: "categoria_id", // clave del documento foraneo
                        as: "mensajesCategoria" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getMensajesCategoria documento", documento)
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
 * Recupera el documento de la coleccion categoria cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquilerCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Categoria.aggregate(
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
                        foreingField: "categoria_id", // clave del documento foraneo
                        as: "alquilerCategoria" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getAlquilerCategoria documento", documento)
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
 * Crear un nuevo documento en la coleccion categoria
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const postCategoria = async (req, res) => {
    try {
        const body = matchedData(req);
        console.log("req.body", body);
        const newCategoria = await Categoria.create(body);
        console.log(newCategoria);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Categoria creado"
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }

}

/**
 * Modificar un documento de la coleccion categoria
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const putCategoria = async (req, res) => {
    try {
        const data = matchedData(req);
        console.log("req", data.params, data.body);
        const documento = await Categoria.findByIdAndUpdate(Id, body)
        console.log("putCategoria documento", documento)
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
 * Modificar un documento de la coleccion categoria
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Categoria.findByIdAndDelete(id)
        console.log("deleteCategoria documento", documento)
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
    getCategorias,
    getCategoria,
    getMensajesCategoria,
    getAlquilerCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}