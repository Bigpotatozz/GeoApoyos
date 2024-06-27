"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCorreoSolicitante = exports.validarCorreoUsuario = void 0;
const usuario_1 = __importDefault(require("../modelo/usuario"));
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
//Valida que no se repita el correo del usuario a la hora de registrar
const validarCorreoUsuario = async (req, res, next) => {
    const { correo } = req.body;
    try {
        const usuario = await usuario_1.default.findOne({ where: { correo: correo } });
        console.log(usuario);
        if (usuario) {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        next();
    }
    catch (e) {
        res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.validarCorreoUsuario = validarCorreoUsuario;
//Valida que no se repita el correo a la hora de registrar un solicitante
const validarCorreoSolicitante = async (req, res, next) => {
    const { correo } = req.body.solicitante;
    try {
        const solicitante = await solicitante_1.default.findOne({ where: { correo: correo } });
        console.log(solicitante);
        if (solicitante) {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        next();
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.validarCorreoSolicitante = validarCorreoSolicitante;
//# sourceMappingURL=validarEmail.js.map