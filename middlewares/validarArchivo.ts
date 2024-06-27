import { Request, Response } from "express";

const validarArchivo = (req: Request, res: Response, next: any) => {

    
    if (!req.files || Object.keys(req.files).length === 0  ) {
        return res.status(400).send('No se subio ningun archivo.');
      }

      if(!req.files.fotoCasa){
        return res.status(400).send('No files were uploaded.'); 
    }

      next();

}

export {validarArchivo}