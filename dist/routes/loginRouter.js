"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controller/loginController");
const express_validator_1 = require("express-validator");
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const loginRouter = (0, express_1.Router)();
/*METODO POST, RECIBE COMO PARAMETRO UN "correo" Y "contrasenia" VALIDOS,
SOLO ADMITIDE A USUARIOS CON EL ESTATUS "AC" (ACTIVO), "BL" Y "BA" SE RECHAZARAN*/
loginRouter.post("/", [
    (0, express_validator_1.body)('correo').notEmpty(),
    (0, express_validator_1.body)('contrasenia').notEmpty(),
    ValidarErrores_1.default
], loginController_1.login);
loginRouter.post("/correoRestablecer", [
    (0, express_validator_1.body)('correo').notEmpty(),
    ValidarErrores_1.default
], loginController_1.cambiarContrasenia);
loginRouter.post("/correoDesbloquear", [
    (0, express_validator_1.body)('correo').notEmpty(),
    ValidarErrores_1.default
], loginController_1.solicitarDesbloqueo);
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map