const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const autoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria"
    },
    mensaje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mensaje"
    },
    alquiler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alquiler"
    }
})

/**
 * Metodo sincrono para comparar contraseña enviada en peticion y la guardada en la db
 * @param {String} password - Contraseña a comparar
 * @returns {Promise}
 */
autoSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.contrasena);
}

/**
 * Metodo sincrono ejecutado antes de guardar una contrasena en la base de datos para hashear
 */
autoSchema.pre("save", async function (next) {
    const auto = this
    if (!auto.isModified("contrasena")) return next();
    try {
        // instancia de bcrypt para definir el salt que se usara para hashear la contraseña
        const salt = await bcrypt.genSaltSync(10);
        // hashear  contraseña
        const hash = await bcrypt.hash(auto.contrasena, salt);
        // definir la contraseña hasheada al campo contrasena del esquema
        auto.contrasena = hash;
        next();
    } catch (error) {
        console.log(`hay un error al hashear la contraseña ${error}`);
        next();
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Auto = mongoose.model("Auto", autoSchema);
module.exports = { Auto };evDependencies