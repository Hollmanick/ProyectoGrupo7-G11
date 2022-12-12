const { Mensaje } = require("../models/Mensaje.js")
const { matchedData } = require("express-validator");

/**
 * Listar todos los documentos de la coleccion mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensajes = async (req, res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion mensaje
        // const mensajes = await Mensaje.find({}).lean();
        const mensajes = await Mensaje.aggregate(
            [
                {   // Etapa coleccion autosConMensajes
                    $lookup: {
                        from: "autos", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreignField: "mensaje_id", // clave del documento foraneo
                        as: "autosConMensajes" // nombre del campo a agregar
                    }
                },
                {   // Etapa coleccion clientesConMensajes
                    $lookup: {
                        from: "clientes", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreignField: "mensaje_id", // clave del documento foraneo
                        as: "clientesConMensajes" // nombre del campo a agregar
                    }
                } 
            ]
        )
        console.log("getMensajes", mensajes);
        res.status(200).json({
            "code_response": 200,
            "res_description": "documentos existentes dentro de la coleccion mensaje",
            "data": mensajes
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Encontrar un documento de la coleccion mensaje por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensaje = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const mensaje = await Mensaje.findById(id);
        console.log(mensaje);
        res.status(200).json({
            "code_response": 200,
            "res_description": `mensaje para id: ${id}`,
            "data": mensaje
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Recupera el documento de la coleccion mensaje cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensajeCliente = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Mensaje.aggregate(
            [
                {   // primera etapa
                    $match: {
                        _id: id // donde el campo id coincida
                    }
                },
                {   // segunda etapa
                    $lookup: {
                        from: "Mensaje", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreingField: "mensaje_id", // clave del documento foraneo
                        as: "mensajeMensaje" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getMensajeCliente documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus mensaje`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Crear un nuevo documento en la coleccion mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const postMensaje = async (req, res) => {
    try {
        const body = matchedData(req);
        console.log("req.body", body);
        const newMensaje = await Mensaje.create(body);
        console.log(newMensaje);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Mensaje creado"
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Modificar un documento de la coleccion mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const putMensaje = async (req, res) => {
    try {
        const data = matchedData(req);
        console.log("req", data.params, data.body);
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Mensaje.findByIdAndUpdate(id, data, { new: true });
        console.log("putMensaje documento", documento)
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
 * Modificar un documento de la coleccion mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteMensaje = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Mensaje.findByIdAndDelete(id)
        console.log("deleteMensaje documento", documento)
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
    getMensajes,
    getMensaje,
    getMensajeCliente,
    postMensaje,
    putMensaje,
    deleteMensaje
}