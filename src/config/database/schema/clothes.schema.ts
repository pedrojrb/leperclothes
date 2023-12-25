import { validate } from "class-validator";
import { CBaseSchema } from "./schema";
import mongoose from 'mongoose';

enum TSizeClothes {'S','M','L' ,'XL','XXL','XXXL'};

type TColorClothes = 'BLACK' | 'WHITE' | 'GRAY' | 'GREEN' | 'YELLOW' | 'RED' | 'BLUE' | 'PURPLE';

interface IClothes {
    name: object
    size: object,
    color: object,
    price: object,
    created_at: object
}
export class CClothesSchema extends CBaseSchema implements IClothes{

    name: object;
    size: object;
    color: object;
    price: object;
    created_at: object;

    constructor(clothes: IClothes) {
        super();
        this.name = clothes.name;
        this.size = clothes.size;
        this.color = clothes.color;
        this.price = clothes.price;
        this.created_at = clothes.created_at;
        this.createSchema(this);
    }

    public createSchema(schema: CClothesSchema): void {
        try{
            let clothesSchema = new mongoose.Schema(schema);

            if (clothesSchema instanceof mongoose.Schema){
                console.log('Schema of clothes created successfully');
                return;
            }
        } catch (error) {
            throw new Error('Error creating schema: ' + error);
        }
    }

    /* public validateSchema(schema: CClothesSchema): void {
      //TODO: Feature of this method. Structure of schema is different from schema neccessary.
    }

    protected validateName(name: string): void {
        try{
            if(!name) throw new Error('Name is required');

            if(name.length > 100) throw new Error('Name must be at least 100 characters long');

        } catch (error) {
            throw new Error('Error while validating name:' + error);
        }
    }

    protected validatePrice(price: number): void {
        try{
            if(!price) throw new Error('Price is required');

            if(price < 0) throw new Error('Price dont be negative value');

        } catch (error) {
            throw new Error('Error while validating price: ' + error);
        }
    } */
}


export const clothesSchema = new CClothesSchema({
    name:{
        type: "String"
    },
    size: {
        type: "String"
    },
    color: {
        type: "String"
    },
    price: {
        type: "String"
    },
    created_at: {
        type: "Date"
    }
});