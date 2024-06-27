"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const becaController_1 = require("../controller/becaController");
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const validarRol_1 = __importDefault(require("../middlewares/validarRol"));
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const becaRouter = (0, express_1.Router)();
becaRouter.put("/aprobar", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD"]),
    ValidarErrores_1.default
], becaController_1.aprobarBeca);
becaRouter.put("/rechazar", [
    validarToken_1.default,
    (0, validarRol_1.default)(["AD"])
], becaController_1.rechazarBeca);
exports.default = becaRouter;
//# sourceMappingURL=becaRouter.js.map