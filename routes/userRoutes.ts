import { Router } from "express";
import { desbloquearUsuario, bloquearUsuario, borrarUsuario, editarUsuario, getRolUsuario, getUsuario, registrarUsuario } from "../controller/userController";
import { body } from "express-validator";
import validarCampos from "../middlewares/ValidarErrores";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";
import {validarCorreoUsuario} from "../middlewares/validarEmail";

const userRouter = Router();

//METODO GET QUE RECIBE UN CORREO ELECTRONICO Y DEVUELVE EL ROL
userRouter.post("/traerRolUsuario",[
] ,getRolUsuario);


/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE 
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
userRouter.get("/", [
    validarJWT,
    validarRol(['AD']),
    validarCampos
], getUsuario);


/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido", 
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
userRouter.post("/registrarUsuario", [
    validarCorreoUsuario,
    body('nombre').notEmpty(),
    body('primerApellido').notEmpty(),
    body('segundoApellido').notEmpty(),
    body('puesto').notEmpty(),
    body('fechaContratacion').notEmpty(),
    body('sueldo').notEmpty(),
    body('correo').notEmpty().isEmail(),
    body('contrasenia').notEmpty(),
    validarCampos
], registrarUsuario);


/*POST (PARAMETRO OBLIGATORIO: idUsuario) PUEDE RECIBIR TODOS 
LOS PARAMETROS DE "registrarUsuario" O SOLAMENTE LOS DATOS A EDITAR*/
userRouter.put("/editarUsuario",[
    validarJWT,
    validarRol(["AD"]),
    body('idUsuario').notEmpty(),
    validarCorreoUsuario,
    validarCampos
], editarUsuario);


//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/borrarUsuario",[
    validarJWT,
    validarRol(["AD"]),
    body('idUsuario').notEmpty(),
    validarCampos
],borrarUsuario);


//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/bloquearUsuario",[
    body('idUsuario').notEmpty(),
    validarCampos
],bloquearUsuario);

//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/desbloquearUsuario", [
    validarJWT,
    validarRol(["AD"]),
    body('idUsuario').notEmpty(),
    validarCampos
],desbloquearUsuario);


export default userRouter;

