"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUserModel = void 0;
const model_1 = require("./model");
class CUserModel extends model_1.CBaseModel {
    constructor(name, schema) {
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }
}
exports.CUserModel = CUserModel;
