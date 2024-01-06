import * as express from "express";
import mongoose from "mongoose";
import { CUserSchema, userSchema } from '../config/database/schema/user.schema';
import { CUserModel } from "../config/database/models/users.model";
import { databaseConnection } from "../config/database/db.config";
import Cryptr from "cryptr";
import { Email } from "../service/emailSenderService";
import { createToken, verifyToken} from '../config/database/middleware/token';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getHTMLformattedForEmail } from "../config/database/middleware/emailservice.middelwares";


export class UserController{

    async getAllUsers(req: express.Request, res: express.Response){
        

    };

    async getUserByUsername(req: express.Request, res: express.Response){

        
    };

   async createUser(req: express.Request, res: express.Response){
        try{
            //initialize all variables used in the request
            let token: string;
            let cryptr = new Cryptr('Password');
            let user: mongoose.Model<CUserModel>;
            let document:  mongoose.Document<CUserSchema | CUserModel | object>;
            let userValid: boolean = false;
            let email: Email;
            const userModel = new CUserModel('user', userSchema);

            //encrypt password before save in database

            req.body.password = cryptr.encrypt(req.body.password);
            
            //create model and documents for save in database

            user = userModel.createModel();

            document = new user(req.body);

            //connect to database

            databaseConnection()
            .then(conn => {
        
                if(conn){
                    console.log("Connection established to database: " + conn);

                    if(document && document instanceof mongoose.Model){

                        //save the document

                        document.save()
                        .then((result) =>{
                            if(result){
                                console.log('User saved', result);
                                userValid = true;

                                //send confirmation email

                           

                                if(userValid){

                                    email = new Email('delivered@resend.dev',[req.body.email]);
                                    
                                    token = createToken({
                                        "email": email.to[0]
                                        
                                    });
                             
                                    email.html = getHTMLformattedForEmail(token);
                                    
                                    email.sendEmail(email)
                                    .then(emailSender => {
                                        console.log(`Email send ${emailSender} successfully`);
                                    })
                                    .catch(err => {return res.status(500).send().json({ result: "error", error: err})});
                                    
                                    res
                                    .redirect(`verify/${token}`)
                                    return;
                                
                                }

                            }
                        })
                        .catch(err => {
                            res.status(501).json({ result: "error", error: err.message})});
                    }

                }

        
            })
            .catch(err => {
                res.status(500).send().json({ result: "error", error: err });
            });

        } catch(err){
            throw err;
        }
    }
        async modifyUser(req: express.Request, res: express.Response){

    };

    async deleteUser(req: express.Request,res: express.Response){

    };

    async verifyUser(req: express.Request, res: express.Response){
        let email: string;
        let model = new CUserModel('user', userSchema);
        let token: string = req.params.token;
        let payload: string | JwtPayload | undefined = verifyToken(token);
        let document = model.createModel()

        try{

            //if verification token is present then search token data.

            if(payload){  
    
                if(typeof payload === 'object' && payload['email']){
    
                   
                    email = payload['email'];
                    //connect to database

                    databaseConnection()
                    .then(connection => {
                        if(connection){       
                            //find in database if exists email address
                            document.findOneAndUpdate({email: email}, {verificated: true}).exec();


    
                        }
                    })
                    .catch(error => {
                        res.status(501).send().json({result:"error", error: error})
                        return;
                    })

                }
    
                res.status(200).json({result: "ok", message: payload}) 
                return;
            }


        } catch (error){

            res.status(401).json({result: "error", message: error});
            return;

        }

       
    }
       
       
        
}
