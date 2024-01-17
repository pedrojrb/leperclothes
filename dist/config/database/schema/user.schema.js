"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.CUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const users_validations_1 = require("../middleware/users.validations");
class CUserSchema extends schema_1.CBaseSchema {
    constructor(user) {
        super();
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.created_at = user.created_at;
        this.verificated = user.verificated;
        this.createSchema(this);
    }
    createSchema(schema) {
        try {
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
let user = new CUserSchema({
    username: {
        type: "String",
        required: true,
        unique: [true, 'Username already in use, please choose a different'],
        validate: users_validations_1.validateUsername
    },
    email: {
        type: "String",
        required: true,
        unique: [true, 'Email already in use, please choose a different'],
        validate: users_validations_1.validateEmail
    },
    password: {
        type: "String",
        required: true,
        validate: users_validations_1.validatePassword
    },
    created_at: {
        type: "Date",
        default: new Date()
    },
    verificated: {
        type: "Boolean",
        default: false
    }
});
exports.userSchema = user;
