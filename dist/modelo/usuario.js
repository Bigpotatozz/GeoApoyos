"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const Usuario = configdb_1.default.define("usuario", {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    primerApellido: {
        type: sequelize_1.DataTypes.STRING
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fechaContratacion: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    sueldo: {
        type: sequelize_1.DataTypes.FLOAT
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    contrasenia: {
        type: sequelize_1.DataTypes.STRING
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'AC'
    }
}, { timestamps: false, tableName: "usuario", schema: "geoapoyos" });
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map