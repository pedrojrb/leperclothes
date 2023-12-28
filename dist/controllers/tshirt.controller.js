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
exports.CtshirtController = void 0;
const clothes_schema_1 = require("../config/database/schema/clothes.schema");
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
            const tshirtModel = new tshirt_model_1.CTshirtModel('tshirt', clothes_schema_1.clothesSchema);
            tshirtModel.createModel(req)
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
            throw new Error('Error creating new tshirt: ' + err);
        }
    }
    ;
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
