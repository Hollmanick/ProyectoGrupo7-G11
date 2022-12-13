const mongoose = require("mongoose");
const { Schema } = mongoose;
const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    auto_id: {}
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = { Categoria };