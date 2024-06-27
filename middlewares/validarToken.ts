import  jwt from "jsonwebtoken";
import { Response, Request } from "express";
import Usuario from "../modelo/usuario";

const validarJWT = async(req: Request, res: Response, next:any) => {

        const token = req.header('token');

    if(!token){
        return res.status(401).send({
            msg: "Hubo un error"
        })
    }

    try{
        
        const {id}: any = jwt.verify(token, process.env.TOKENFIRM || "22001t5m4r7s");
        (req as any).uid = {id};

        const usuarioValidado: any = await Usuario.findByPk(id);

        //VALIDA QUE EL USUARIO EXISTA EN LA BASE DE DATOS
        if(!usuarioValidado){
            return res.status(401).send({
                msg: "Hubo un error"
            });
        }

        //VALIDA QUE EL USUARIO ESTE ACTIVO
        if(usuarioValidado.estado === "BA"){
            return res.status(401).send({
                msg: "Hubo un error"
            })
        }

        (req as any).usuario = usuarioValidado;
        next();
    }catch(e){
        return res.status(401).send({
            msg: "Hubo un error"
            
        });
    }


 
 

}

export default validarJWT