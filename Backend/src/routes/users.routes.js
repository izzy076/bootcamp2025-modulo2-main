import express from "express";
import { postUser, getAllUsers, putUserById, deleteUserById } from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js"


// 2. Configurar las rutas
export const userRouter = express.Router();

// Ruta para el POST
userRouter.post("/", postUser);

// Ruta para el GET
userRouter.get("/", auth("admin"), getAllUsers);

// Ruta para el PUT
userRouter.put("/:id", putUserById);

// Ruta para el DELETE
userRouter.delete("/:id", deleteUserById);