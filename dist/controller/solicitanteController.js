"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolicitante = exports.editarSolicitante = exports.guardarSolicitante = exports.getUsuariosPorVisitar = void 0;
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const solicitante_1 = __importDefault(require("../modelo/solicitante"));
const domicilio_1 = __importDefault(require("../modelo/domicilio"));
const formulario_1 = __importDefault(require("../modelo/formulario"));
const configdb_1 = __importDefault(require("../database/configdb"));
//Trae los usuarios por visitar
const getUsuariosPorVisitar = async (req, res) => {
    try {
        //trae todos los solicitantes
        const solicitante = await solicitante_1.default.findAll();
        //envia como respuesta los solicitantes
        return res.send({
            solicitante
        });
        //atrapa el error
    }
    catch (e) {
        //envia como respuesta el error
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getUsuariosPorVisitar = getUsuariosPorVisitar;
//Guarda un nuevo solicitante
const guardarSolicitante = async (req, res) => {
    try {
        //Se accede a los valores del request
        const datos = req.body.data;
        const fotoSolicitante = req.files?.fotoSolicitante;
        //parsea el form-data data a json
        const datosJson = JSON.parse(datos);
        //extrae las propiedades del json ya parseado 
        const { solicitante, domicilio, formulario } = datosJson;
        //verifica si la foto solicitante esta vacia o si son varias fotos
        if (!fotoSolicitante || Array.isArray(fotoSolicitante)) {
            return res.status(404).send({ msg: 'Hubo un error' });
        }
        //Se inicia una transaccion
        const resultados = await configdb_1.default.transaction(async (t) => {
            //Se guarda la foto en cloudinary
            const foto = await cloudinary.uploader.upload(fotoSolicitante.tempFilePath);
            //al campo fotoSolicitante se le asigna como valor la secure_url de la foto
            solicitante.fotoSolicitante = foto.secure_url;
            //Se guarda en base de datos el solicitante
            const createSolicitante = await solicitante_1.default.create(solicitante, { transaction: t });
            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = await domicilio_1.default.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });
            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = await formulario_1.default.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });
            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario,
                foto
            };
        });
        res.send({
            resultados
        });
    }
    catch (e) {
        res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.guardarSolicitante = guardarSolicitante;
const editarSolicitante = async (req, res) => {
    // Accede a los elementos de la petición
    const { id, reqSolicitante, reqDomicilio } = req.body;
    try {
        // Se inicia transacción
        const resultado = await configdb_1.default.transaction(async (t) => {
            // Se busca al solicitante por el id
            const solicitante = await solicitante_1.default.findByPk(id, { transaction: t });
            // Si el solicitante no existe devuelve un error
            if (!solicitante) {
                throw new Error("El solicitante no existe");
            }
            // Busca el domicilio por la llave foranea del solicitante
            const domicilio = await domicilio_1.default.findByPk(solicitante.idSolicitante, { transaction: t });
            // Si el domicilio no existe retorna un error
            if (!domicilio) {
                throw new Error("Error en el domicilio");
            }
            // Actualiza el solicitante
            await solicitante.update(reqSolicitante, { transaction: t });
            // Actualiza el domicilio
            await domicilio.update(reqDomicilio, { transaction: t });
            return { solicitante, domicilio };
        });
        return res.send({
            resultado
        });
    }
    catch (e) {
        // Si ocurre un error dentro de la transacción o fuera de ella, devolvemos una respuesta de error
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.editarSolicitante = editarSolicitante;
//Trae un solicitante en especifico
const getSolicitante = async (req, res) => {
    //Accede al id del body
    const { id } = req.body;
    try {
        //busca el solicitante que coincida con el id
        const solicitante = await solicitante_1.default.findByPk(id);
        //si el solicitante no existe devuelve un error
        if (!solicitante) {
            return res.status(404).send({
                msg: "Hubo un error"
            });
        }
        //busca el domicilio que su llave foranea coincida con el id del solicitante
        const domicilio = await domicilio_1.default.findOne({ where: { solicitante_idSolicitante: solicitante.idSolicitante } });
        if (!domicilio) {
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        //
        return res.send({
            solicitante,
            domicilio
        });
    }
    catch (e) {
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
};
exports.getSolicitante = getSolicitante;
//# sourceMappingURL=solicitanteController.js.map