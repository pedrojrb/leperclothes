import * as express from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { CTshirtSchema, clothesSchema } from '../config/database/schema/clothes.schema';
import { databaseConnection, disconnectDatabase } from "../config/database/db.config";
import { CTshirtModel } from "../config/database/models/tshirt.model";
import { allPropertiesAreValid, propertiesInvalids } from '../config/database/middleware/clothes.validations';

export class CtshirtController{

    async getAllTshirts(req: express.Request, res: express.Response){
        let model = new CTshirtModel('tshirt', clothesSchema)
        let document = model.createModel();

            try{
                
                //connect to database

                databaseConnection()
                .then(connection => {
                    //when the connection is established find all tshirts in database
                        document.find().exec()
                        .then(data => {
                            res.status(200).json({result: "ok", response: data});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(401).json({result: "ok", error: error});
                            return;
                        });
                })
                .catch(error => { 
                res.status(401).json({ result:"error", error: error})
                return; 
                })
            
            } catch (err) {
                res.status(401).json({ result:"error", error: err })
                return;
            }
    }
    
    async getTshirtById(req: express.Request, res: express.Response){
        
        let model = new CTshirtModel('tshirt', clothesSchema)
        let document = model.createModel();
        const id = req.params.id;

        try{     
                //connect to database

                databaseConnection()
                .then(connection => {
                    //when the connection is established find all tshirts in database
                        document.findById({_id: new mongoose.Types.ObjectId(id)}).exec()
                        .then(data => {
                            res.status(200).json({result: "ok", response: data});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(401).json({result: "error", error: error.message});
                            return;
                        });
                
                
                })
                .catch(error => { 
                res.status(401).json({ result:"error", error: error.message})
                return; 
                })
            
        } catch (error) {
            res.status(401).json({ result:"error", error: error });
            return;
        }
    };
    async getTshirtByName(req: express.Request, res: express.Response){
        
        let model = new CTshirtModel('tshirt', clothesSchema)
        let document = model.createModel();
        let filter: RegExp;
        const name = req.query.name;

        if(typeof name === 'string'){ filter = new RegExp(name, 'gi');}

        try{     
                //connect to database

                databaseConnection()
                .then(connection => {
                    //when the connection is established find  tshirts match with filter in  database
                        document.find({name: filter}).exec()
                        .then(data => {
                            if(data.length === 0){
                                res.status(200).json({result: "ok", response: data, comment: `There are no results that match the search: ${name}`});
                                return;
                            }
                            res.status(200).json({result: "ok", response: data});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(401).json({result: "error", error: error.message});
                            return;
                        });
                
                
                })
                .catch(error => { 
                res.status(401).json({ result:"error", error: error.message})
                return; 
                })
            
        } catch (error) {
            res.status(401).json({ result:"error", error: error });
            return;
        }
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
                res.status(500).json({ result: "error", error: err });
                throw new Error('Error while connecting to database: ' + err)
            });
            

        } catch (err){
            res.status(500).json({ result: "error", error: err});
        }
    }

    async modifyTshirt(req: express.Request, res: express.Response){
        try{
            let tshirt: mongoose.Model<CTshirtModel | undefined>;
            let filter: string;
            let update: object;
            const tshirtModel = new CTshirtModel('tshirt', clothesSchema);
            
            tshirt = tshirtModel.createModel();
            filter = req.params.id;
            update = req.body;

            if(!allPropertiesAreValid(update)) throw new Error('Properties are not valid: ' + propertiesInvalids(update));
            
            databaseConnection()
            .then(connection => {
                //when the connection is established find all tshirts in database
                    tshirt.findOneAndUpdate({_id: new mongoose.Types.ObjectId(filter)}, update, { new: true }).exec()
                    .then(data => {
                        res.status(200).json({result: "ok", response: data});
                        return;
                    })
                    .catch(error => {
                        res.status(401).json({result: "error", error: error.message});
                        return;
                    });
            
            
            })
            .catch(error => { 
            res.status(401).json({ result:"error", error: error.message});
            return; 
            });



        } catch (error: any){
            res.status(401).json({result: "error", error: error.message});
            return;
        }

    }

    async deleteTshirt(req: express.Request,res: express.Response){
        let tshirt: mongoose.Model<CTshirtModel | undefined>;
        let filter: string;
        const tshirtModel = new CTshirtModel('tshirt', clothesSchema);

        tshirt = tshirtModel.createModel();
        filter = req.params.id;

        try{
             
            databaseConnection()
            .then(connection => {
                //when the connection is established find all tshirts in database
                    tshirt.deleteOne({_id: new mongoose.Types.ObjectId(filter)}, { new: true }).exec()
                    .then(data => {
                        if(data.deletedCount === 1){

                            res.status(200).json({result: "ok", response: data});
                            return;
                        } else {
                            res.status(200).json({result: "ok", response: `T-shirt has already been removed`, data: data});
                            return;
                        }
                    })
                    .catch(error => {
                        res.status(401).json({result: "error", error: error.message});
                        return;
                    });
            
            
            })
            .catch(error => { 
            res.status(401).json({ result:"error", error: error.message});
            return; 
            });
        } catch (error: any){ 
            if(Object.getOwnPropertyNames(error).includes("message")){
                res.status(401).json({result: "error", error: error.message});
                return;
            }      
        }
    };

};