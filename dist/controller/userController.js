"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desbloquearUsuario = exports.bloquearUsuario = exports.borrarUsuario = exports.editarUsuario = exports.registrarUsuario = exports.getRolUsuario = exports.getUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../modelo/usuario"));
//Trae todos los usuarios registrados
const getUsuario = async (req, res) => {
    try {
        //trae todos los usuarios de base de datos
        const usuario = await usuario_1.default.findAll();
        //devuelve como respuesta los usuarios
        res.send({
            usuario
        });
    }
    catch (e) {
        //devuelve el error como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getUsuario = getUsuario;
//traer el rol del usuario
const getRolUsuario = async (req, res) => {
    //Accede al correo del body  
    const { correo } = req.body;
    try {
        //trae el usuario que coincida con el correo
        const usuario = await usuario_1.default.findOne({ where: { correo } });
        //si no existe el usuario devuelve un error como respuesta
        if (!usuario) {
            return res.status(404).send({
                msg: "Hubo un error"
            });
        }
        //devuelve el usuario como respuesta
        return res.send({
            usuario
        });
    }
    catch (e) {
        //atrapa el error y devuelve el error como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getRolUsuario = getRolUsuario;
//registra un usuario nuevo
const registrarUsuario = async (req, res) => {
    //accede a todo el objeto de usuario del body
    const usuarioreq = req.body;
    try {
        //crea un salt para la encriptacion de contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        //encripta la contraseña
        const password = bcryptjs_1.default.hashSync(usuarioreq.contrasenia, salt);
        //le asigna la contraseña encriptada al objeto de usuario
        usuarioreq.contrasenia = password;
        //construye el nuevo usuario
        const usuario = usuario_1.default.build(usuarioreq);
        //guarda un usuario
        usuario.save();
        //manda el usuario registrado como respuesta
        res.send({
            usuario
        });
    }
    catch (e) {
        //atrapa el error y lo devuelve como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.registrarUsuario = registrarUsuario;
const editarUsuario = async (req, res) => {
    //accede a todos los parametros del body
    const { idUsuario, nombre, primerApellido, segundoApellido, puesto, sueldo, contrasenia, estatus, correo } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: 'Hubo un error' });
        }
        // Actualizar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.primerApellido = primerApellido || usuario.primerApellido;
        usuario.segundoApellido = segundoApellido || usuario.segundoApellido;
        usuario.puesto = puesto || usuario.puesto;
        usuario.sueldo = sueldo || usuario.sueldo;
        usuario.estatus = estatus || usuario.estatus;
        usuario.correo = correo || usuario.correo;
        // Si se proporciona una nueva contraseña, hash it
        if (contrasenia) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = bcryptjs_1.default.hashSync(contrasenia, salt);
            usuario.contrasenia = password;
        }
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ msg: "Hubo un error" });
    }
};
exports.editarUsuario = editarUsuario;
const borrarUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Busca el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        //si el usuario no existe devuelve un error
        if (!usuario) {
            return res.status(404).send({ msg: "Hubo un error" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BA";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ msg: "Hubo un error" });
    }
};
exports.borrarUsuario = borrarUsuario;
const bloquearUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Hubo error" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "BL";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ msg: "Hubo un error" });
    }
};
exports.bloquearUsuario = bloquearUsuario;
const desbloquearUsuario = async (req, res) => {
    const { idUsuario } = req.body;
    try {
        // Buscar el usuario por su idUsuario
        const usuario = await usuario_1.default.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).send({ msg: "Hubo un error" });
        }
        // Cambiar el estatus del usuario a "BA" (baja)
        usuario.estatus = "AC";
        // Guardar los cambios en la base de datos
        await usuario.save();
        res.send({ usuario });
    }
    catch (e) {
        return res.status(500).send({ msg: "Hubo un error" });
    }
};
exports.desbloquearUsuario = desbloquearUsuario;
//# sourceMappingURL=userController.js.map