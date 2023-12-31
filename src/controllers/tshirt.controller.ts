import * as express from "express";
import mongoose from "mongoose";
import { CTshirtSchema, clothesSchema } from '../config/database/schema/clothes.schema';
import { databaseConnection, disconnectDatabase } from "../config/database/db.config";
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
            let tshirt;
            let document: mongoose.Document<CTshirtModel | CTshirtSchema | object>;
            
            const tshirtModel = new CTshirtModel('tshirt', clothesSchema);

            tshirt = tshirtModel.createModel();

            document = new tshirt(req.body);


            databaseConnection()
            .then(conn => {
        
                if(conn){
                    console.log("Connection established to database: " + conn);

                    if(document && document instanceof mongoose.Model){
    
                        document.save()
                        .then((result) =>{
                            if(result){
                                console.log('Tshirt saved', result);

                                return res.status(201).json({"result":"ok", "response": result});

                            }
                        })
                        .catch(err => {
                            res.status(501).json({ result: "error", error: err.message})});
                    }

                }

           
            })
            .catch(err => {
                res.status(500).send().json({ result: "error", error: err });
                throw new Error('Error while connecting to database: ' + err)
            });
            

        } catch (err){
            res.status(500).send().json({ result: "error", error: err});
        }
    }
        
        
            /* .then(response => {
                
                    res.status(201).json({"result": "ok", "data": response});                                
            })
            .catch(err => {
                res.status(400).json({ result:"error",err: err})
                throw new Error('Error durating creating model: ' + err)});
            */

    async modifyTshirt(req: express.Request, res: express.Response){

    };

    async deleteTshirt(req: express.Request,res: express.Response){

    };

};