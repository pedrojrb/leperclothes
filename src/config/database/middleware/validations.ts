import { TSizeClothes, TColorClothes, clothesSchema } from '../schema/clothes.schema';

export function allPropertiesAreValid(original: object,updated: object): boolean{

    let originalsProperties: Array<string> = Object.keys(original);
    let newProperties = Object.keys(updated);

    return newProperties.every(prop => originalsProperties.includes(prop));

}

export function propertiesInvalids(original: object, updated: object): Array<string> {

    let originalsProperties: Array<string> = Object.keys(original);
    let newProperties = Object.keys(updated);

    return newProperties.filter(prop => !originalsProperties.includes(prop));
    
}