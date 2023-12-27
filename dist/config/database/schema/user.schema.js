"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.CUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
class CUserSchema extends schema_1.CBaseSchema {
    constructor(user) {
        super();
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.deleted = user.deleted;
        this.created_at = user.created_at;
        this.verificated = user.verificated;
        this.createSchema(this);
    }
    createSchema(schema) {
        try {
            this.validateSchema(schema);
            let userSchema = new mongoose_1.default.Schema(schema);
            if (userSchema instanceof mongoose_1.default.Schema) {
                console.log(`Schema of user created successfully`);
                return;
            }
        }
        catch (error) {
            throw new Error(`Error creating schema: ${error}`);
        }
    }
}
exports.CUserSchema = CUserSchema;
exports.userSchema = new CUserSchema({
    username: {
        type: "String"
    },
    email: {
        type: "String"
    },
    password: {
        type: "String"
    },
    deleted: {
        type: "Boolean"
    },
    created_at: {
        type: "Date"
    },
    verificated: {
        type: "Boolean"
    }
});
