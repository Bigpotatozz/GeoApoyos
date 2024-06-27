"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configdb_1 = __importDefault(require("../database/configdb"));
const solicitante_1 = __importDefault(require("./solicitante"));
const Formulario = configdb_1.default.define("formulario", {
    idFormulario: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pregunta1: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    pregunta2: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta3: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta4: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta5: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta6: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta7: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta8: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta9: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta10: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta11: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta12: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta13: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta14: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta15: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta16: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false
    },
    pregunta17: {
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
}, { timestamps: false, tableName: "formulario", schema: "geoapoyos" });
exports.default = Formulario;
//# sourceMappingURL=formulario.js.map