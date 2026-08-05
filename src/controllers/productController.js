// Importamos el modelo Product para poder realizar operaciones en MongoDB
const Product = require("../models/Product");

/*
====================================================
Crear un nuevo producto
Método: POST
Ruta: /api/products
====================================================
*/
//CONTROLADOR createProduct
const createProduct = async (req, res) => {

    try {

        // Extraemos los datos enviados por el cliente
        // req.body contiene la información enviada desde Postman o un frontend
        const {
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        } = req.body;


        // Creamos una nueva instancia del modelo Product
        const product = new Product({
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        });


        // Guardamos el producto en MongoDB
        await product.save();


        // Respondemos con código 201 (Created)
        res.status(201).json({
            success: true,
            message: "Producto creado correctamente",
            data: product
        });

    } catch (error) {

        // Si ocurre cualquier error, respondemos con código 500
        res.status(500).json({

            success: false,

            message: "Error al crear el producto",

            error: error.message

        });

    }

};

//CONTROLADOR getProduct
/*
====================================================
Obtener todos los productos
Método: GET
Ruta: /api/products
====================================================
*/
const getProducts = async (req, res) => {

    try {

        // Busca todos los documentos de la colección "products"
        const products = await Product.find();

        // Responde con código HTTP 200 y la lista de productos
        res.status(200).json({
            success: true,
            total: products.length, // Cantidad de productos encontrados
            data: products
        });

    } catch (error) {

        // Si ocurre un error durante la consulta
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });

    }

};

//CONTROLADOR getProductById
/*
====================================================
Obtener un producto por su ID
Método: GET
Ruta: /api/products
====================================================
*/
const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);  //función

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: error.message
        });

    }
};

/*
====================================================
Actualizar un producto existente
Método: PUT
Ruta: /api/products    <- Como nota: esas rutas siempre se pondran en la URL para buscarlas en remoto ya que son identificadores únicos
====================================================
*/ 
//CONTROLADOR UPDATE:
const updateProduct = async (req, res) => {
    console.log("ID:", req.params.id); // Log en terminal para verificar que llegue el ID a la petición:
        console.log("BODY:", req.body); // Log en terminal para Verificar que llegue el cuerpo

        const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true
    }
);

console.log(product);  // Log en termianl para verificar el documento devuelto por Mongoose

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,  //<--- devuelve el documento ya actualizado, no el anterior.
                runValidators: true   // <--- hace que Mongoose valide los datos actualizados según tu esquema.
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }
        // Verificación if, que permite ver si realmente llegan los datos para actualizar,
        // evitando asi enviar una actualización cuando el cliente envía un cuerpo vacío
        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                success: false,
                message: "No se enviaron datos para actualizar."
            });
        }

        res.json({
            success: true,
            message: "Producto actualizado correctamente",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: error.message
        });

    }
};

/*
====================================================
Elimina un producto existente
Método: DELETE
Ruta: /api/products    <- Como nota: esas rutas siempre se pondran en la URL para buscarlas en remoto ya que son identificadores únicos
====================================================
*/ 
//CONTROLADOR DELETE:
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Producto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: error.message
        });

    }
};

// Exportamos las funciones del controlador
// Más adelante agregaremos:
// updateProduct()
// deleteProduct()

//Exportar controladores:
module.exports = {

    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct

};