const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    auto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auto"
    }
})

/**
 * Metodo sincrono para comparar contraseña enviada en peticion y la guardada en la db
 * @param {String} password - Contraseña a comparar
 * @returns {Promise}
 */
categoriaSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.contrasena);
}

/**
 * Metodo sincrono ejecutado antes de guardar una contrasena en la base de datos para hashear
 */
categoriaSchema.pre("save", async function (next) {
    const categoria = this
    if (!categoria.isModified("contrasena")) return next();
    try {
        // instancia de bcrypt para definir el salt que se usara para hashear la contraseña
        const salt = await bcrypt.genSaltSync(10);
        // hashear  contraseña
        const hash = await bcrypt.hash(categoria.contrasena, salt);
        // definir la contraseña hasheada al campo contrasena del esquema
        categoria.contrasena = hash;
        next();
    } catch (error) {
        console.log(`hay un error al hashear la contraseña ${error}`);
        next();
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Categoria = mongoose.model("Categoria", categoriaSchema);
module.exports = { Categoria };