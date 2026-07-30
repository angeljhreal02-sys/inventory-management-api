// Importamos Express para crear nuestro servidor API
const express = require("express");

// Permite aceptar peticiones desde otros dominios
const cors = require("cors");

// Importamos las rutas relacionadas con productos
const productRoutes = require("./routes/productRoutes");

// Creamos la aplicación Express
const app = express();

// Middleware que permite recibir información en formato JSON
app.use(express.json());

// Habilita la comunicación entre diferentes aplicaciones
app.use(cors());

/*
====================================================
RUTAS PRINCIPALES
====================================================
*/

// Todas las rutas de productos comenzarán con:
/*
    /api/products

Ejemplos:

POST    /api/products
GET     /api/products
PUT     /api/products/:id
DELETE  /api/products/:id
*/
app.use("/api/products", productRoutes);

// Exportamos la configuración de Express
module.exports = app;