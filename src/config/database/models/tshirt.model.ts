import { databaseConnection, disconnectDatabase } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose from 'mongoose';
import { clothesSchema } from '../schema/clothes.schema';
import { CUserSchema } from '../schema/user.schema';

export class CTshirtModel extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

    createModel() {
        try{
            return mongoose.model('tshirt',new mongoose.Schema(clothesSchema));
        
        } catch(err){
            throw new Error('Error creating model: '+ err);
        }
    }
}