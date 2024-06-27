"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const solicitante_1 = __importDefault(require("./solicitante"));
const Domicilio = configdb_1.default.define("domicilio", {
    idDomicilio: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    calle: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    numeroExterior: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    numeroInterior: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    latitud: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    longitud: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    solicitante_idSolicitante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: solicitante_1.default,
            key: "idSolicitante"
        }
    }
}, { timestamps: false, tableName: "domicilio", schema: "geoapoyos" });
exports.default = Domicilio;
//# sourceMappingURL=domicilio.js.map