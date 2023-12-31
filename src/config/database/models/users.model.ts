import { databaseConnection, disconnectDatabase } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose, { Model, Schema } from 'mongoose';
import * as express from 'express';
import { CUserSchema, userSchema } from '../schema/user.schema';

export class CUserModel extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

   createModel(): Model<CUserModel>{

        try{   
            //Ask if the model is already created or if not create it.
        
            return mongoose.models.user || mongoose.model('user', new mongoose.Schema(userSchema));

        } catch(err){
            throw new Error('Error creating model: '+ err);
        }
    }
}