import * as express  from "express";

interface IRouter<T>{
    router: express.Router;
    controller: T;
}

export class Router<T> implements IRouter<T>{
    public router: express.Router;
    public controller: T;

    constructor(TController: { new (): T }){
        this.router = express.Router();
        this.controller = new TController();
        this.routes();
    
    }

    routes(){}
}