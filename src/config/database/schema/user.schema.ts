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
   
    /* public validateSchema(schema: CUserSchema): void {
        this.validateUsername(schema.username);
        this.validateEmail(schema.email);
        this.validatePassword(schema.password);
    }

    private validateUsername(username: string): void {

        let regex: Readonly<RegExp> = new RegExp('^[a-z0-9]+$');

        try{
            username = username.toLowerCase();

            if(!username || username.length <= 0) throw new Error(`Username is required`);
            
            if(username.length > 10) throw new Error('Invalid username, maximum length is 10.');
            
            if(!regex.test(username)) throw new Error('Username contains invalid characters. n\ Characters validate are alphanumeric only.');
            
            return;

        } catch(err){
            throw err;
        }
    }

    private validateEmail(email: string): void {
        let regex: Readonly<RegExp> = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

        try{
            if(!email || email.length <= 0) throw new Error('Please enter an email address');

            if(!regex.test(email)) throw new Error('Invalid email. n\ Please enter a valid email address.');

            return;

        } catch(err){
            throw err;
        }
    }

    private validatePassword(password: string): void {
        let regex = new RegExp(`^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*`);

        try {
            if(!password || password.length <= 0) throw new Error('Please enter a password');

            if(!regex.test(password)) throw new Error('Password has invalid characters');

            if(password.length < 8) throw new Error('Password must be at least 8 characters');

            if(password.length > 12) throw new Error('Password  must be 12 characters maximum');

        } catch (err) {
            throw err;
        }
    } */

    
}

export const userSchema = new CUserSchema({
    username:{
        type: "String"
    },
    email: {
        type: "String"
    },
    password: {
        type: "String"
    },
    deleted: {
        type: "Boolean"
    },
    created_at: {
        type: "Date"
    },
    verificated:{
        type:"Boolean"
    }
});