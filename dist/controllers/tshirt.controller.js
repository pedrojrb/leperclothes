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
const clothes_validations_1 = require("../config/database/middleware/clothes.validations");
class CtshirtController {
    getAllTshirts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
            let document = model.createModel();
            try {
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
            catch (err) {
                res.status(401).json({ result: "error", error: err });
                return;
            }
        });
    }
    getTshirtById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
            let document = model.createModel();
            const id = req.params.id;
            try {
                //connect to database
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find all tshirts in database
                    document.findById({ _id: new mongoose_1.default.Types.ObjectId(id) }).exec()
                        .then(data => {
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
                res.status(401).json({ result: "error", error: error });
                return;
            }
        });
    }
    ;
    getTshirtByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    createTshirt(req, res) {
        try {
            let tshirt;
            let document;
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
                                return res.status(201).json({ "result": "ok", "response": result });
                            }
                        })
                            .catch(err => {
                            res.status(501).json({ result: "error", error: err.message });
                        });
                    }
                }
            })
                .catch(err => {
                res.status(500).json({ result: "error", error: err });
                throw new Error('Error while connecting to database: ' + err);
            });
        }
        catch (err) {
            res.status(500).json({ result: "error", error: err });
        }
    }
    modifyTshirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tshirt;
                let filter;
                let update;
                const tshirtModel = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
                tshirt = tshirtModel.createModel();
                filter = req.params.id;
                update = req.body;
                if (!(0, clothes_validations_1.allPropertiesAreValid)(update))
                    throw new Error('Properties are not valid: ' + (0, clothes_validations_1.propertiesInvalids)(update));
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find all tshirts in database
                    tshirt.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(filter) }, update, { new: true }).exec()
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
    deleteTshirt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tshirt;
            let filter;
            const tshirtModel = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
            tshirt = tshirtModel.createModel();
            filter = req.params.id;
            try {
                (0, db_config_1.databaseConnection)()
                    .then(connection => {
                    //when the connection is established find all tshirts in database
                    tshirt.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(filter) }, { new: true }).exec()
                        .then(data => {
                        if (data.deletedCount === 1) {
                            res.status(200).json({ result: "ok", response: data });
                            return;
                        }
                        else {
                            res.status(200).json({ result: "ok", response: `T-shirt has already been removed`, data: data });
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
}
exports.CtshirtController = CtshirtController;
;
