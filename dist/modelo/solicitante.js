"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const Solicitante = configdb_1.default.define("solicitante", {
    idSolicitante: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    primerApellido: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    },
    genero: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    edad: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    fechaAlta: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    montoAprobado: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    montoSolicitado: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "AC"
    },
    universidad: {
        type: sequelize_1.DataTypes.STRING
    },
    fotoSolicitante: {
        type: sequelize_1.DataTypes.STRING
    }
}, { timestamps: false, tableName: "solicitante", schema: "geoapoyos" });
exports.default = Solicitante;
//# sourceMappingURL=solicitante.js.map