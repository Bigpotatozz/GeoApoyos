"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.status(401).send({ msg: "Hubo un error" });
    }
    next();
};
exports.default = validarCampos;
//# sourceMappingURL=ValidarErrores.js.map