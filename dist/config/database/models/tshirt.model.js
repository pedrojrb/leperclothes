"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTshirtModel = void 0;
const model_1 = require("./model");
const mongoose_1 = __importDefault(require("mongoose"));
const clothes_schema_1 = require("../schema/clothes.schema");
class CTshirtModel extends model_1.CBaseModel {
    constructor(name, schema) {
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }
    createModel() {
        try {
            return mongoose_1.default.model('tshirt', new mongoose_1.default.Schema(clothes_schema_1.clothesSchema));
        }
        catch (err) {
            throw new Error('Error creating model: ' + err);
        }
    }
}
exports.CTshirtModel = CTshirtModel;
