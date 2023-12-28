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

        try{

            const tshirtModel = new CTshirtModel('tshirt', clothesSchema);

            tshirtModel.createModel(req)
            .then(response => {
                res.status(201).json({"result": "ok", "data": response});
                
            })
            .catch(err => {
                res.status(400).json({ result:"error",err: err})
                throw new Error('Error durating creating model: ' + err)});
           
    
           
        } catch ( err ){
            if(res.statusCode){

                throw new Error(`HTTP Error, error code: ${res.statusCode} - ${res.statusMessage}`)
            }

            throw new Error ('Error creating new tshirt: ' + err);
        }
    };

    async modifyTshirt(req: express.Request, res: express.Response){

    };

    async deleteTshirt(req: express.Request,res: express.Response){

    };

};