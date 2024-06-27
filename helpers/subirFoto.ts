import {v4 as uuidv4} from 'uuid';
import * as path from "path";
import { UploadedFile } from 'express-fileupload';
import { fileURLToPath } from 'url';

export const subirArchivo = async(files: UploadedFile, extensionesPermitidas = ['img', 'png', 'jpg'], carpeta = '') => {
 
 
 
    return new Promise(async(resolve, reject) => {
        const archivo = files
        console.log(__dirname);
        console.log(archivo);
        const archivoPartes = archivo.name.split('.');
        const extension = archivoPartes[archivoPartes.length - 1];
        console.log(extension);
    
        if(!extensionesPermitidas.includes(extension)){
           return reject("Archivo no permitido");
        }
    
        const finalFileName: string =  uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../../uploads' ,carpeta,finalFileName);
        const uploadPath2 = path.join(__dirname,'../uploads', carpeta, finalFileName );
        
    
      
        // Use the mv() method to place the file somewhere on your server
        
        archivo.mv(uploadPath, function(err: Error) {
          if (err) {return reject}
        });
        archivo.mv(uploadPath2, function(err: Error){
            if(err){return reject}
          
        });

      
        resolve(finalFileName);
       
    })
  
   
}
