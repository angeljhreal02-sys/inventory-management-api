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
        // 1. Log de inicio e inspección de datos recibidos
        console.log("📥 [CREATE] Recibiendo datos del cliente:", req.body);

        // Extraemos los datos enviados por el cliente
        const {
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        } = req.body;

        // 2. Creación de la instancia
        console.log(" [CREATE] Preparando nuevo producto para:", name);
        const product = new Product({
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        });

        // 3. Persistencia en base de datos
        console.log(" [CREATE] Guardando producto en MongoDB...");
        await product.save();

        // 4. Confirmación exitosa
        console.log(" [CREATE] Producto guardado con éxito. ID:", product._id);
        console.log(" [CREATE] Enviando respuesta 201 al cliente");

        // Respondemos con código 201 (Created)
        res.status(201).json({
            success: true,
            message: "Producto creado correctamente",
            data: product
        });

    } catch (error) {
        // 5. Captura y log de errores
        console.error(" [CREATE] Error al guardar producto:", error.message);

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

//CONTROLADOR getProduct by ID
/*
====================================================
Obtener un producto por su ID
Método: GET
Ruta: /api/products
====================================================
*/
const getProductById = async (req, res) => {
    try {
        // 1. Obtenemos el ID enviado por el cliente
        console.log(" [GET BY ID] ID recibido:", req.params.id);
        // 2. Buscamos el producto en MongoDB
        console.log(" [GET BY ID] Buscando producto en MongoDB...");

        const product = await Product.findById(req.params.id);  //función

        if (!product) {
            console.log("⚠️ [GET BY ID] Producto no encontrado");
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }
        // 4. Producto encontrado
        console.log(
            "✅ [GET BY ID] Producto encontrado:",
            product.name
        );
        // 5. Enviamos la respuesta
        console.log("📤 [GET BY ID] Enviando producto al cliente");

        res.json({
            success: true,
            data: product
        });

    } catch (error) {
         console.error(
            "❌ [GET BY ID] Error al obtener el producto:",
            error.message
        );

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
    try {
        // 1. Logs de entrada
        console.log(" [UPDATE] ID recibido:", req.params.id);
        console.log(" [UPDATE] Datos recibidos para actualizar:", req.body);

        // 2. Validar que el body no venga vacío antes de consultar la BD
        if (!Object.keys(req.body).length) {
            console.log("⚠️ [UPDATE] Solicitud rechazada: El cuerpo está vacío");
            return res.status(400).json({
                success: false,
                message: "No se enviaron datos para actualizar."
            });
        }

        // 3. Actualización en MongoDB
        console.log(" [UPDATE] Actualizando producto en MongoDB...");
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,         // Devuelve el documento ya actualizado
                runValidators: true // Aplica las validaciones del esquema de Mongoose
            }
        );

        // 4. Validar si existe el producto
        if (!product) {
            console.log("⚠️ [UPDATE] Producto no encontrado en MongoDB");
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        // 5. Confirmación exitosa
        console.log("✅ [UPDATE] Producto actualizado con éxito:", product.name);
        console.log(" [UPDATE] Enviando respuesta 200 al cliente");

        res.json({
            success: true,
            message: "Producto actualizado correctamente",
            data: product
        });

    } catch (error) {
        // 6. Captura de errores
        console.error("❌ [UPDATE] Error al actualizar el producto:", error.message);

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
        // 1. Obtenemos el ID enviado por el cliente
        console.log(" [DELETE] ID recibido:", req.params.id);

        // 2. Buscamos y eliminamos el producto
        console.log(" [DELETE] Buscando producto en MongoDB...");

        const product = await Product.findByIdAndDelete(req.params.id);

        // 3. Verificamos si el producto existía
        if (!product) {
            console.log(" ⚠️ [DELETE] Producto no encontrado");
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }
        // 4. Confirmamos eliminación
        console.log(
            " [DELETE] Producto eliminado:",
            product.name
        );
        // 5. Enviamos respuesta al cliente
        console.log(" [DELETE] Enviando respuesta al cliente");

        res.json({
            success: true,
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.error(
            " [DELETE] Error al eliminar el producto:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: error.message
        });

    }
};

//Exportar controladores:
module.exports = {

    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct

};