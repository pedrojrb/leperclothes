"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const user_controller_1 = require("../controllers/user.controller");
const router_1 = require("./router");
/**
 * Main class of UserRouter
 */
class UserRouter extends router_1.CRouter {
    constructor() {
        super(user_controller_1.UserController);
    }
    /**
     * This method executes all of routing methods.
     */
    routes() {
        this.router.get('/user', (req, res) => this.controller.getAllUsers(req, res));
        this.router.get('/user/:username', (req, res) => this.controller.getUserByUsername(req, res));
        this.router.post('/user/create', (req, res) => this.controller.createUser(req, res));
        this.router.post('/user/modify/:id', (req, res) => this.controller.modifyUser(req, res));
        this.router.post('/user/:id', (req, res) => this.controller.deleteUser(req, res));
    }
}
exports.UserRouter = UserRouter;
