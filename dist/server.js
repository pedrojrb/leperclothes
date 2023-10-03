"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class ServerBoostrap {
    /**
     * This constructor is responsible for exectuing all dependencies in the server that are necessary before to the connect process.
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 8000;
        //initialize all dependencies
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        //http request to main route
        this.app.get('/api/', (req, res) => {
            try {
                if (res.statusCode === 200) {
                    res.status(200).json({
                        message: 'Prueba dos'
                    });
                }
            }
            catch (err) {
                throw err;
            }
        });
        this.listen();
    }
    /**
     * this is the main server that will be used to connect to the server.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is listening on port " + this.port);
        });
    }
}
new ServerBoostrap();
