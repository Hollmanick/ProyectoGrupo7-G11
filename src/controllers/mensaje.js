var validator = require("validator");
var Mensaje = require("../models/Mensajes");

var controller = {
    save: function(req,res){
        var params = req.body;
        console.log("parametros aceptados",params)
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        var validate_idauto = !validator.isEmpty(params.idauto)
        var validate_idcliente = !validator.isEmpty(params.idcliente)
        if(validate_name && validate_description && validate_idauto && validate_idcliente){
            var mensaje = new Mensaje();
            mensaje.name = params.nombre;
            mensaje.description = params.descripcion;
            mensaje.idauto = params.idauto;
            mensaje.idcliente = params.idcliente;
            console.log(mensaje);
            mensaje.save((err, messageStored) =>{
                if (err || !messageStored){
                return res.status(404).send({
                    message:"El mensaje no se guardo",
                    status: "error"
                    });
                }  
            });
            return res.status(200).send({
                message:"mensaje guardado"
            });
        }else{
            return res.status(200).send({
                message:"Validación de información incorrecta"
              });
        }
    },

    login: function(req,res){
        return res.status(200).send({
            message: "Login"
        });
    },

    update: function(req,res){
        var params = req.body;
        var mensajeId = req.params.id;
        console.log(mensajeId);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        var validate_idauto = !validator.isEmpty(params.idauto)
        var validate_idcliente = !validator.isEmpty(params.idcliente)
        if(validate_name && validate_description && validate_idauto && validate_idcliente){
            var update={
                name:params.nombre,
                description:params.descripcion,
                idauto:params.idauto,
                idcliente:params.idcliente
            }

            Mensaje.findOneAndUpdate({mensajeId},update,{new:true},(err,messageUpdate) => {
                if(err){
                    return res.status(500).send({
                        message: "error en la petición",
                        status:"Error"
                    });
                }

                if (!messageUpdate){
                    return res.status(404).send({
                        message: "mensaje no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Mensaje Actualizado correctamente",
                    status:"success",
                    messageUpdate
                });

            })

        }else{
            return res.status(200).send({
                message: "Validación incorrecta"
            });
        }
    },

    eliminar: function(req,res){
        var mensajeId = req.params.id;
        Mensaje.findOneAndDelete({_id:mensajeId},(err,messageRemoved) => {
            if(err){
                return res.status(500).send({
                    message: "error en la petición",
                    status:"Error"
                });
            }

            if (!messageRemoved){
                return res.status(404).send({
                    message: "mensaje no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message: "Eliminado correctamente",
                mensaje:messageRemoved
            });
        })
        
    },

    ListaMensajes: function(req,res){
        Mensaje.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message: "Mensajes",
                doc
            });
        });
    },

    mostrarMensaje: function(req,res){
        var mensajeId = req.params.id;
        Mensaje.findById(mensajeId)
               .exec((err,mensaje)=>{
                if(err){
                    return res.status(500).send({
                        message: "error en la petición",
                        status:"Error"
                    });
                }
    
                if (!mensaje){
                    return res.status(404).send({
                        message: "mensaje no encontrado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es un mensaje",
                    mensaje
                });
               })
        
    } 

}

module.exports = controller;