import { Router } from "express";
import { editarSolicitante, getSolicitante, getUsuariosPorVisitar, guardarSolicitante } from "../controller/solicitanteController";
import validarJWT from "../middlewares/validarToken";
import validarRol from "../middlewares/validarRol";
import validarCampos from "../middlewares/ValidarErrores";
import { validarCorreoSolicitante } from "../middlewares/validarEmail";
import { body } from "express-validator";

const solicitanteRouter = Router();

solicitanteRouter.get("/solicitantes",[
    validarJWT,
    validarRol(["AD","CA"]),
    validarCampos
], getUsuariosPorVisitar)
solicitanteRouter.post("/solicitante", [
    validarJWT,
    validarRol(["AD","CA"]),
    body("id").notEmpty(),
    validarCampos
],getSolicitante);
solicitanteRouter.post("/registrar", [
    validarJWT,
    validarRol(["AD", "CA"]),
    validarCampos
],guardarSolicitante);
solicitanteRouter.put("/editar",[
    validarJWT,
    validarRol(["AD","CA"]),
    validarCampos
], editarSolicitante);


export default solicitanteRouter;