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
exports.CtshirtController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clothes_schema_1 = require("../config/database/schema/clothes.schema");
const db_config_1 = require("../config/database/db.config");
const tshirt_model_1 = require("../config/database/models/tshirt.model");
class CtshirtController {
    getAllTshirts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    getTshirtByTshirtname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: Write req.params and use that value for filter when get data of database.
            //TODO: Create new connection to database and get tshirts data.
        });
    }
    ;
    createTshirt(req, res) {
        try {
            let tshirt, document;
            const tshirtModel = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
            tshirt = tshirtModel.createModel();
            document = new tshirt(req.body);
            (0, db_config_1.databaseConnection)()
                .then(conn => {
                if (conn) {
                    console.log("Connection established to database: " + conn);
                    if (document && document instanceof mongoose_1.default.Model) {
                        document.save()
                            .then((result) => {
                            if (result) {
                                console.log('Tshirt saved', result);
                                /* disconnectDatabase()
                                .then((result) => {
                                    console.log('Disconnect Database connection: ' + result);
                                return result;
                                })
                                .catch(err => {
                                    throw new Error('Error while disconnecting database: ' + err)}
                                ); */
                                return res.status(201).json({ "result": "ok", "response": result });
                            }
                        })
                            .catch(err => {
                            res.status(501).json({ result: "error", error: err });
                            throw new Error('Error durating save tshirt in database: ' + err);
                        });
                    }
                }
            })
                .catch(err => {
                res.status(500).send().json({ result: "error", error: err });
                throw new Error('Error while connecting to database: ' + err);
            });
        }
        catch (e) {
            throw Error('Error creating model: ' + e);
        }
    }
    /* .then(response => {
        
            res.status(201).json({"result": "ok", "data": response});
    })
    .catch(err => {
        res.status(400).json({ result:"error",err: err})
        throw new Error('Error durating creating model: ' + err)});
    */
    modifyTshirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    deleteTshirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
}
exports.CtshirtController = CtshirtController;
;
