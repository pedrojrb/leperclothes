import * as express from "express";
import mongoose from "mongoose";
import { userSchema } from "../config/database/schema/user.schema";
import { CUserModel } from "../config/database/models/users.model";

export class UserController{

    async getAllUsers(req: express.Request, res: express.Response){
        

    };

    async getUserByUsername(req: express.Request, res: express.Response){

        
    };

    async createUser(req: express.Request, res: express.Response){
        try{

            const userModel = new CUserModel('user', userSchema);

            userModel.createModel(req)
            .then(response => {
                res.status(201).json({"result": "ok", "data": response});
                
            })
            .catch(err => {
                res.status(400).json({ result:"error",err: err})
                throw new Error('Error durating creating model: ' + err)});
           
    
           
        } catch ( err ){
            if(res.statusCode){

                throw new Error(`HTTP Error, error code: ${res.statusCode} - ${res.statusMessage}`)
            }

            throw new Error ('Error creating new user: ' + err);
        }
    };

    async modifyUser(req: express.Request, res: express.Response){

    };

    async deleteUser(req: express.Request,res: express.Response){

    };

};