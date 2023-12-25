import { CBaseSchema } from "../schema/schema";

interface IModel{
    name: string;
    schema: CBaseSchema;
}

export abstract class BaseModel implements IModel{
    name: string;
    schema: CBaseSchema;

    constructor(name: string, schema: CBaseSchema) {
        this.name = name;
        this.schema = schema;
    }

    async createModel(name: string, schema: CBaseSchema): Promise<void> {}

    async saveModel(): Promise<void> {}

}