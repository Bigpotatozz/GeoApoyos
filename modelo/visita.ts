import { DataTypes, Model } from "sequelize";
import databaseConnection from "../database/configdb";
import Solicitante from "./solicitante";
import Usuario from "./usuario";

interface VisitaAttributes {
    idVisita: string;
    confirmacionSolicitante: boolean;
    estatus: string;
    razon: string;
    latitudVisita: string;
    longitudVisita: string;
    fecha: Date;
    hora: Date;
    fotoDomicilio: string;
    fotoIdentidicacion: string;
    fechaVisita: Date;
    solicitante_idSolicitante: number;
    usuario_idUsuario: number;
}

export interface VisitaInstance extends Model<VisitaAttributes>, VisitaAttributes {}

const Visita = databaseConnection.define<VisitaInstance>("visita", {
  idVisita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    confirmacionSolicitante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  estatus: {
    type: DataTypes.STRING(45),
    defaultValue: "NV"
  },
  razon: {
    type: DataTypes.STRING(45),
    defaultValue: "Sin capturar"
  },
  latitudVisita: {
    type: DataTypes.STRING(45),
    defaultValue: "Sin capturar"
  },
  longitudVisita: {
    type: DataTypes.STRING(45),
    defaultValue: "Sin capturar"
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hora: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fotoDomicilio: {
    type: DataTypes.STRING(100),
    defaultValue: "Sin capturar"
  },
  fotoIdentidicacion: {
    type: DataTypes.STRING,
    defaultValue: "Sin capturar"
  },
  fechaVisita: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  solicitante_idSolicitante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Solicitante,
      key: "idSolicitante"
    }
  },
  usuario_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Usuario,
        key: "idUsuario"
    }
  }
}, { timestamps: false, tableName: "visita", schema: "geoapoyos" });

export default Visita;