import dotenv from 'dotenv';
import { Server } from './modelo/server';
dotenv.config();

const servidor = new Server();

servidor.listen();