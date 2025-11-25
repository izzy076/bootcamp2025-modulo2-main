// 1. Importaciones de dependencias y módulos
import express from "express";
import { postProduct, getAllProducts, putProductById, deleteProductById } from "../controllers/products.controller.js";
import { upload } from "../config/multer.js";
import { auth } from "../middleware/auth.js"

// 2. Configurar las rutas
export const productRouter = express.Router();

// Ruta para el POST
productRouter.post("/crear", auth("admin"), upload.single("image"), postProduct);

// Ruta para el GET
productRouter.get("/mostrar", getAllProducts);

// Ruta para el PUT
productRouter.put("/actualizar/:id", auth("admin"), putProductById);

// Ruta para el DELETE
productRouter.delete("/eliminar/:id", auth("admin"), deleteProductById);