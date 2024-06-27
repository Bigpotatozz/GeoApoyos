"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id: id };
        jsonwebtoken_1.default.sign(payload, process.env.TOKENFIRM || "22001t5m4r7s", { expiresIn: '3d' }, (err, token) => {
            if (err) {
                reject('No se genero el token');
            }
            resolve(token);
        });
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generarToken.js.map