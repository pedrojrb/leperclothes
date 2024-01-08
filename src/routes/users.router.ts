import { UserController } from "../controllers/user.controller";
import { CRouter } from "./router";
import * as express from 'express';

/**
 * Main class of UserRouter
 */
export class UserRouter extends CRouter<UserController>{
    constructor(){
        super(UserController);
    }

    /**
     * This method executes all of routing methods.
     */

    routes(): void {
        this.router.get('/user', (req: express.Request,res: express.Response) => this.controller.getAllUsers(req,res))
        this.router.get('/user/:username', (req: express.Request,res: express.Response) => this.controller.getUserByUsername(req,res))
        this.router.post('/user/create', (req: express.Request,res: express.Response) => this.controller.createUser(req,res))
        this.router.post('/user/modify/:id', (req: express.Request,res: express.Response) => this.controller.modifyUser(req,res))
        this.router.post('/user/:id', (req: express.Request,res: express.Response) => this.controller.deleteUser(req,res))
        this.router.get('/user/verify/:token', (req: express.Request, res: express.Response) => this.controller.verifyUser(req,res))
        this.router.post('/user/verify/:token', (req: express.Request, res: express.Response) => this.controller.verifyUser(req,res))
    }
}