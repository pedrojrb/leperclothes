import { CBaseSchema } from "./schema";
import mongoose, { mongo } from 'mongoose';
import { validateColor, validateName, validatePrice, validateSize } from "../middleware/clothes.validations";


//-----------------------------DATA TYPES DECLARATION-----------------------------------

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

//-----------------------VARIABLE DECLARATION------------------------

export let clothesSchema: CTshirtSchema;
let tshirt: CTshirtSchema;


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

}

tshirt = new CTshirtSchema({
    name:{
        type: "String",
        unique: [true, 'Name is required'],
        validate: [validateName, 'Name required between 5 and 100 characters length']
    },
    size: {
        type: "String",
        required: [true, 'Size is required'],
        validate:[validateSize, 'Size availables are: ' + Object.values(TSizeClothes) ]   
    },
    color: {
        type: "Object",
        validate: [validateColor, 'RGB value must be a number between 0 and 255']
    },
    price: {
        type: "Decimal128",
        validate: [validatePrice, 'Price cannot be less than 0']
    },
    created_at: {
        type: "Date",
        default: new Date()
    }
});

clothesSchema = tshirt;