var validator = require("validator");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeando: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save: function(req,res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);
        console.log(validate_name);
        console.log(validate_surname);
        console.log(validate_email);
        console.log(validate_password);
        return res.status(200).send({
            message:"Usuario Guardado"
        });
    },

    login: function(req,res){
        return res.status(200).send({
            message:"Login"
        });
    },

    update: function(req,res){
        return res.status(200).send({
            message:"Actualizado Correctamente"
        });
    },

    delete: function(req,res){
        return res.status(200).send({
            message:"Eliminado Correctamente"
        });
    },

    listarUsuarios: function(req,res){
        return res.status(200).send({
            message:"Lista de Usuarios"
        });
    },

    mostrarUsuario: function(req,res){
        return res.status(200).send({
            message:"Este es un Usuario"
        });
    },

}

module.exports = controller;