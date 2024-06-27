import jwt from "jsonwebtoken";


const generateToken = (id: Number) => {

    return new Promise((resolve, reject) => {
        const payload = {id: id};

        jwt.sign(payload, process.env.TOKENFIRM || "22001t5m4r7s" , { expiresIn: '3d'} , (err, token) => {
            if(err){
                reject('No se genero el token');
            }
            resolve(token);
        });

    })

}

export {generateToken}