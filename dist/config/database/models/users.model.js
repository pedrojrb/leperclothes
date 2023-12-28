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
exports.CUserModel = void 0;
const db_config_1 = require("../db.config");
const model_1 = require("./model");
const mongoose_1 = __importDefault(require("mongoose"));
class CUserModel extends model_1.CBaseModel {
    constructor(name, schema) {
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }
    createModel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //variables are created for save model and create new documents.
                let userModel;
                let user;
                //Call connection to database
                (0, db_config_1.databaseConnection)()
                    .then(conn => {
                    if (conn) {
                        console.log("Connection established to database");
                        //intialize my variable creating Model object
                        userModel = mongoose_1.default.model('user', new mongoose_1.default.Schema(this.schema));
                        user = new userModel(req.body);
                        //When tshirt is created can i follow with the save data in the database
                        if (user instanceof mongoose_1.default.Model) {
                            user.save()
                                .then((result) => {
                                console.log('User saved', result);
                                return result;
                            })
                                .catch(err => { throw new Error('Error durating save user in database: ' + err); });
                        }
                    }
                })
                    .catch(err => { throw new Error('Error while connecting to database: ' + err); });
            }
            catch (e) {
                throw Error('Error creating model: ' + e);
            }
        });
    }
}
exports.CUserModel = CUserModel;
