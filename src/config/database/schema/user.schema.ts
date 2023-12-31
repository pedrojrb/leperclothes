import mongoose from "mongoose";
import { CBaseSchema } from "./schema";
import { validateEmail, validatePassword, validateUsername } from "../middleware/users.validations";

interface IUser {
    username: object,
    email: object,
    password: object,
    deleted: object,
    created_at: object,
    verificated: object
}
export class CUserSchema extends CBaseSchema implements IUser{

    username: object;
    email: object;
    password: object;
    deleted: object;
    created_at: object;
    verificated: object;

    constructor(user: IUser){
        super();
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.deleted = user.deleted;
        this.created_at = user.created_at;
        this.verificated = user.verificated;
        this.createSchema(this);
    }

    public createSchema(schema: CUserSchema): void {
        try{

            let userSchema = new mongoose.Schema(schema);

                if( userSchema instanceof mongoose.Schema){
                console.log(`Schema of user created successfully`);
                return;
            }  
            
        } catch (error){
            throw new Error(`Error creating schema: ${error}`);
        }
    }
    
}

export let userSchema: CUserSchema;

let user = new CUserSchema({
    username:{
        type: "String",
        required: true,
        unique: [true, 'Username already in use, please choose a different'],
        validate: validateUsername
    },
    email: {
        type: "String",
        required: true,
        unique: [true, 'Email already in use, please choose a different'],
        validate: validateEmail
    },
    password: {
        type: "String",
        required: true,
        validate: validatePassword
    },
    deleted: {
        type: "Boolean",
        default: false
    },
    created_at: {
        type: "Date",
        default: new Date()
    },
    verificated:{
        type:"Boolean",
        default: false
    }
});

userSchema = user;