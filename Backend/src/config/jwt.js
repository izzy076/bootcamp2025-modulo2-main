// 1. Importar dependencias y modulos necesarios
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

// 2. configurar la variable de entorno
dotenv.config();
const key = process.env.SECRET_KEY;


// 3. configurar el uso de jsonwebtoken

// 3.1 método para generar un JWT
// payload -> información del usuario
export const generateToken = (payload)=> {
    return new Promise((resolve, reject)=>{
        //  .sign -> genera el token
        jsonwebtoken.sign(payload, key, {expiresIn:"1h"}, (error, token)=>{
            if(error){
                reject(new Error("Hubo un error al generar el JWT", error.message));
            }else{
                resolve(token);
            }
        })
    });
}


// 3.2 método para verificar un JWT
// token -> info encriptada
export const verifyToken = (token)=> {
    return new Promise((resolve, reject)=>{
        jsonwebtoken.verify(token, key, (error, decoded)=>{
             if(error){
                reject(new Error("Hubo un error al generar el JWT", error.message));
            }else{
                resolve(decoded);
            }
        })
    });
}