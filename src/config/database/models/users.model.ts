import { databaseConnection, disconnectDatabase } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose, { Model } from 'mongoose';
import * as express from 'express';

export class CUserModel extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

   /*  createModel(req: express.Request): Promise<any> {
        try{
            //variables are created for save model and create new documents.

            let userModel;
            let user;
            
            //Call connection to database
            
            databaseConnection()
            .then(conn => {
        
                if(conn){
                    console.log("Connection established to database");

                        //intialize my variable creating Model object
                        userModel = mongoose.model('user', new mongoose.Schema(this.schema));

                        user = new userModel(req.body);
    
                    //When tshirt is created can i follow with the save data in the database

                    if(user instanceof mongoose.Model){
    
                        user.save()
                        .then((result) =>{
                            console.log('User saved', result);
                            return result;
                        })
                        .catch(err => {throw new Error('Error durating save user in database: ' + err)});

                    }

                }
                
                disconnectDatabase()
                .then((result) => { 
                    console.log('Disconnect Database connection: ' + result);
                    return result; })
                .catch(err => { throw new Error('Error while disconnecting database: ' + err)});
            })
            .catch(err => {throw new Error('Error while connecting to database: ' + err)});

            

        } catch (e){
            throw Error('Error creating model: ' + e)
        }
        
        
    } */
}