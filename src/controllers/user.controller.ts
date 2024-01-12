import * as express from "express";
import mongoose, { Mongoose } from "mongoose";
import { CUserSchema, userSchema } from '../config/database/schema/user.schema';
import { CUserModel } from "../config/database/models/users.model";
import { databaseConnection } from "../config/database/db.config";
import Cryptr from "cryptr";
import { Email } from "../service/emailSenderService";
import { createToken, verifyToken} from '../config/database/middleware/token';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getHTMLformattedForEmail, getRandomCode } from "../config/database/middleware/emailservice.middelwares";
import cors from 'cors';
import { CTshirtModel } from "../config/database/models/tshirt.model";


export class UserController{

    async getAllUsers(req: express.Request, res: express.Response){};

    async getUserByUsername(req: express.Request, res: express.Response){

        
    };

   async createUser(req: express.Request, res: express.Response){
        try{
            //initialize all variables used in the request
            let code: number = getRandomCode();
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
                                        "email": email.to[0],
                                        "code": code
                                        
                                    })

                                    email.html = getHTMLformattedForEmail(token, code);
                                    
                                    email.sendEmail(email)
                                    .then(emailSender => {
                                        console.log(`Email send ${emailSender} successfully`);
                                    })
                                    .catch(err => {
                                        res.status(500).json({ result: "error", error: err})
                                        return;
                                    });
                                    
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
                res.status(500).json({ result: "error", error: err });
                return;
            });

        } catch(err){
            res.status(500).json({ result: "error", error: err});
            return;
        }
    }
        async modifyUser(req: express.Request, res: express.Response){

    };

    async deleteUser(req: express.Request,res: express.Response){

    };

    async verifyUser(req: express.Request, res: express.Response){
        
        let email: string;
        let model: CUserModel;
        let code: number;
        let token: string = req.params.token;
        let payload: string | JwtPayload | undefined = verifyToken(token);
        let document: mongoose.Model<CUserModel>;
        

        try{
           
            if(req.method === 'GET'){

                res.send({result:'ok', response: payload});
                res.end();
                return;
            }
        
            if(req.method === 'POST'){

                model = new CUserModel('user', userSchema);
                document = model.createModel();
            
                //Verify if email is present in payload.
                if(!payload) throw Error('Token is expired');
                
                if(typeof payload == 'object' && payload['email'] && payload['code']) {
    
                   
                    email = payload['email'];
                    code = payload['code'];
                           
                    //connection to database

                    databaseConnection()
                    .then(connection => {

                        if(req.body.code === code){

                            //find in database if exists email address and update value of verification

                            let data = document.findOneAndUpdate({email: email}, {verificated: true}, {new: true});
                            data
                            .then((data) => {
                                res.send({result: "ok", response: "User verified successfully"});
                                return;
                            })
                            .catch((error) => {
                                res.status(400).send({result: error, response: error});
                                return;
                            });
                            
                        }

                        throw Error('Invalid code');
                             
                    })
                    .catch(error => {
                            
                        res.status(401).send({result: "error", error: error.message});
                        return;
                             
                    });

             
                }
            }

        } catch (error){

            res.json({result: "error", message: error});
            return;

        }

       
    }     
        
}
