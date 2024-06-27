
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../modelo/usuario';
import { generateToken } from "../helpers/generarToken";
const mailgun = require("mailgun.js");


//controlador para el inicio de sesion
export const login = async (req: Request, res: Response) => {

  //trae del body el correo y la contraseña
  const { correo, contrasenia } = req.body;
  try {

    //busca un usuario donde el correo sea igual al de la req
    const usuario: any = await Usuario.findOne({ where: { correo } });

    //si el usuario no existe devuelve el error
    if (!usuario || usuario.estatus === "BA") {
      return res.status(404).send({
        msg: "Hubo un error"
      })
    }
    //si el usuario esta bloqueado devuelve el error
    if (usuario.estatus === "BL") {
      return res.status(401).send({
        msg: "Hubo un error"
      })
    }

    //verifica la contraseña introducida con la contraseña encriptada en base de datos
    //si coincide devuelve true, si no devuelve false
    const passwordVerification = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

    //si la contraseña es false 
    if (!passwordVerification) {
      //devuelve el codigo de error
      return res.status(401).send({
        msg: "Hubo un error"
      })
    }

    //genera el token
    const token = await generateToken(usuario.idUsuario);

    //devuelve como respuesta el token generado
    return res.send({
      token
    })


  } catch (e) {
    return res.status(500).send({
      msg: "Hubo un error"
    })
  }

}


//controlador para cambiar la contraseña
export const cambiarContrasenia = async (req: Request, res: Response) => {
  
  //trae del body el correo
  const { correo } = req.body;

  //busca un usuario que coincida con el correo indicado
  const correoValidado: any = await Usuario.findOne({where: {correo :correo}})

  //Si el correo no existe, devuelve el codigo de error
  if(!correoValidado){return res.status(500).send({correo: "Hubo un error"})}

  const nombreU: any = await Usuario.findOne({ where: { correo: correo } });
  const nombreUsuario = nombreU.nombre;
  const idU: any = await Usuario.findOne({ where: { correo: correo } });
  const idUsuario = idU.idUsuario;
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY});

  mg.messages.create('sandbox785fbfb9a4f74a1d8e07cc8fdc8febce.mailgun.org', {
    from: "Soporte <geoapoyosequipoazul@gmail.com>",
    to: ["ageoapoyos@gmail.com"],
    subject: `Solicitud para restablecer contraseña - Usuario: ${nombreUsuario}`,
    text: `Mensaje Autogenerado`,
    html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado un cambio de contraseña, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
  })
    .then((msg: any) => {
      return res.send({
        msg: "Correo enviado"
      });
    }) 
    .catch((err: any) => {
      return res.status(500).send({
        msg: "Hubo un error"
      })
    }); 

}


export const solicitarDesbloqueo = async (req: Request, res: Response) => {

  const { correo } = req.body;

  const correoValidado: any = await Usuario.findOne({where: {correo :correo}})
  if(!correoValidado){return res.status(200).send({correo: "Mainez preziendete"})}

  const nombreU: any = await Usuario.findOne({ where: { correo: correo } });
  const nombreUsuario = nombreU.nombre;
  const idU: any = await Usuario.findOne({ where: { correo: correo } });
  const idUsuario = idU.idUsuario;
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY});

  mg.messages.create('sandbox785fbfb9a4f74a1d8e07cc8fdc8febce.mailgun.org', {
    from: "Soporte <geoapoyosequipoazul@gmail.com>",
    to: ["ageoapoyos@gmail.com"],
    subject: `Solicitud para desbloquear cuenta - Usuario: ${nombreUsuario}`,
    text: `Mensaje Autogenerado`,
    html: `<h2>Buen dia.<br> Este es un correo autogenerado para notificar que el usuario ${nombreUsuario} con ID "${idUsuario}" y con correo "${correo}" ha solicitado el desbloqueo de su cuenta, el cambio queda a su discreción. Al finalizar favor de contactarse con el empleado para ser notificado.<br>PD: Favor de no responder a este correo.</h2>`
  })
    .then((msg: any) => {
      return res.send({
        msg: "Correo enviado"
      });
    }) 
    .catch((err: any) => {
      return res.status(500).send({
        msg: "Hubo un error"
      })
    }); 

}
