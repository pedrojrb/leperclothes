"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtshirtRouter = void 0;
const tshirt_controller_1 = require("../controllers/tshirt.controller");
const router_1 = require("./router");
/**
 * Main class of TshirtRouter
 */
class CtshirtRouter extends router_1.CRouter {
    constructor() {
        super(tshirt_controller_1.CtshirtController);
    }
    /**
     * This method executes all of routing methods.
     */
    routes() {
        this.router.get('/tshirts', (req, res) => this.controller.getAllTshirts(req, res));
        this.router.get('/tshirts/:name', (req, res) => this.controller.getTshirtByName(req, res));
        this.router.get('/tshirts/search/:id', (req, res) => this.controller.getTshirtById(req, res));
        this.router.post('/tshirts/modify/:id', (req, res) => this.controller.modifyTshirt(req, res));
        this.router.post('/tshirts/create', (req, res) => this.controller.createTshirt(req, res));
        this.router.post('/tshirts/:id', (req, res) => this.controller.deleteTshirt(req, res));
    }
}
exports.CtshirtRouter = CtshirtRouter;
