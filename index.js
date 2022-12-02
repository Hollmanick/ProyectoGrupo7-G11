const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const user_routes = require("./routes/usuario");

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", user_routes);

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto", port);
});
