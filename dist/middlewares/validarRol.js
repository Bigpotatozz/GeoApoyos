"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../modelo/usuario"));
const validarRol = (roles) => {
    return async (req, res, next) => {
        const { id } = req.uid;
        const usuario = await usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        const puesto = usuario.puesto;
        if (!roles.includes(puesto)) {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        next();
    };
};
exports.default = validarRol;
//# sourceMappingURL=validarRol.js.map