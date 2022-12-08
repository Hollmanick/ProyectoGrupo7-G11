const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var ClaseSchema = Schema({
    name: String,
    description: String,
    idauto: String,
    })

module.exports = mongoose.model("Clase", ClaseSchema);