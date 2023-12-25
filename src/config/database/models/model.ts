import { CBaseSchema } from "../schema/schema";

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

    async createModel(name: string, schema: CBaseSchema): Promise<void>{};

}