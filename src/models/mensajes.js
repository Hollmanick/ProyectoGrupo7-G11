const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var MensajeSchema = Schema({
    name: String,
    description: String,
    idauto: String,
    idcliente: String
})

module.exports = mongoose.model("Mensaje", MensajeSchema);