import mongoose, { mongo } from "mongoose";
import { CBaseSchema } from "./schema";

/* User Schema:

username: String (required)
email: String (required)
password: String (required)
deleted: Boolean (default: false)
created_at: Date (default: current date and time)
 */
class CUserSchema  extends CBaseSchema {
    
    constructor(username: string, email: string, password: string, deleted: boolean, created_at: Date){
        super();

    }

    protected createSchema(schema: CUserSchema): void {
        try{
            let userSchema = new mongoose.Schema(CUserSchema);

            if( userSchema instanceof mongoose.Schema){
                console.log(`Schema of user created successfully`);
                return;
            }
        } catch (error){
            throw new Error(`Error creating schema: ${error}`);
        }
    }
}