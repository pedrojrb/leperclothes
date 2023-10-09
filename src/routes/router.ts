import * as express  from "express";

interface IRouter<T>{
    router: express.Router;
    controller: T;
}

/**
 * This main class to Routes, this class extends in another class childrens.
 */
export abstract class CRouter<T> implements IRouter<T>{
    public router: express.Router;
    public controller: T;

    /**
     * This constructor is responsible for asignn value to router and controller properties. 
     * Also, execute routes method.
     * @param TController Controller from generyc type T.
     */

    constructor(TController: { new (): T }){
        this.router = express.Router();
        this.controller = new TController();
        this.routes();
    
    }

    routes(){}
}