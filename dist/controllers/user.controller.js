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
const validations_1 = require("../config/database/middleware/validations");
const users_validations_1 = require("../config/database/middleware/users.validations");
class UserController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method === 'GET') {
                try {
                    res.status(200).json({ result: "ok", data: "Login page successfully" });
                }
                catch (error) {
                    if (error.code === 400) {
                        res.status(400).json({ result: "error", data: "Login page failed" });
                    }
                    if (error.code === 404) {
                        res.status(404).json({ result: "error", data: "Page not found" });
                    }
                }
            }
            if (req.method === "POST") {
                let token;
                let cryptr = new cryptr_1.default('Password');
                let model = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                let document = model.createModel();
                let filter = req.body;
                let passDecrypted;
                try {
                    //handle errors meesage if username or password is not includes in request body.
                    console.log(filter.username.length);
                    if (!filter.username || filter.username.length === 0)
                        throw new Error(`Username is required`);
                    if (!filter.password || filter.password.length === 0)
                        throw new Error(`Password is required`);
                    (0, db_config_1.databaseConnection)()
                        .then(connection => {
                        //when the connection is established find  user match with filter in  database
                        document.findOne({ username: filter.username }).exec()
                            .then((data) => {
                            //Ask if exists user matches
                            if (!data) {
                                throw new Error(`Username and password is required`);
                                ;
                            }
                            //verify if data is a object type.
                            if (typeof data === 'object') {
                                //Data received from database decrypt password for comparate with password in body request.
                                passDecrypted = cryptr.decrypt(data.password);
                                if (filter.password === passDecrypted) {
                                    //create token with username,email and verified data of user.
                                    token = (0, token_1.createToken)({
                                        "username": data.username,
                                        "email": data.email,
                                        "verified": data.verified
                                    }, "1h");
                                    res.status(200).json({ result: "ok", response: data, access_token: token });
                                    return;
                                }
                                throw new Error('Invalid username or password');
                            }
                            throw new Error('Error in request: ' + data);
                        })
                            .catch(error => {
                            res.status(401).json({ result: "error", error: error.message });
                            return;
                        });
                    })
                        .catch(error => {
                        res.status(401).json({ result: "error", error: error });
                        return;
                    });
                }
                catch (error) {
                    res.status(401).json({ result: "error", error: error.message });
                    return;
                }
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new users_model_1.CUserModel('user', user_schema_1.userSchema);
            let document = model.createModel();
            let token;
            try {
                if (req.headers.authorization) {
                    token = req.headers.authorization.split(' ')[1];
                    (0, token_1.verifyToken)(token);
                }
                //connect to database
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find all tshirts in database
                    document.find().exec()
                        .then(data => {
                        res.status(200).json({ result: "ok", response: data });
                        return;
                    })
                        .catch(error => {
                        console.log(error);
                        res.status(401).json({ result: "ok", error: error });
                        return;
                    });
                })
                    .catch(error => {
                    res.status(401).json({ result: "error", error: error });
                    return;
                });
            }
            catch (error) {
                res.status(401).json({ result: "error", error: error.message });
                return;
            }
        });
    }
    ;
    getUserByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new users_model_1.CUserModel('user', user_schema_1.userSchema);
            let document = model.createModel();
            let filter;
            let token;
            const username = req.query.username;
            try {
                if (req.headers.authorization) {
                    token = req.headers.authorization.split(' ')[1];
                    (0, token_1.verifyToken)(token);
                }
                if (username === undefined || username.length === 0) {
                    res.status(401).json({ result: "error", error: "Don't exist filter" });
                    return;
                }
                ;
                if (typeof username === 'string') {
                    filter = new RegExp(username, 'gi');
                }
                //connect to database
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find  tshirts match with filter in  database
                    document.find({ username: filter }).exec()
                        .then(data => {
                        if (data.length === 0) {
                            res.status(200).json({ result: "ok", response: data, comment: `There are no results that match the search: ${username}` });
                            return;
                        }
                        res.status(200).json({ result: "ok", response: data });
                        return;
                    })
                        .catch(error => {
                        console.log(error);
                        res.status(401).json({ result: "error", error: error.message });
                        return;
                    });
                })
                    .catch(error => {
                    res.status(401).json({ result: "error", error: error.message });
                    return;
                });
            }
            catch (error) {
                res.status(401).json({ result: "error", error: error.message });
                return;
            }
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
                                            .catch(err => {
                                            res.status(500).json({ result: "error", error: err });
                                            return;
                                        });
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
                    .catch((error) => {
                    res.status(500).json({ result: "error", error: error.message });
                    return;
                });
            }
            catch (error) {
                res.status(500).json({ result: "error", error: error.message });
                return;
            }
        });
    }
    modifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                let filter;
                let update;
                let token;
                const userModel = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                //verify if token is valid or is not expired
                if (req.headers.authorization) {
                    token = req.headers.authorization.split(' ')[1];
                    (0, token_1.verifyToken)(token);
                }
                user = userModel.createModel();
                filter = req.params.id;
                update = req.body;
                if (!(0, users_validations_1.isValidToUpdate)(Object.keys(update)))
                    throw new Error('There are properties that cannot be updated');
                if (!(0, validations_1.allPropertiesAreValid)(user_schema_1.userSchema, update))
                    throw new Error('Properties are not valid: ' + (0, validations_1.propertiesInvalids)(user_schema_1.userSchema, update));
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find all tshirts in database
                    user.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(filter) }, update, { new: true }).exec()
                        .then(data => {
                        res.status(200).json({ result: "ok", response: data });
                        return;
                    })
                        .catch(error => {
                        res.status(401).json({ result: "error", error: error.message });
                        return;
                    });
                })
                    .catch(error => {
                    res.status(401).json({ result: "error", error: error.message });
                    return;
                });
            }
            catch (error) {
                res.status(401).json({ result: "error", error: error.message });
                return;
            }
        });
    }
    ;
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            let filter;
            const userModel = new users_model_1.CUserModel('user', user_schema_1.userSchema);
            let token;
            //verify if token is valid or is not expired
            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
                (0, token_1.verifyToken)(token);
            }
            user = userModel.createModel();
            filter = req.params.id;
            try {
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established search the user by id
                    user.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(filter) }, { new: true }).exec()
                        .then(data => {
                        if (data.deletedCount === 1) {
                            res.status(200).json({ result: "ok", response: data });
                            return;
                        }
                        else {
                            res.status(200).json({ result: "ok", response: `User has already been removed`, data: data });
                            return;
                        }
                    })
                        .catch(error => {
                        res.status(401).json({ result: "error", error: error.message });
                        return;
                    });
                })
                    .catch(error => {
                    res.status(401).json({ result: "error", error: error.message });
                    return;
                });
            }
            catch (error) {
                if (Object.getOwnPropertyNames(error).includes("message")) {
                    res.status(401).json({ result: "error", error: error.message });
                    return;
                }
            }
        });
    }
    ;
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email;
            let model;
            let code;
            let token = req.params.token;
            let payload = (0, token_1.verifyToken)(token);
            let document;
            try {
                if (req.method === 'GET') {
                    res.send({ result: 'ok', response: payload });
                    res.end();
                    return;
                }
                if (req.method === 'POST') {
                    model = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                    document = model.createModel();
                    //Verify if email is present in payload.
                    if (!payload)
                        throw Error('Token is expired');
                    if (typeof payload == 'object' && payload['email'] && payload['code']) {
                        email = payload['email'];
                        code = payload['code'];
                        //connection to database
                        (0, db_config_1.databaseConnection)()
                            .then(connection => {
                            if (req.body.code === code) {
                                //find in database if exists email address and update value of verification
                                let data = document.findOneAndUpdate({ email: email }, { verificated: true }, { new: true });
                                data
                                    .then((data) => {
                                    res.send({ result: "ok", response: "User verified successfully" });
                                    return;
                                })
                                    .catch((error) => {
                                    res.status(400).send({ result: error, response: error });
                                    return;
                                });
                            }
                            throw Error('Invalid code');
                        })
                            .catch(error => {
                            res.status(401).send({ result: "error", error: error.message });
                            return;
                        });
                    }
                }
            }
            catch (error) {
                res.json({ result: "error", message: error });
                return;
            }
        });
    }
}
exports.UserController = UserController;
