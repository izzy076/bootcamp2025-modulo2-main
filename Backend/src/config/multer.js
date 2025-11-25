// 1. Importaciones necesarias
import multer from "multer";
import path from "path"; // modulo de node
import fs from "fs"; // modulo de node
import { fileURLToPath } from "url"; // modulo de node


// Desarrollo de las funcionalidades -> ES6
const _filename = fileURLToPath(import.meta.url); // _filename = backend/ src/config/multer.js - cual es la carpeta en el que estoy
const _dirname = path.dirname(_filename); // _dirname = backend/src/config - en que archivo estoy


// 1. Crear una carpeta donde se guarden los archivos subidos
const UPLOADS_FOLDER = path.join(_dirname, "../uploads");

// si no existe mi carpeta UPLOADS
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER)
}

// 2. Especificar cómo vamos a guardar los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // donde vamos a guardar el archivo
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // extension - > .jpg, .pdf
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // nombre base
        cb(null, `${base}-${Date.now()}${ext}`); // nombre del archivo
    }
});

// req: controlar las peticiones que se hagan
// file
// cb: peticion que le diga que haga
// null: si no hubo ningun problema


// 3. Especificar que tipo de archivos vamos a recibir -> filtros
const fileFilter = (req, file, cb)=>{
    const allowed = ["image/gif", "image/gif", "image/png", "image/png", "image/webp"];

    if (allowed.includes(file.minetype)){
        cb(null, true) // si el archivo es permitido. lo guarde en la carpeta uploads
    }else {
        cb(new Error("Archivo no permitido"), false); // -> no puede guardar el archivo 
    }
}

// incluide: valida si esta dentro de mis tipos de datos permitidos
// true: si permitimos que se guarde en la carpeta

// 4. Definir limites - tamaño de archivo
// Ej: 5MB
const limits = {
    fileSize: 5*1024*1024 // 5MB
}

// 5. Exportar esas características
// el unico obligatorio es storage
export const upload = multer({storage, fileFilter, limits});


// const variablefn = ()=>{}
// function variablefn2(){}