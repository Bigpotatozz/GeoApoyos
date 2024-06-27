"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const configdb_1 = __importDefault(require("../database/configdb"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const loginRouter_1 = __importDefault(require("../routes/loginRouter"));
const solicitanteRouter_1 = __importDefault(require("../routes/solicitanteRouter"));
const visitaRouter_1 = __importDefault(require("../routes/visitaRouter"));
const becaRouter_1 = __importDefault(require("../routes/becaRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.connection();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    async connection() {
        try {
            await configdb_1.default.authenticate();
            console.log("Todo bien");
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    routes() {
        this.app.use("/usuario", userRoutes_1.default);
        this.app.use("/login", loginRouter_1.default);
        this.app.use("/solicitante", solicitanteRouter_1.default);
        this.app.use("/visita", visitaRouter_1.default);
        this.app.use("/beca", becaRouter_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor escuchando en el http://localhost:${this.port}/`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map