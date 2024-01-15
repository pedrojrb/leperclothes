import { TSizeClothes, TColorClothes, clothesSchema } from '../schema/clothes.schema';

/**
 * This function is responsible for validating data before sending to the database.
 * @param Reference of the tshirt schema
 * return the next middleware function.
 */

export function validateName(value: string): boolean {

    return value.length > 5 && value.length <= 100 

}

export function validateSize(value: TSizeClothes): value is TSizeClothes {
    return Object.values(TSizeClothes).includes(value)    
}

export function validateColor(value: TColorClothes) {
    let allValues: Array<number> = Object.values(value);

    return allValues.every(value => value >= 0 && value <= 255);
}

export function validatePrice(value: number): boolean {
    return value > 0;
}