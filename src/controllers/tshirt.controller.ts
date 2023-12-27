import * as express from "express";
import mongoose from "mongoose";
import { CTshirtSchema, clothesSchema } from "../config/database/schema/clothes.schema";
import { databaseConnection } from "../config/database/db.config";
import { CTshirtModel } from "../config/database/models/tshirt.model";

export class CtshirtController{

    async getAllTshirts(req: express.Request, res: express.Response){
        try{

            //TODO: Create new connection to database and get tshirts data.

            const tshirtModel = new CTshirtModel('tshirt', clothesSchema);

            tshirtModel.createModel()
            .then(response => {
                console.log('response', response);
                res.json(response);
                
            })
           
            
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

    async getTshirtByTshirtname(req: express.Request, res: express.Response){
        //TODO: Write req.params and use that value for filter when get data of database.
        //TODO: Create new connection to database and get tshirts data.
    };

    async createTshirt(req: express.Request, res: express.Response){
        //TODO: Write body of request, and save in database.
    };

    async modifyTshirt(req: express.Request, res: express.Response){

    };

    async deleteTshirt(req: express.Request,res: express.Response){

    };

};