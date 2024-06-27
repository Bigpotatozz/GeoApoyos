"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivo = void 0;
const validarArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se subio ningun archivo.');
    }
    if (!req.files.fotoCasa) {
        return res.status(400).send('No files were uploaded.');
    }
    next();
};
exports.validarArchivo = validarArchivo;
//# sourceMappingURL=validarArchivo.js.map