import * as express from "express";
import mongoose from "mongoose";
import { CTshirtSchema, clothesSchema } from "../config/database/schema/clothes.schema";
import { databaseConnection } from "../config/database/db.config";
import { CTshirtModel } from "../config/database/models/tshirt.model";

export class CtshirtController{

    async getAllTshirts(req: express.Request, res: express.Response){
        
    };

    async getTshirtByTshirtname(req: express.Request, res: express.Response){
        //TODO: Write req.params and use that value for filter when get data of database.
        //TODO: Create new connection to database and get tshirts data.
    };

    createTshirt(req: express.Request, res: express.Response){
        //TODO: Write body of request, and save in database.

        try{

            //TODO: Create new connection to database and get tshirts data.

            const tshirtModel = new CTshirtModel('tshirt', clothesSchema);

            tshirtModel.createModel()
            .then(response => {
                res.status(200).json(response)
                
            })
            .catch(err => {throw new Error('Error durating creating model: ' + err)});
           
            
            /* if(res.statusCode === 200){

                res.status(200).send(JSON.stringify({
                "tshirts":"shirts"       
                }))
            } */
           
        } catch ( err ){
            //TODO: Create handle error for each type error.
            if(res.statusCode){

                throw new Error(`HTTP Error, error code: ${res.statusCode} - ${res.statusMessage}`)
            }

            throw err;
        }
    };

    async modifyTshirt(req: express.Request, res: express.Response){

    };

    async deleteTshirt(req: express.Request,res: express.Response){

    };

};