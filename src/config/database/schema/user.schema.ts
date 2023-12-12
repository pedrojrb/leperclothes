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

    constructor(username: string, email: string, password: string, deleted: boolean = false, created_at: Date = new Date(), verificated: boolean = false){
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.deleted = deleted;
        this.created_at = created_at;
        this.verificated = verificated; 
        this.createSchema(this);
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
    }

}