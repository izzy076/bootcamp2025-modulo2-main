import { userModel } from "../models/users.model.js"; // Verificar usuario
import { generateToken } from "../config/jwt.js"; // generar el token de seguridad
import bcryptjs from "bcryptjs"; // verificar la contraseña
import { request } from "express";

export const login = async (request, response) =>{
    try {
        // VALIDACIÓN 1: Sí el correo existe en la base de datos
        const {emailLogin, passwordLogin} = request.body;

        // 1. es buscar en la base de datos
        const userFound = await userModel.findOne({
            email: emailLogin
        });

        console.log("usuario encontrado: ", userFound);

        if(!userFound){
            return response.status(404).json({
                "mensaje": "Usuario no encontrado, por favor registrarte"
            });
        }


        // VALIDACIÓN 2: contraseña correcta
        const validPassword = await bcryptjs.compare(passwordLogin, userFound.password);

        if(!validPassword){
            return response.status(401).json({
                "mensaje": "Constraseña incorrecta"
            });
        }

        // GENERACIÓN DEL TOKEN -> Verificar permisos
        const payload ={
            id: userFound._id,
            user: userFound.username
        }

        if(userFound.role === "admin"){
            payload.admin = true;
        }else{
            payload.admin = false;
        }

        const token = await generateToken(payload);
        console.log("payload: ", payload);
        console.log("token", token);

        return response.status(200).json({
            "mensaje": "Inicio de sesión exitoso",
            "token": token
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al iniciar sesión",
            "error": error.message || error
        })
        
    }
}