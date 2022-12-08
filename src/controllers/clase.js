var validator = require("validator");
var Clase = require("../models/Clase");

var controller = {
    save: function(req,res){
        var params = req.body;
        console.log("parametros aceptados",params)
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        var validate_idauto = !validator.isEmpty(params.idauto)
        if(validate_name && validate_description && validate_idauto){
            var clase = new Clase();
            clase.name = params.nombre;
            clase.description = params.descripcion;
            clase.idauto = params.idauto;
            console.log(mensaje);
            clase.save((err, categoryStored) =>{
                if (err || !categoryStored){
                return res.status(404).send({
                    message:"clase no guardada",
                    status: "error"
                    });
                }  
            });
            return res.status(200).send({
                message:"clase guardada"
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
        var claseId = req.params.id;
        console.log(claseId);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        var validate_idauto = !validator.isEmpty(params.idauto)
        if(validate_name && validate_description && validate_idauto){
            var update={
                name:params.nombre,
                description:params.descripcion,
                idauto:params.idauto,
                
            }

            Clase.findOneAndUpdate({claseId},update,{new:true},(err,categoryUpdate) => {
                if(err){
                    return res.status(500).send({
                        message: "error en la petición",
                        status:"Error"
                    });
                }

                if (!categoryUpdate){
                    return res.status(404).send({
                        message: "mensaje no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "clase Actualizada correctamente",
                    status:"success",
                    categoryUpdate
                });

            })

        }else{
            return res.status(200).send({
                message: "Validación incorrecta"
            });
        }
    },

    eliminar: function(req,res){
        var claseId = req.params.id;
        Clase.findOneAndDelete({_id:claseId},(err,categoryRemoved) => {
            if(err){
                return res.status(500).send({
                    message: "error en la petición",
                    status:"Error"
                });
            }

            if (!categoryRemoved){
                return res.status(404).send({
                    message: "Clase no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message: "Eliminado correctamente",
                clase:categoryRemoved
            });
        })
        
    },

    ListaClases: function(req,res){
        Clase.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message: "Clases",
                doc
            });
        });
    },

    mostrarClase: function(req,res){
        var claseId = req.params.id;
        Clase.findById(claseId)
               .exec((err,clase)=>{
                if(err){
                    return res.status(500).send({
                        message: "error en la petición",
                        status:"Error"
                    });
                }
    
                if (!clase){
                    return res.status(404).send({
                        message: "clase no encontrada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Este es una clase",
                    clase
                });
               })
        
    } 

}

module.exports = controller;