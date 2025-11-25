// 1. Importamos las dependencias necesarias
import mongoose from "mongoose";


// 2. Crearse la función de conexión
export const conexionMongo = async () =>{
    try{
        await mongoose.connect(process.env.BD_URL, {dbName:"e-commerce"});
        console.log("Conexión exitosa con la base de datos");
    }catch (error){
        console.error("Error de conexión: ", error);
    }
}