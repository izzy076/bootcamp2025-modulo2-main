import { userModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// 1. Método para CREAR un usuario -> POST
export const postUser = async (request, response) => {
    try {
        // deestructuración cuando se hace - procesar la información del usuario antes de guardarla
        const {name, username, email, age, password, role} = request.body;
        const codedPasssword = await bcryptjs.hash(password, 10)

        await userModel.create({
           name,
           username,
           email,
           age,
           password:codedPasssword,
           role 
        });

        return response.status(201).json({
            "mensaje": "Usuario creado correctamente"
        });
        
    } catch (error) {
         return response.status(400).json({
            "mensaje": "Ocurrió un error al crear un ususario",
            "error": error.message || error
        })
    }
}

// 2. Método para MOSTRAR todos los User -> GET
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await userModel.find();

        return response.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allUsers
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al mostrar usuarios",
            "error": error.message || error
        })
    }
}

// 3. Método para ACTUALIZAR un usuario -> PUT
export const putUserById = async (request, response) => {
     try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await userModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return response.status(200).json({
            "mensaje": "Usuaerio actualizado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al actualizar usuario",
            "error": error.message || error
        })
    }
}

// 4. Método para ELIMINAR un usuario -> DELETE
export const deleteUserById = async (request, response) => {
       try {
        const idForDelete = request.params.id;
        await userModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Usuaario eliminado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al eliminar Usuaario",
            "error": error.message || error
        })
    } 
}