import mongoose, { Model, Schema } from "mongoose";
import { BaseModel } from "./model";
import { CUserSchema } from "../schema/user.schema";
import { CBaseSchema } from "../schema/schema";
import { User } from '../../../class/users.class';

export class CUserModel extends BaseModel implements Schema{
    name: string;
    schema: CBaseSchema; //
    constructor(name: string, schema: CUserSchema){
        super(name,schema);
        this.name = name;
        this.schema = schema;
    }

    async createModel(name: string, schema: CUserSchema):  Promise<void> {
        let UserModel = mongoose.model(name,schema as Schema);
    }
}