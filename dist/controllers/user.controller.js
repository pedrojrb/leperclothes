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
const token_1 = require("../config/database/middleware/token");
const emailservice_middelwares_1 = require("../config/database/middleware/emailservice.middelwares");
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
                //initialize all variables used in the request
                let code = (0, emailservice_middelwares_1.getRandomCode)();
                let token;
                let cryptr = new cryptr_1.default('Password');
                let user;
                let document;
                let userValid = false;
                let email;
                const userModel = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                //encrypt password before save in database
                req.body.password = cryptr.encrypt(req.body.password);
                //create model and documents for save in database
                user = userModel.createModel();
                document = new user(req.body);
                //connect to database
                (0, db_config_1.databaseConnection)()
                    .then(conn => {
                    if (conn) {
                        console.log("Connection established to database: " + conn);
                        if (document && document instanceof mongoose_1.default.Model) {
                            //save the document
                            document.save()
                                .then((result) => {
                                if (result) {
                                    console.log('User saved', result);
                                    userValid = true;
                                    //send confirmation email
                                    if (userValid) {
                                        email = new emailSenderService_1.Email('delivered@resend.dev', [req.body.email]);
                                        token = (0, token_1.createToken)({
                                            "email": email.to[0],
                                            "code": code
                                        });
                                        email.html = (0, emailservice_middelwares_1.getHTMLformattedForEmail)(token, code);
                                        email.sendEmail(email)
                                            .then(emailSender => {
                                            console.log(`Email send ${emailSender} successfully`);
                                        })
                                            .catch(err => { return res.status(500).send().json({ result: "error", error: err }); });
                                        res
                                            .redirect(`verify/${token}`);
                                        return;
                                    }
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
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email;
            let model = new users_model_1.CUserModel('user', user_schema_1.userSchema);
            let code;
            let token = req.params.token;
            let payload = (0, token_1.verifyToken)(token);
            let document = model.createModel();
            try {
                //if verification token is present then search token data.
                if (payload) {
                    //Verify if email is present in payload.
                    if (typeof payload === 'object' && payload['email']) {
                        email = payload['email'];
                        //Only connect to database if request is POST.
                        if (req.method === 'POST') {
                            //connection to database
                            (0, db_config_1.databaseConnection)()
                                .then(connection => {
                                if (connection) {
                                    if (typeof payload === 'object' && payload['code']) {
                                        code = payload['code'];
                                        if (req.body.code === code) {
                                            //find in database if exists email address and update value of verification
                                            document.findOneAndUpdate({ email: email }, { verificated: true }).exec();
                                            res.status(201).send().json({ result: "ok", "data": "User verified successfully" });
                                            return;
                                        }
                                        res.status(401.).send().json({ result: "error", "data": "Invalid code" });
                                        return;
                                    }
                                }
                            })
                                .catch(error => {
                                res.status(501).send().json({ result: "error", error: error });
                                return;
                            });
                        }
                    }
                    res.status(401).send().json({ result: "ok", "data": "Expired token" });
                    return;
                }
                res.status(200).json({ result: "ok", message: payload });
                return;
            }
            catch (error) {
                res.status(401).json({ result: "error", message: error });
                return;
            }
        });
    }
}
exports.UserController = UserController;
