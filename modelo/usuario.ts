import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";

interface UsuarioAttributes {
  idUsuario: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  puesto: string;
  fechaContratacion: Date;
  sueldo: number;
  correo: string;
  contrasenia: string;
  estatus: string;
}

export interface UsuarioInstance extends Model<UsuarioAttributes>, UsuarioAttributes {}

const Usuario = databaseConnection.define<UsuarioInstance>("usuario", {
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  primerApellido: {
    type: DataTypes.STRING
  },
  segundoApellido: {
    type: DataTypes.STRING
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaContratacion: {
    type: DataTypes.DATEONLY
  },
  sueldo: {
    type: DataTypes.FLOAT
  },
  correo: {
    type: DataTypes.STRING
  },
  contrasenia: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.STRING,
    defaultValue: 'AC'
  }
}, { timestamps: false, tableName: "usuario", schema: "geoapoyos" });

export default Usuario;