import { Router } from "express";
import { login, cambiarContrasenia, solicitarDesbloqueo } from "../controller/loginController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";


const loginRouter = Router();


/*METODO POST, RECIBE COMO PARAMETRO UN "correo" Y "contrasenia" VALIDOS, 
SOLO ADMITIDE A USUARIOS CON EL ESTATUS "AC" (ACTIVO), "BL" Y "BA" SE RECHAZARAN*/
loginRouter.post("/",[
    body('correo').notEmpty(),
    body('contrasenia').notEmpty(),
    validarCampos
], login);

loginRouter.post("/correoRestablecer",[
    body('correo').notEmpty(),
    validarCampos
], cambiarContrasenia);

loginRouter.post("/correoDesbloquear",[
    body('correo').notEmpty(),
    validarCampos
], solicitarDesbloqueo);

export default loginRouter;

