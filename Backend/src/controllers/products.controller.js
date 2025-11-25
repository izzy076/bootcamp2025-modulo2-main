// 1. Importar dependencias y módulos necesarios
import { productModel } from "../models/products.model.js";


// Definir las acciones que van a realizar - CRUD

// 1. Método para CREAR un producto -> POST
export const postProduct = async (request, response) => {

    try{

    // valiación de que si existaa el archivo enviado por el cliente
        if(!request.file){
            return response.status(400).json({
                "mensaje": "Debes subir un archivo de imagen"
            });
        }

        // organizo primero el producto que se va a crear
        const newProduct = {
            ...request.body,
            image: `/uploads/${request.file.filename}` // modificando la imagen
        }

        await productModel.create(request.body);

        return response.status(201).json({
            "mensaje": "Producto creado correctamente"
        });

    }catch (error){
        return response.status(400).json({
            "mensaje": "Ocurrió un error al crear producto",
            "error": error.message || error
        })
    }
}

// 2. Método para MOSTRAR todos los productos -> GET
export const getAllProducts = async (request, response) => {
    try {
        const allProducts = await productModel.find();
        
        return response.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allProducts 
        });
        
    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al mostrar productos",
            "error": error.message || error
        })
    }
}

// 3. Método para ACTUALIZAR un producto -> PUT
export const putProductById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await productModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        
        return response.status(200).json({
            "mensaje": "Producto actualizado exitosamente"
        });

    } catch (error) {
         return response.status(500).json({
            "mensaje": "Ocurrió un error al actualizar producto",
            "error": error.message || error
        })
    }
}

// 4. Método para ELIMINAR un producto -> DELETE
export const deleteProductById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        await productModel.findByIdAndDelete(idForDelete);
        
        return response.status(200).json({
            "mensaje": "Producto eliminado exitosamente"
        });
        
    } catch (error) {
         return response.status(500).json({
            "mensaje": "Ocurrió un error al eliminar producto",
            "error": error.message || error
        })
    }
}