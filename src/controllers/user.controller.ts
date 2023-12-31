import * as express from "express";
import mongoose from "mongoose";
import { CUserSchema, userSchema } from '../config/database/schema/user.schema';
import { CUserModel } from "../config/database/models/users.model";
import { databaseConnection } from "../config/database/db.config";

export class UserController{

    async getAllUsers(req: express.Request, res: express.Response){
        

    };

    async getUserByUsername(req: express.Request, res: express.Response){

        
    };

   async createUser(req: express.Request, res: express.Response){
        try{
            let user ;
            let document:  mongoose.Document<CUserSchema | CUserModel | object>;
            
            const userModel = new CUserModel('user', userSchema);

            user = userModel.createModel();

            document = new user(req.body);


            databaseConnection()
            .then(conn => {
        
                if(conn){
                    console.log("Connection established to database: " + conn);

                    if(document && document instanceof mongoose.Model){

                        document.save()
                        .then((result) =>{
                            if(result){
                                console.log('User saved', result);
                                
                                return res.status(201).json({"result":"ok", "response": result});

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

};