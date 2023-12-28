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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_schema_1 = require("../config/database/schema/user.schema");
const users_model_1 = require("../config/database/models/users.model");
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
                const userModel = new users_model_1.CUserModel('user', user_schema_1.userSchema);
                userModel.createModel(req)
                    .then(response => {
                    res.status(201).json({ "result": "ok", "data": response });
                })
                    .catch(err => {
                    res.status(400).json({ result: "error", err: err });
                    throw new Error('Error durating creating model: ' + err);
                });
            }
            catch (err) {
                if (res.statusCode) {
                    throw new Error(`HTTP Error, error code: ${res.statusCode} - ${res.statusMessage}`);
                }
                throw new Error('Error creating new user: ' + err);
            }
        });
    }
    ;
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
