"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const validarJWT = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send({
            msg: "Hubo un error"
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.TOKENFIRM || "22001t5m4r7s");
        req.uid = { id };
        const usuarioValidado = await usuario_1.default.findByPk(id);
        //VALIDA QUE EL USUARIO EXISTA EN LA BASE DE DATOS
        if (!usuarioValidado) {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        //VALIDA QUE EL USUARIO ESTE ACTIVO
        if (usuarioValidado.estado === "BA") {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        req.usuario = usuarioValidado;
        next();
    }
    catch (e) {
        return res.status(401).send({
            msg: "Hubo un error"
        });
    }
};
exports.default = validarJWT;
//# sourceMappingURL=validarToken.js.map