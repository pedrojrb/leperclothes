import { CBaseSchema } from "./schema";
import mongoose from 'mongoose';

type TSizeClothes = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type TColorClothes = 'BLACK' | 'WHITE' | 'GRAY' | 'GREEN' | 'YELLOW' | 'RED' | 'BLUE' | 'PURPLE';

interface IClothes {
    name: string,
    size: TSizeClothes,
    color: TColorClothes,
    price: number,
    created_at: Date
}
class CClothesSchema extends CBaseSchema implements IClothes{

    name: string;
    size: TSizeClothes;
    color: TColorClothes;
    price: number;
    created_at: Date;

    constructor(clothes: IClothes) {
        super();
        this.name = clothes.name;
        this.size = clothes.size;
        this.color = clothes.color;
        this.price = clothes.price;
        this.created_at = clothes.created_at;
    }

    protected createSchema(schema: CClothesSchema): void {
        try{
            this.validateSchema(schema);

            let clothesSchema = new mongoose.Schema(schema);

            if (clothesSchema instanceof mongoose.Schema){
                console.log('Schema of clothes created successfully');
                return;
            }
        } catch (error) {
            throw new Error('Error creating schema: ' + error);
        }
    }

    protected validateSchema(schema: CClothesSchema): void {
        this.validateName(schema.name);
        this.validatePrice(schema.price);
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
    }
}