import { validate } from "class-validator";
import { CBaseSchema } from "./schema";
import mongoose, { mongo } from 'mongoose';
import { validateColor, validateName, validatePrice, validateSize } from "../middleware/clothes.validations";

export enum TSizeClothes {'S','M','L' ,'XL','XXL','XXXL'};

export type TColorClothes = {
    red: number,
    green: number,
    blue: number
};

interface IClothes {
    name: object
    size: object,
    color: object,
    price: object,
    created_at: object
}
export class CTshirtSchema extends CBaseSchema implements IClothes{

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

    public createSchema(schema: CTshirtSchema): void {
        try{
            let clothesSchema = new mongoose.Schema(schema);

            if (clothesSchema instanceof mongoose.Schema){
                console.log('Schema of clothes created successfully');
                
            }
        } catch (error) {
            throw new Error('Error creating schema: ' + error);
        }
    }


    /* protected validateName(name: string): void {
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


export const clothesSchema = new CTshirtSchema({
    name:{
        type: "String",
        unique: [true, 'Name is required'],
        validate: [validateName, 'Name required between 5 and 100 characters length']
    },
    size: {
        type: "String",
        validate:[validateSize, 'Size availables are: ' + Object.values(TSizeClothes) ]   
    },
    color: {
        type: "Object",
        validate: [validateColor, 'RGB value must be a number between 0 and 255']
    },
    price: {
        type: "String",
        validate: [validatePrice, 'Price cannot be less than 0']
    },
    created_at: {
        type: "Date",
        default: new Date()
    }
});