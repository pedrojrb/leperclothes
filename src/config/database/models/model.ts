import { CBaseSchema } from "../schema/schema";
import * as express from 'express';

interface IModel {
    name: string;
    schema: CBaseSchema;
}

export abstract class CBaseModel implements  IModel {
    
    name:  string;
    schema: CBaseSchema;

    constructor(name: string, schema: CBaseSchema){
        this.name = name;
        this.schema = schema;
    }

    async createModel(req: express.Request): Promise<any>{};

}