"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechazarBeca = exports.aprobarBeca = void 0;
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const aprobarBeca = async (req, res) => {
    //accede al id del body
    const { id } = req.body;
    try {
        //encuentra al solicitante por el id
        const solicitante = await solicitante_1.default.findByPk(id);
        //verifica que el solicitante exista
        if (!solicitante) {
            return res.status(404).send({
                msg: "Hubo un error"
            });
        }
        //actualiza el montoA aprobado con el monto solicitado ya que la beca fue aprobada
        await solicitante.update({ montoAprobado: solicitante.montoSolicitado, estatus: "Aprobado" });
        //devuelve la respuesta de que todo salio bien
        return res.send({
            msg: "Todo bien"
        });
        //atrapa el error
    }
    catch (e) {
        //devuelve como respuesta el error
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.aprobarBeca = aprobarBeca;
const rechazarBeca = async (req, res) => {
    //accede al id
    const { id } = req.body;
    try {
        //busca el solicitante por el id
        const solicitante = await solicitante_1.default.findByPk(id);
        //verifica que el solicitante existe
        if (!solicitante) {
            //devuelve un error si no existe
            return res.status(404).send({
                msg: "Hubo un error"
            });
        }
        //actualiza el montoAprobado a 0 y el estatus a rechazado
        await solicitante.update({ montoAprobado: 0, estatus: "Rechazado" });
        //devuelve la respuesta
        return res.send({
            msg: "Todo bien"
        });
        //atrapa el error
    }
    catch (e) {
        //retorna la respuesta del error
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.rechazarBeca = rechazarBeca;
//# sourceMappingURL=becaController.js.map