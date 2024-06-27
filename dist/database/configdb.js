"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseConnection = new sequelize_1.Sequelize('itsmarts', 'doadmin', process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'postgres',
    port: 25060,
    protocol: 'null',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
exports.default = databaseConnection;
//# sourceMappingURL=configdb.js.map