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
import { propertiesInvalids,allPropertiesAreValid } from "../config/database/middleware/validations";
import { isValidToUpdate } from "../config/database/middleware/users.validations";



export class UserController{

    async loginUser(req: express.Request, res: express.Response){
        
        
        if(req.method === 'GET'){
            try{
                res.status(200).json({result:"ok", data:"Login page successfully"})
            } catch ( error: any){
                if(error.code ===400){
                    
                    res.status(400).json({result:"error",data:"Login page failed"});
                }
                
                if( error.code ===404){
                    res.status(404).json({result:"error",data:"Page not found"});
                }
            }
        }
        
        
        if( req.method === "POST"){
            let cryptr = new Cryptr('Password')
            let model = new CUserModel('user', userSchema);
            let document = model.createModel();
            let filter = req.body;
            let passDecrypted: string
            try{

                //handle errors meesage if username or password is not includes in request body.
                console.log(filter.username.length);
                if(!filter.username || filter.username.length === 0) throw new Error(`Username is required`);

                if(!filter.password || filter.password.length === 0) throw new Error(`Password is required`);
        
                databaseConnection()
                .then(connection => {
                    //when the connection is established find  user match with filter in  database
                        document.findOne({username: filter.username}).exec()
                        .then((data: any) => {

                            //Ask if exists user matches
                            if(!data){
                                throw new Error(`Username and password is required`);;
                            }

                            //verify if data is a object type.

                            if(typeof data === 'object'){
                                //Data received from database decrypt password for comparate with password in body request.
                                passDecrypted = cryptr.decrypt(data.password);

                                if (filter.password === passDecrypted){
                                    res.status(200).json({result: "ok", response: data});
                                    return;
                                }

                                throw new Error('Invalid username or password');
                            

                            }

                            throw new Error('Error in request: ' + data);
                        })
                        .catch(error => {
                            res.status(401).json({result: "error", error: error.message});
                            return;
                        })
                })
                .catch(error => { 
                    res.status(401).json({ result:"error", error: error})
                    return; 
                });
            } catch(error){
                res.status(401).json({ result:"error", error: error.message})
                return;
            }

        }
            
    }

    async getAllUsers(req: express.Request, res: express.Response){

        let model = new CUserModel('user', userSchema);
        let document = model.createModel();

            try{
                
                //connect to database

                databaseConnection()
                .then(connection => {
                    //when the connection is established find all tshirts in database
                        document.find().exec()
                        .then(data => {
                            res.status(200).json({result: "ok", response: data});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(401).json({result: "ok", error: error});
                            return;
                        });
                })
                .catch(error => { 
                res.status(401).json({ result:"error", error: error})
                return; 
                })
            
            } catch (err) {
                res.status(401).json({ result:"error", error: err })
                return;
            }

    };

    async getUserByUsername(req: express.Request, res: express.Response){

        let model = new CUserModel('user', userSchema)
        let document = model.createModel();
        let filter: RegExp;
        const username = req.query.username;


        if(username === undefined || username.length === 0) {
            res.status(401).json({ result:"error", error:"Don't exist filter"});
            return; 
        };

        if(typeof username === 'string'){ filter = new RegExp(username, 'gi');}

        try{     
                //connect to database

                databaseConnection()
                .then(connection => {
                    //when the connection is established find  tshirts match with filter in  database
                        document.find({username: filter}).exec()
                        .then(data => {
                            if(data.length === 0){
                                res.status(200).json({result: "ok", response: data, comment: `There are no results that match the search: ${username}`});
                                return;
                            }
                            res.status(200).json({result: "ok", response: data});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(401).json({result: "error", error: error.message});
                            return;
                        });
                
                
                })
                .catch(error => { 
                res.status(401).json({ result:"error", error: error.message})
                return; 
                })
            
        } catch (error) {
            res.status(401).json({ result:"error", error: error });
            return;
        }
        
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
        try{
            let user: mongoose.Model<CUserModel>;
            let filter: string;
            let update: object;
            const userModel = new CUserModel('user', userSchema);
            
            user = userModel.createModel();
            filter = req.params.id;
            update = req.body;

            if(!isValidToUpdate(Object.keys(update))) throw new Error('There are properties that cannot be updated');

            if(!allPropertiesAreValid(userSchema,update)) throw new Error('Properties are not valid: ' + propertiesInvalids(userSchema,update));
            
            databaseConnection()
            .then(connection => {
                //when the connection is established find all tshirts in database
                    user.findOneAndUpdate({_id: new mongoose.Types.ObjectId(filter)}, update, { new: true }).exec()
                    .then(data => {
                        res.status(200).json({result: "ok", response: data});
                        return;
                    })
                    .catch(error => {
                        res.status(401).json({result: "error", error: error.message});
                        return;
                    });
            
            
            })
            .catch(error => { 
            res.status(401).json({ result:"error", error: error.message});
            return; 
            });



        } catch (error: any){
            res.status(401).json({result: "error", error: error.message});
            return;
        }

    };

    async deleteUser(req: express.Request,res: express.Response){
        let user: mongoose.Model<CUserModel>;
        let filter: string;
        const userModel = new CUserModel('user', userSchema);

        user = userModel.createModel();
        filter = req.params.id;
        console.log(filter);

        try{
             
            databaseConnection()
            .then(connection => {
                //when the connection is established search the user by id
                    user.deleteOne({_id: new mongoose.Types.ObjectId(filter)}, { new: true }).exec()
                    .then(data => {
                        if(data.deletedCount === 1){

                            res.status(200).json({result: "ok", response: data});
                            return;
                        } else {
                            res.status(200).json({result: "ok", response: `User has already been removed`, data: data});
                            return;
                        }
                    })
                    .catch(error => {
                        res.status(401).json({result: "error", error: error.message});
                        return;
                    });
            
            
            })
            .catch(error => { 
            res.status(401).json({ result:"error", error: error.message});
            return; 
            });
        } catch (error: any){ 
            if(Object.getOwnPropertyNames(error).includes("message")){
                res.status(401).json({result: "error", error: error.message});
                return;
            }      
        }
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
