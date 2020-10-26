require("./config/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuracion global de rutas
// app.use(require('./routes/index'));
app.use(
  "/api/v1/usuarios",
  require("../apirest/controllers/usuario.controller")
);

// ===========================
// CONEXION BASE DE DATOS
// ===========================

mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Base de datos online");
  }
);

// ===========================
// PUERTO
// ===========================

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto 3000");
});
