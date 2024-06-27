import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario, { UsuarioInstance } from "../modelo/usuario";
import { UploadedFile } from "express-fileupload";
import { subirArchivo } from "../helpers/subirFoto";

//Trae todos los usuarios registrados
export const getUsuario = async(req: Request, res: Response) => {

    try{
        //trae todos los usuarios de base de datos
        const usuario = await Usuario.findAll();
        //devuelve como respuesta los usuarios
        res.send({
            usuario
        })

    
    }catch(e){
        //devuelve el error como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }

}

//traer el rol del usuario
export const getRolUsuario = async(req: Request, res: Response) => {
    
    //Accede al correo del body  
    const {correo} = req.body;

    try{

        //trae el usuario que coincida con el correo
        const usuario = await Usuario.findOne({where: {correo}});

        //si no existe el usuario devuelve un error como respuesta
        if(!usuario){
            return res.status(404).send({
                msg: "Hubo un error"
            })
        }

        //devuelve el usuario como respuesta
        return res.send({
            usuario
        });
    }catch(e){
        //atrapa el error y devuelve el error como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        });
    }
}

//registra un usuario nuevo
export const registrarUsuario = async(req: Request, res: Response) => {

    //accede a todo el objeto de usuario del body
    const usuarioreq = req.body;

    try{

      //crea un salt para la encriptacion de contraseña
        const salt = bcryptjs.genSaltSync(10);
        //encripta la contraseña
        const password =bcryptjs.hashSync(usuarioreq.contrasenia, salt);
        //le asigna la contraseña encriptada al objeto de usuario
        usuarioreq.contrasenia = password;

        //construye el nuevo usuario
        const usuario = Usuario.build(usuarioreq);
        //guarda un usuario
        usuario.save();
        //manda el usuario registrado como respuesta
        res.send({
            usuario
        })

    }catch(e){
      //atrapa el error y lo devuelve como respuesta
        return res.status(500).send({
            msg: "Hubo un error"
        })
    }
}

export const editarUsuario = async (req: Request, res: Response) => {
  //accede a todos los parametros del body
    const { idUsuario, nombre, primerApellido, segundoApellido, puesto,sueldo, contrasenia, estatus, correo } = req.body;

    try {
        // Buscar el usuario por su idUsuario
        const usuario = await Usuario.findByPk(idUsuario);

        if (!usuario) {
            return res.status(404).send({ msg: 'Hubo un error' });
        }

        // Actualizar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.primerApellido = primerApellido || usuario.primerApellido;
        usuario.segundoApellido = segundoApellido || usuario.segundoApellido;
        usuario.puesto = puesto || usuario.puesto;
        usuario.sueldo = sueldo || usuario.sueldo;
        usuario.estatus = estatus || usuario.estatus;
        usuario.correo = correo || usuario.correo;

        // Si se proporciona una nueva contraseña, hash it
        if (contrasenia) {
            const salt = bcryptjs.genSaltSync(10);
            const password = bcryptjs.hashSync(contrasenia, salt);
            usuario.contrasenia = password;
        }

        // Guardar los cambios en la base de datos
        await usuario.save();

        res.send({ usuario });
    } catch (e) {
        return res.status(500).send({ msg: "Hubo un error" });
    }
};

export const borrarUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.body;
  
    try {
      // Busca el usuario por su idUsuario
      const usuario = await Usuario.findByPk<UsuarioInstance>(idUsuario);
  
      //si el usuario no existe devuelve un error
      if (!usuario) {
        return res.status(404).send({ msg: "Hubo un error" });
      }
  
      // Cambiar el estatus del usuario a "BA" (baja)
      usuario.estatus = "BA";
  
      // Guardar los cambios en la base de datos
      await usuario.save();
  
      res.send({ usuario });
    } catch (e) {
      return res.status(500).send({ msg: "Hubo un error" });
    }
  };

  export const bloquearUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.body;
  
    try {
      // Buscar el usuario por su idUsuario
      const usuario = await Usuario.findByPk<UsuarioInstance>(idUsuario);
  
      if (!usuario) {
        return res.status(404).send({ msg: "Hubo error" });
      }
  
      // Cambiar el estatus del usuario a "BA" (baja)
      usuario.estatus = "BL";
  
      // Guardar los cambios en la base de datos
      await usuario.save();
  
      res.send({ usuario });
    } catch (e) {
      return res.status(500).send({ msg: "Hubo un error" });
    }
  };

  export const desbloquearUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.body;
  
    try {
      // Buscar el usuario por su idUsuario
      const usuario = await Usuario.findByPk<UsuarioInstance>(idUsuario);
  
      if (!usuario) {
        return res.status(404).send({ msg: "Hubo un error" });
      }
  
      // Cambiar el estatus del usuario a "BA" (baja)
      usuario.estatus = "AC";
  
      // Guardar los cambios en la base de datos
      await usuario.save();
  
      res.send({ usuario });
    } catch (e) {
      return res.status(500).send({ msg: "Hubo un error" });
    }
  };
