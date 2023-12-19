import mongoose from 'mongoose';

export abstract  class CBaseSchema{
    
    public  createSchema(schema: CBaseSchema): void {}

    public validateSchema(schema: CBaseSchema): void{}

}