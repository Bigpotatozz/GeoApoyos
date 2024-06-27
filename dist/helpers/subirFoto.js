"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const subirArchivo = async (files, extensionesPermitidas = ['img', 'png', 'jpg'], carpeta = '') => {
    return new Promise(async (resolve, reject) => {
        const archivo = files;
        console.log(__dirname);
        console.log(archivo);
        const archivoPartes = archivo.name.split('.');
        const extension = archivoPartes[archivoPartes.length - 1];
        console.log(extension);
        if (!extensionesPermitidas.includes(extension)) {
            return reject("Archivo no permitido");
        }
        const finalFileName = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path.join(__dirname, '../../uploads', carpeta, finalFileName);
        const uploadPath2 = path.join(__dirname, '../uploads', carpeta, finalFileName);
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject;
            }
        });
        archivo.mv(uploadPath2, function (err) {
            if (err) {
                return reject;
            }
        });
        resolve(finalFileName);
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=subirFoto.js.map