import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";
import Solicitante from "./solicitante";

interface FormularioAttributes {
  idFormulario: number;
  pregunta1: string;
  pregunta2: string;
  pregunta3: string;
  pregunta4: string;
  pregunta5: string;
  pregunta6: string;
  pregunta7: string;
  pregunta8: string;
  pregunta9: string;
  pregunta10: string;
  pregunta11: string;
  pregunta12: string;
  pregunta13: string;
  pregunta14: string;
  pregunta15: string;
  pregunta16: string;
  pregunta17: string;
  solicitante_idSolicitante: number;
}

export interface FormularioInstance extends Model<FormularioAttributes>, FormularioAttributes {}

const Formulario = databaseConnection.define<FormularioInstance>("formulario", {
  idFormulario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pregunta1: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  pregunta2: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta3: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta4: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta5: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta6: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta7: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta8: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta9: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta10: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta11: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta12: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta13: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta14: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta15: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta16: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  pregunta17: {
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
}, { timestamps: false, tableName: "formulario", schema: "geoapoyos" });

export default Formulario;