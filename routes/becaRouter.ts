import { Router } from "express";
import { aprobarBeca, rechazarBeca } from "../controller/becaController";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";
import validarCampos from "../middlewares/ValidarErrores";


const becaRouter = Router();

becaRouter.put("/aprobar", [
    validarJWT,
    validarRol(["AD"]),
    validarCampos
],aprobarBeca);
becaRouter.put("/rechazar",[
    validarJWT,
    validarRol(["AD"])
], rechazarBeca);

export default becaRouter;