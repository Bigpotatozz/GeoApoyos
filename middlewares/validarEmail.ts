import { Request, Response } from "express";
import Usuario, { UsuarioInstance } from "../modelo/usuario";
import { where } from "sequelize";
import Solicitante from "../modelo/solicitante";

//Valida que no se repita el correo del usuario a la hora de registrar
export const validarCorreoUsuario = async(req: Request, res: Response, next: any) => {
    const {correo} = req.body;

    try{

        const usuario = await Usuario.findOne({where: {correo: correo}});
        console.log(usuario);

        if(usuario){
            return res.status(401).send({
                msg: "Hubo un error"
            })
        }

        next();

    }catch(e){
        res.status(500).send({
            msg: "Hubo un error"
        })
    }

};

//Valida que no se repita el correo a la hora de registrar un solicitante
export const validarCorreoSolicitante = async(req: Request, res: Response, next: any) => {

    const {correo} = req.body.solicitante;

    try{
        const solicitante = await Solicitante.findOne({where: {correo: correo}});
        console.log(solicitante);

        if(solicitante){
            return res.status(401).send({
                msg: "Hubo un error"
            })
        }

        next();

    }catch(e){
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
}



