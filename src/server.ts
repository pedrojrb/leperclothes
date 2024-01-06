import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ServerConfiguration } from "./config/config";
import { UserRouter } from "./routes/users.router";
import { CtshirtRouter } from "./routes/tshirt.router";
import { createToken } from "./config/database/middleware/token";

/**
 * Class main for execute application.
 */
class ServerBoostrap extends ServerConfiguration {
    public  app: express.Application = express();
    private port: number = this.getNumberPort('PORT');
/**
 * This constructor is responsible for exectuing all dependencies in the server that are necessary before to the connect process.
 */
    constructor(){
        //initialize all dependencies and methods on ServerConfiguration
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        
        this.app.use('/api/',this.router())
        this.listen();

    }
/**
 * this is the main server that will be used to connect to the server.
 */
    public listen(){
        this.app.listen(this.port,()=>{
            console.log("Server is listening on port " + this.port);
        })
    }

    /**
     * This method return all of the routes in the application.
     * @returns array of routes (type express.router)
     */
    public router(): Array<express.Router>{
        return [new UserRouter().router, new CtshirtRouter().router];
    }
}

new ServerBoostrap();