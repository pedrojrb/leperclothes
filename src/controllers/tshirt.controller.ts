import * as express from "express";

export class TshirtController{

    getAllTshirts(req: express.Request, res: express.Response){
        try{
            if(res.statusCode === 200){

                res.status(200).send(JSON.stringify({
                "tshirts":"shirts"       
                }))
            }
           
        } catch ( err ){
            if(res.statusCode){

                throw new Error(`HTTP Error, error code: ${res.statusCode} - ${res.statusMessage}`)
            }

            throw err;
        }
    };

    async getTshirtByTshirtname(req: express.Request, res: express.Response){

    };

    async createTshirt(req: express.Request, res: express.Response){

    };

    async modifyTshirt(req: express.Request, res: express.Response){

    };

    async deleteTshirt(req: express.Request,res: express.Response){

    };

};