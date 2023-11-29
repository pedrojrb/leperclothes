"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const users_router_1 = require("./routes/users.router");
const tshirt_router_1 = require("./routes/tshirt.router");
const db_config_1 = require("./config/database/db.config");
/**
 * Class main for execute application.
 */
class ServerBoostrap extends config_1.ServerConfiguration {
    /**
     * This constructor is responsible for exectuing all dependencies in the server that are necessary before to the connect process.
     */
    constructor() {
        //initialize all dependencies and methods on ServerConfiguration
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberPort('PORT');
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use('/api/', this.router());
        this.listen();
    }
    /**
     * this is the main server that will be used to connect to the server.
     */
    listen() {
        this.app.listen(this.port, () => {
            (0, db_config_1.databaseConnection)()
                .then(() => { console.log('Database connection established'); })
                .catch(() => { console.log('Error connecting to database'); });
            console.log("Server is listening on port " + this.port);
        });
    }
    /**
     * This method return all of the routes in the application.
     * @returns array of routes (type express.router)
     */
    router() {
        return [new users_router_1.UserRouter().router, new tshirt_router_1.CtshirtRouter().router];
    }
}
new ServerBoostrap();
