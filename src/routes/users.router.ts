import { UserController } from "../controllers/user.controller";
import { Router } from "./router";
import * as express from 'express';

export class UserRouter extends Router<UserController>{
    constructor(){
        super(UserController);
    }

    routes(): void {
        this.router.get('/user', (req: express.Request,res: express.Response) => this.controller.getAllUsers(req,res))
        this.router.get('/user/:username', (req: express.Request,res: express.Response) => this.controller.getUserByUsername(req,res))
        this.router.post('/user/create', (req: express.Request,res: express.Response) => this.controller.createUser(req,res))
        this.router.post('/user/modify/:id', (req: express.Request,res: express.Response) => this.controller.modifyUser(req,res))
        this.router.post('/user/:id', (req: express.Request,res: express.Response) => this.controller.deleteUser(req,res))
    }
}