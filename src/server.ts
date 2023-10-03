import express from "express";
import morgan from "morgan";
import cors from "cors";


class ServerBoostrap {
    public  app: express.Application = express();
    private port: number = 8000;
/**
 * This constructor is responsible for exectuing all dependencies in the server that are necessary before to the connect process.
 */
    constructor(){
        //initialize all dependencies
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        
        //http request to main route
        this.app.get('/api/', (req, res) => { 
            
            try{
                if(res.statusCode === 200){
                    res.status(200).json({
                        message:'Prueba dos'
                    });
                }

            }catch(err){
                throw err;
            }
        })

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


}

new ServerBoostrap();
