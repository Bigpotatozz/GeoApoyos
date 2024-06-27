import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";
import Solicitante from "./solicitante";

interface DomicilioAttributes {
  idDomicilio: number;
  calle: string;
  numeroExterior: string;
  numeroInterior: string | null;
  colonia: string;
  ciudad: string;
  estado: string;
  latitud: string;
  longitud: string;
  solicitante_idSolicitante: number;
}

export interface DomicilioInstance extends Model<DomicilioAttributes>, DomicilioAttributes {}

const Domicilio = databaseConnection.define<DomicilioInstance>("domicilio", {
  idDomicilio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  calle: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  numeroExterior: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  numeroInterior: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  colonia: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  latitud: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  longitud: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  solicitante_idSolicitante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Solicitante,
      key: "idSolicitante"
    }
  }
}, { timestamps: false, tableName: "domicilio", schema: "geoapoyos" });

export default Domicilio;