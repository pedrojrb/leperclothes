import { databaseConnection } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose, { Model } from 'mongoose';
import * as express from 'express';

export class CTshirtModel extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

    async createModel(req: express.Request): Promise<void> {
        try{
            //variables are created for save model and create new documents.

            let tshirtModel;
            let tshirt;
            
            //Call connection to database
            
            databaseConnection()
            .then(conn => {
        
                if(conn){
                    console.log("Connection established to database");

                        //intialize my variable creating Model object
                        tshirtModel = mongoose.model('tshirt', new mongoose.Schema(this.schema));

                        //TODO: Send inside tshirtMode constructor request body data.

                        tshirt = new tshirtModel(req.body);
    
                    //When tshirt is created can i follow with the save data in the database

                    if(tshirt instanceof mongoose.Model){
    
                        tshirt.save()
                        .then((result) =>{
                            console.log('Tshirt saved', result);
                        })
                        .catch(err => console.log('Error durating save tshirt in database: ' + err));

                    }

                }
                
            })
            .catch(err => {throw new Error('Error while connecting to database: ' + err)});

            

        } catch (e){
            throw Error('Error creating model: ' + e)
        }
        
        
    }
}