const mongoose = require("mongoose");

/**
 * Funcion para conectar a la base de datos mongoDB
 */
const dbConnection = () => {
    const dbUrl = process.env.DB_URI;
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if (!err) {
            console.log("DB connected successfully 👌");
        } else {
            console.log("DB connection failed 😢");
        }
    })
}
module.exports = {
    dbConnection
};
