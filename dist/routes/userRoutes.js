"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const express_validator_1 = require("express-validator");
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const validarRol_1 = __importDefault(require("../middlewares/validarRol"));
const validarEmail_1 = require("../middlewares/validarEmail");
const userRouter = (0, express_1.Router)();
//METODO GET QUE RECIBE UN CORREO ELECTRONICO Y DEVUELVE EL ROL
userRouter.post("/traerRolUsuario", [], userController_1.getRolUsuario);
/*METODO GET, RECIBE UN TOKEN VALIDO (PATH POST /login/) Y SOLO SE
ADMITE EL TOKEN VALIDO DE UN ADMINISTRADOR (AD)*/
userRouter.get("/", [
    validarToken_1.default,
    (0, validarRol_1.default)(['AD']),
    ValidarErrores_1.default
], userController_1.getUsuario);
/*METODO POST, RECIBE "nombre", "primerApellido", "segundoApellido",
"puesto" (ASIGNAN COMO "AD" COMO ADMINISTRADOR, "VI" COMO VISITANTE Y "CA" COMO CAPTURADOR),
"fechaContratacion", "sueldo", "correo", "contrasenia"*/
userRouter.post("/registrarUsuario", [
    validarEmail_1.validarCorreoUsuario,
    (0, express_validator_1.body)('nombre').notEmpty(),
    (0, express_validator_1.body)('primerApellido').notEmpty(),
    (0, express_validator_1.body)('segundoApellido').notEmpty(),
    (0, express_validator_1.body)('puesto').notEmpty(),
    (0, express_validator_1.body)('fechaContratacion').notEmpty(),
    (0, express_validator_1.body)('sueldo').notEmpty(),
    (0, express_validator_1.body)('correo').notEmpty().isEmail(),
    (0, express_validator_1.body)('contrasenia').notEmpty(),
    ValidarErrores_1.default
], userController_1.registrarUsuario);
/*POST (PARAMETRO OBLIGATORIO: idUsuario) PUEDE RECIBIR TODOS
LOS PARAMETROS DE "registrarUsuario" O SOLAMENTE LOS DATOS A EDITAR*/
userRouter.put("/editarUsuario", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD"]),
    (0, express_validator_1.body)('idUsuario').notEmpty(),
    validarEmail_1.validarCorreoUsuario,
    ValidarErrores_1.default
], userController_1.editarUsuario);
//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/borrarUsuario", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD"]),
    (0, express_validator_1.body)('idUsuario').notEmpty(),
    ValidarErrores_1.default
], userController_1.borrarUsuario);
//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/bloquearUsuario", [
    (0, express_validator_1.body)('idUsuario').notEmpty(),
    ValidarErrores_1.default
], userController_1.bloquearUsuario);
//METODO POST, RECIBE UNICAMENTE ID DE USUARIO
userRouter.put("/desbloquearUsuario", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD"]),
    (0, express_validator_1.body)('idUsuario').notEmpty(),
    ValidarErrores_1.default
], userController_1.desbloquearUsuario);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map