"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitasController_1 = require("../controller/visitasController");
const validarToken_1 = __importDefault(require("../middlewares/validarToken"));
const ValidarErrores_1 = __importDefault(require("../middlewares/ValidarErrores"));
const visitaRouter = (0, express_1.Router)();
visitaRouter.post("/visitasPendientes", [
    validarToken_1.default,
    ValidarErrores_1.default
], visitasController_1.getVisitasPendientes);
visitaRouter.put("/actualizarEstatus", [
    validarToken_1.default,
    ValidarErrores_1.default
], visitasController_1.agregarEstatusVisita);
visitaRouter.put("/confirmarVisita", [
    validarToken_1.default,
    ValidarErrores_1.default
], visitasController_1.confirmarVisita);
visitaRouter.post("/fotoSolicitante", [
    validarToken_1.default,
    ValidarErrores_1.default
], visitasController_1.getFotoSolicitante);
exports.default = visitaRouter;
//# sourceMappingURL=visitaRouter.js.map