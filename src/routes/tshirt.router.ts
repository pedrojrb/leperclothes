import { TshirtController } from '../controllers/tshirt.controller';
import { Router } from "./router";
import * as express from 'express';

export class TshirtRouter extends Router<TshirtController>{
    constructor(){
        super(TshirtController);
    }

    routes(): void {
        this.router.get('/tshirts', (req: express.Request,res: express.Response) => this.controller.getAllTshirts(req,res));
        this.router.get('/tshirts/:name', (req: express.Request,res: express.Response) => this.controller.getTshirtByTshirtname(req,res));
        this.router.post('/tshirts/modify/:id', (req: express.Request,res: express.Response) => this.controller.modifyTshirt(req,res));
        this.router.post('/tshirts/create', (req: express.Request,res: express.Response) => this.controller.createTshirt(req,res));
        this.router.post('/tshirts/:id', (req: express.Request,res: express.Response) => this.controller.deleteTshirt(req,res));
    }
}