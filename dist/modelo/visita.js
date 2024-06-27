"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const solicitante_1 = __importDefault(require("./solicitante"));
const usuario_1 = __importDefault(require("./usuario"));
const Visita = configdb_1.default.define("visita", {
    idVisita: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    confirmacionSolicitante: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: "NV"
    },
    razon: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: "Sin capturar"
    },
    latitudVisita: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: "Sin capturar"
    },
    longitudVisita: {
        type: sequelize_1.DataTypes.STRING(45),
        defaultValue: "Sin capturar"
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    hora: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fotoDomicilio: {
        type: sequelize_1.DataTypes.STRING(100),
        defaultValue: "Sin capturar"
    },
    fotoIdentidicacion: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "Sin capturar"
    },
    fechaVisita: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date()
    },
    solicitante_idSolicitante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: solicitante_1.default,
            key: "idSolicitante"
        }
    },
    usuario_idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usuario_1.default,
            key: "idUsuario"
        }
    }
}, { timestamps: false, tableName: "visita", schema: "geoapoyos" });
exports.default = Visita;
//# sourceMappingURL=visita.js.map