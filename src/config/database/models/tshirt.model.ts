import { databaseConnection } from '../db.config';
import { CBaseSchema } from '../schema/schema';
import { CBaseModel } from './model';
import mongoose, { Model } from 'mongoose';

export class CTshirtModel extends CBaseModel {

    name: string;
    schema: CBaseSchema;

    constructor(name:string, schema: CBaseSchema){
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }

    async createModel(): Promise<void> {
        try{
            //Create connection to database
            
            databaseConnection()
            .then(conn => {
                
                console.log('Connection to database successfully created: ' + conn);

                let tshirtModel = mongoose.model('tshirt', this.schema);

               let tshirt = new mongoose.Model(this.name, {
                name: 'Test',
                color: 'Red',
                size: 'L',
                created_at : new Date()
                });

                if(tshirt instanceof mongoose.Model){

                    let savedTshirt = tshirt.save();

                    if(savedTshirt) {
                        console.log('Tshirt saved', savedTshirt);
                        
                    }
                }
            });

            

        } catch (e){
            throw Error('Error creating model: ' + e)
        }
        
        
    }
}