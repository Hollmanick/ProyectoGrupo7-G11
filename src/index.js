// const express = require("express");
// // cors es un middleware que nos permite acceder a nuestra API desde otro dominio, cors esta basado en la politica de origenes cruzados del navegador 
// const cors = require("cors");
// const app = express();
// // dotenv permite usar variables de entorno .env para mantener a salvo datos sensibles
// require("dotenv").config();
// const port = process.env.PORT || 3000;
// const { dbConnection } = require("./database/conexion.js");

// // middlewares
// app.use(cors());
// app.use(express.json());

// // rutas
// app.use("/api", require("./routes/alquiler.js"));
// app.use("/api", require("./routes/auto.js"));
// app.use("/api", require("./routes/categoria.js"));
// app.use("/api", require("./routes/cliente.js"));
// app.use("/api", require("./routes/mensaje.js"));
// app.use("/api", require("./routes/score.js"));

// app.listen(port, () => {
//     console.log(`Servidor corriendo en: http://localhost:${port} 🚀`);
// })
// dbConnection();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/proyectogrupo7-g11",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family:4
})
.then(() => {
    app.use(express.json());
    app.use("/api", require("./routes/alquiler.js"));
    app.use("/api", require("./routes/auto.js"));
    app.use("/api", require("./routes/categoria.js"));
    app.use("/api", require("./routes/cliente.js"));
    app.use("/api", require("./routes/mensaje.js"));
    app.use("/api", require("./routes/score.js"));

    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})
.catch(error=>console.log(error));