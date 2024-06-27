"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitarDesbloqueo = exports.cambiarContrasenia = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
const generarToken_1 = require("../helpers/generarToken");
const mailgun = require("mailgun.js");
//controlador para el inicio de sesion
const login = async (req, res) => {
    //trae del body el correo y la contraseña
    const { correo, contrasenia } = req.body;
    try {
        //busca un usuario donde el correo sea igual al de la req
        const usuario = await usuario_1.default.findOne({ where: { correo } });
        //si el usuario no existe devuelve el error
        if (!usuario || usuario.estatus === "BA") {
            return res.status(404).send({
                msg: "Hubo un error"
            });
        }
        //si el usuario esta bloqueado devuelve el error
        if (usuario.estatus === "BL") {
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        //verifica la contraseña introducida con la contraseña encriptada en base de datos
        //si coincide devuelve true, si no devuelve false
        const passwordVerification = bcryptjs_1.default.compareSync(contrasenia, usuario.contrasenia);
        //si la contraseña es false 
        if (!passwordVerification) {
            //devuelve el codigo de error
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }
        //genera el token
        const token = await (0, generarToken_1.generateToken)(usuario.idUsuario);
        //devuelve como respuesta el token generado
        return res.send({
            token
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.login = login;
//controlador para cambiar la contraseña
const cambiarContrasenia = async (req, res) => {
    //trae del body el correo
    const { correo } = req.body;
    //busca un usuario que coincida con el correo indicado
    const correoValidado = await usuario_1.default.findOne({ where: { correo: correo } });
    //Si el correo no existe, devuelve el codigo de error
    if (!correoValidado) {
        return res.status(500).send({ correo: "Hubo un error" });
    }
    const nombreU = await usuario_1.default.findOne({ where: { correo: correo } });
    const nombreUsuario = nombreU.nombre;
    const idU = await usuario_1.default.findOne({ where: { correo: correo } });
    const idUsuario = idU.idUsuario;
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
    mg.messages.create('sandbox785fbfb9a4f74a1d8e07cc8fdc8febce.mailgun.org', {
        from: "Soporte <geoapoyosequipoazul@gmail.com>",
        to: ["ageoapoyos@gmail.com"],
        subject: `Solicitud para restablecer contraseña - Usuario: ${nombreUsuario}`,
        text: `Mensaje Autogenerado`,
        html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado un cambio de contraseña, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
    })
        .then((msg) => {
        return res.send({
            msg: "Correo enviado"
        });
    })
        .catch((err) => {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    });
};
exports.cambiarContrasenia = cambiarContrasenia;
const solicitarDesbloqueo = async (req, res) => {
    const { correo } = req.body;
    const correoValidado = await usuario_1.default.findOne({ where: { correo: correo } });
    if (!correoValidado) {
        return res.status(200).send({ correo: "Mainez preziendete" });
    }
    const nombreU = await usuario_1.default.findOne({ where: { correo: correo } });
    const nombreUsuario = nombreU.nombre;
    const idU = await usuario_1.default.findOne({ where: { correo: correo } });
    const idUsuario = idU.idUsuario;
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
    mg.messages.create('sandbox785fbfb9a4f74a1d8e07cc8fdc8febce.mailgun.org', {
        from: "Soporte <geoapoyosequipoazul@gmail.com>",
        to: ["ageoapoyos@gmail.com"],
        subject: `Solicitud para desbloquear cuenta - Usuario: ${nombreUsuario}`,
        text: `Mensaje Autogenerado`,
        html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado el desbloqueo de su cuenta, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
    })
        .then((msg) => {
        return res.send({
            msg: "Correo enviado"
        });
    })
        .catch((err) => {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    });
};
exports.solicitarDesbloqueo = solicitarDesbloqueo;
//# sourceMappingURL=loginController.js.map