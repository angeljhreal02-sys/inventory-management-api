// Importamos Express para crear un Router
const express = require("express");

// Creamos una instancia del Router
// El Router nos permite agrupar las rutas relacionadas con productos
const router = express.Router();

// Importamos el controlador de productos
// Aquí se encuentra toda la lógica del CRUD
const productController = require("../controllers/productController");


/*
====================================================
RUTAS DEL CRUD
====================================================
*/


// Crear un nuevo producto
// Método: POST
// URL: /api/products
router.post("/", productController.createProduct);


// Obtener todos los productos
// Método: GET
// URL: /api/products
router.get("/", productController.getProducts);


// Exportamos el Router para poder utilizarlo en app.js
module.exports = router;