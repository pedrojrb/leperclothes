"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("../config/database/schema/user.schema");
const users_model_1 = require("../config/database/models/users.model");
const db_config_1 = require("../config/database/db.config");
const cryptr_1 = __importDefault(require("cryptr"));
const emailSenderService_1 = require("../service/emailSenderService");
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    getUserByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cryptr = new cryptr_1.default('Password');
                let user;
                let document;
                let userValid = false;
                let email;
                req.body.password = cryptr.encrypt(req.body.password);
                const userModel = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                user = userModel.createModel();
                document = new user(req.body);
                (0, db_config_1.databaseConnection)()
                    .then(conn => {
                    if (conn) {
                        console.log("Connection established to database: " + conn);
                        if (document && document instanceof mongoose_1.default.Model) {
                            document.save()
                                .then((result) => {
                                if (result) {
                                    console.log('User saved', result);
                                    userValid = true;
                                    if (userValid) {
                                        console.log('userValid:' + userValid);
                                        email = new emailSenderService_1.Email('delivered@resend.dev', ['ruizbaleanipedro@gmail.com']);
                                        email.sendEmail(email)
                                            .then(email => console.log(email))
                                            .catch(err => { return res.status(500).send().json({ result: "error", error: err }); });
                                    }
                                    res.status(201).json({ "result": "ok", "response": result });
                                }
                            })
                                .catch(err => {
                                res.status(501).json({ result: "error", error: err.message });
                            });
                        }
                    }
                })
                    .catch(err => {
                    res.status(500).send().json({ result: "error", error: err });
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
}
exports.UserController = UserController;
;
