"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TshirtRouter = void 0;
const tshirt_controller_1 = require("../controllers/tshirt.controller");
const router_1 = require("./router");
/**
 * Main class of TshirtRouter
 */
class TshirtRouter extends router_1.Router {
    constructor() {
        super(tshirt_controller_1.TshirtController);
    }
    /**
     * This method executes all of routing methods.
     */
    routes() {
        this.router.get('/tshirts', (req, res) => this.controller.getAllTshirts(req, res));
        this.router.get('/tshirts/:name', (req, res) => this.controller.getTshirtByTshirtname(req, res));
        this.router.post('/tshirts/modify/:id', (req, res) => this.controller.modifyTshirt(req, res));
        this.router.post('/tshirts/create', (req, res) => this.controller.createTshirt(req, res));
        this.router.post('/tshirts/:id', (req, res) => this.controller.deleteTshirt(req, res));
    }
}
exports.TshirtRouter = TshirtRouter;
