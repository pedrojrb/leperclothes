import { databaseConnection } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose from 'mongoose';

export class CTshirtSchema extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

    async createModel(name: string, schema: CBaseSchema): Promise<void> {
        try{
            const connection = await databaseConnection();

            if(connection){
                let userModel = new mongoose.Model(name, schema);


                if(userModel instanceof mongoose.Model){

                    console.log('Model created: ',  userModel);

                    let savedTshirt = await userModel.save();

                    if(savedTshirt) {
                        console.log('Tshirt saved', savedTshirt);
                        connection.disconnect();
                    }
                } 
            }

        } catch (e){
            throw Error('Error creating model: ' + e)
        }
        
        
    }
}