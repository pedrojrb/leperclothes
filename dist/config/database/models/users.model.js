"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUserModel = void 0;
const model_1 = require("./model");
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("../schema/user.schema");
class CUserModel extends model_1.CBaseModel {
    constructor(name, schema) {
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }
    createModel() {
        try {
            //Ask if the model is already created or if not create it.
            return mongoose_1.default.models.user || mongoose_1.default.model('user', new mongoose_1.default.Schema(user_schema_1.userSchema));
        }
        catch (err) {
            throw new Error('Error creating model: ' + err);
        }
    }
}
exports.CUserModel = CUserModel;
