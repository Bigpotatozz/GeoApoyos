import express, {Application} from 'express';
import cors from 'cors';
import fileUpload from "express-fileupload";
import databaseConnection  from '../database/configdb';
import userRouter from '../routes/userRoutes';
import loginRouter from '../routes/loginRouter';
import solicitanteRouter from '../routes/solicitanteRouter';
import visitaRouter from '../routes/visitaRouter';
import becaRouter from '../routes/becaRouter';

export class Server{
    private app: Application;
    private port: String;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.connection();
        this.routes();

    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))

    }

    async connection(){
        try{
            await databaseConnection.authenticate();
            console.log("Todo bien");
        }catch(e){
            throw new Error(`${e}`);
        }
    }

    routes(){
        this.app.use("/usuario", userRouter);
        this.app.use("/login",loginRouter);
        this.app.use("/solicitante", solicitanteRouter);
        this.app.use("/visita", visitaRouter);
        this.app.use("/beca", becaRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando en el http://localhost:${this.port}/`)
        });
    }
}