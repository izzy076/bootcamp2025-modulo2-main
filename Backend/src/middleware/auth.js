import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRole)=> {
    return async(request, response, next)=>{
       
        // 1. Verificar si, sí se envía un token en la cabecera de la petición
        const token = request.headers["authorization"];
        console.log("Token recibido en la cabecera de la petición: " + token);

        if(!token){
            return response.status(401).json({
                "mensaje": "No se encontró token, permiso denegado"
            })
        }

        // 2. Verificar que el token sea permitido (JWT)
        const allowedToken = token.split(" ")[1];
        console.log("Token después de separarlo del Bearer: " + allowedToken)

        try {
            const decoded = await verifyToken(allowedToken);
            console.log("Información decodificada del token: ", decoded);
            
            // 3. Verificar específicamente si el rol es de administrador
            if(requiredRole === "admin" && decoded.admin === false){
                return response.status(401).json({
                    "mensaje": "Acceso no permitido, no eres administrador"
                });
            }
            
        } catch (error) {
            return response.status(401).json({
                "mensaje": "Falló la autenticación: Token no permitido",
            });
            
        }
       
       
        next();
    }
}