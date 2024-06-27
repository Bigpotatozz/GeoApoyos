
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
import * as path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import Visita from "../modelo/visita"
import Solicitante from '../modelo/solicitante';
import { subirArchivo } from "../helpers/subirFoto";
import Usuario from "../modelo/usuario";
import Domicilio from "../modelo/domicilio";



//trae las visitas pendientes del usuario 
export const getVisitasPendientes = async(req: Request, res: Response) => {

    //accede al id del usuario del body
    const {id} = req.body;
    try{
        
        //encuentra el usuario que concide con el id del body
        const usuario = await Usuario.findByPk(id);

        //si el usuario no existe devuelve un error como respuesta
        if(!usuario){
            return res.status(404).send({
                msg: "Hubo un error"
            })
        }

        //busca las visitas donde tengan como llave foranea el idUsuario y que su confirmacion este en false
        const visitas = await Visita.findAll({where: {usuario_idUsuario: usuario.idUsuario, confirmacionSolicitante: false}});
        

        //se declara un array donde se guardaran los objetos de solicitantes
        const solicitantes: any[] = [];
        //se declara un arrya donde se guardaran los domicilios
        const domicilios: any[] = [];

        //for que recorre cada elemento del arreglo de visitas y las va agregando a los arreglos
        for(let e of visitas){
            const solicitante = await Solicitante.findOne({where: {idSolicitante: e.solicitante_idSolicitante}});
            solicitantes.push(solicitante);

            const domicilio = await Domicilio.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});
            domicilios.push(domicilio);

        }
        
        //devuelve como reespuesta el usuario, su visitas, sus solicitantes y sus domicilios
        return res.send({
            usuario,
            visitas,
            solicitantes,
            domicilios

        })
        

    }catch(e){
        //atrapa el error y lo devuelve como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }

}



//Agrega el estatus a la visita
export const agregarEstatusVisita = async(req: Request, res: Response) => {

    
    //accede objeto donde viene la informacion pero en string
    const data = req.body.data;
    //parsea ese string a objeto
    const datosJson = JSON.parse(data);

    //accede a los datos del objeto parseado
    const {id,estatus, razon, latitud, longitud} = datosJson;
    //accede a la fotoCasa del body
    const fotoCasa:UploadedFile | UploadedFile[] | undefined = req.files?.fotoCasa;


    try{
        //si la fotoCasa esta vacio o son varios archivos devuelve como respuesta un error
    if (!fotoCasa || Array.isArray(fotoCasa)) {
        return res.status(404).send({ msg: 'Hubo un error' });
    }

    //Si alguno de los campos es vacio devuelve un error como respuesta
    if(estatus === false || latitud === false || longitud === false||razon === false || id === false){
        return res.status(401).send({
            msg: "Hubo un error"
        });
    }

    //busca el solicitante que conicide con el id indicado en la peticion
    const solicitante = await Solicitante.findByPk(id);
    //Si no encuentra el solicitante devuelve un error
    if(!solicitante){
        return res.status(404).send({
            msg: "Hubo un error"
        });
    }
    //busca la visita donde el idSolicitante sea igual al previamente encontrado 
    const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante.idSolicitante}});
    //Si no encuentra la visita devuelve un error como respuesta
    if(!visita){
        return res.status(404).send({
            msg: "Hubo un error"
        });
    }

    //guarda la fotoCasa
    const foto = await cloudinary.uploader.upload(fotoCasa.tempFilePath);
    const fotoURL = foto.secure_url;

    //modifica los campos necesarios
    const establecerEstatus = await visita.update({fotoDomicilio: fotoURL, estatus: estatus, razon: razon, latitudVisita: latitud, longitudVisita: longitud });

    return res.send({
        establecerEstatus
    });

    }catch(e){
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }


}

//confirma la visita 
export const confirmarVisita = async(req: Request, res: Response) => {

    //accede a los datos del body
    //accede al data
    const data = req.body.data;
    //parsea el data a json
    const datosJson = JSON.parse(data);
    //accede a los datos del json parseado
    const {id, fecha, hora , latitud, longitud} = datosJson;
    //accede a la fotoCasa
    const fotoCasa:UploadedFile | UploadedFile[] | undefined = req.files?.fotoCasa;
 


    //si el id esta vacio devuelve un error como respuesta
    if(!id){
        return res.status(404).send({
            msg: "id no especificado"
        });
    }

    //si la fotoCasa esta vacio o son varias devuelve un error como repsuesta
    if (!fotoCasa || Array.isArray(fotoCasa)) {
        return res.status(404).send({ msg: 'Se esperaba un solo archivo' });
    }

    try{

        //busca el solicitante que coincida con el id
        const solicitante = await Solicitante.findByPk(id);

        //si no ecuentra el solicitante devuelve un error
        if(!solicitante){
            return res.status(404).send({
                msg: "El solicitante no existe"
            });
        }

        //busca la visita que tenga como llave foranea el id
        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante.idSolicitante}});
        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }

        //guarda la foto
        const foto = await cloudinary.uploader.upload(fotoCasa.tempFilePath);
        const fotoURL = foto.secure_url;
        //guarda los cambios necesarios en la tabla visita
        await visita.update({confirmacionSolicitante: true, estatus: "EN", razon: "Encontrado", fecha: fecha, hora: hora, latitudVisita: latitud, longitudVisita: longitud, fotoDomicilio: fotoURL});
    
        //devuelve la visita como respuesta
        return res.send({
           visita
        })


    }catch(e){
        //atrapa el error u lo devuelve como respuesta
        return res.status(500).send({
            msg: e
        })
    }


};

//envia la foto del solicitante
export const getFotoSolicitante = async(req: Request, res: Response) => {

    //accede al id del body
    const {id} = req.body;

    try{
        //busca el solicitante que conicida con el id del body
        const solicitante = await Solicitante.findByPk(id);
        //si no encuentra el solicitante devuelve un error
        if(!solicitante){
            return res.status(404).send({
                msg: "solicitante no encontrado"
            });
        };

        /*
        const visita = await Visita.findOne({where: {solicitante_idSolicitante: solicitante?.idSolicitante}});

        if(!visita){
            return res.status(500).send({
                msg: "Hubo un error"
            });
        }
        
        */

        //si el solicitante tiene el campo fotoSolicitante..
        if(solicitante.fotoSolicitante){
            
            //accede al campo fotoSolicitante
            const foto = solicitante.fotoSolicitante;   
            //devuelve la foto como respuesta
            return res.status(200).send({
                "foto": foto
            });
        }

        //devuelve el error como respuesta
        return res.status(404).send({
            msg: "No image"
        })
        

    }catch(e){
        return res.status(500).send({
            msg: e
        });
    }

};
