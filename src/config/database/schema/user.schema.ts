import mongoose, { mongo } from "mongoose";
import { CBaseSchema } from "./schema";
import { validate } from "class-validator";

/* User Schema:

username: String (required)
email: String (required)
password: String (required)
deleted: Boolean (default: false)
created_at: Date (default: current date and time)
 */
class CUserSchema  extends CBaseSchema {
    username: string;
    email: string;
    password: string;
    deleted: boolean;
    created_at: Date;
    verificated: boolean;

    constructor(username: string, email: string, password: string, deleted: boolean = false, created_at: Date, verificated: boolean = false){
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.deleted = deleted;
        this.created_at = created_at;
        this.verificated = verificated;
    }

    protected createSchema(schema: CUserSchema): void {
        try{
            this.validateSchema(schema);

            let userSchema = new mongoose.Schema(schema);

                if( userSchema instanceof mongoose.Schema){
                console.log(`Schema of user created successfully`);
                return;
            }  
            
        } catch (error){
            throw new Error(`Error creating schema: ${error}`);
        }
    }
   
    protected validateSchema(schema: CUserSchema): void {
        this.validateUsername(schema.username);
    }

    protected validateUsername(username: string): void {
        try{
            if(!username){
                throw new Error(`Username is required`);
            }
            if(username.length > 10){
                throw new Error('Invalid username, maximum length is 10');
            } 
            if(username.length <= 0){
                throw new Error('Username is required');
            }
            
            if(username.includes(' ')){
                throw new Error('Username contains invalid characters');
            }
            return;

        } catch(err){
            throw err;
        }
    }
}