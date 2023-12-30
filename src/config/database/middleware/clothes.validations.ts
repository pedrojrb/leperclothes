import {Schema} from 'mongoose';

/**
 * This function is responsible for validating data before sending to the database.
 * @param Reference of the tshirt schema
 * return the next middleware function.
 */

export function validateName(value: string): boolean {

    return value.length > 5 && value.length <= 100 

}

export function validateSize(schema: Schema): void {

}