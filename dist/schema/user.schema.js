"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
class CUserSchema extends schema_1.CBaseSchema {
    constructor(user) {
        super();
        this.deleted = false;
        this.verificated = false;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.created_at = user.created_at;
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
    validateSchema(schema) {
        this.validateUsername(schema.username);
        this.validateEmail(schema.email);
        this.validatePassword(schema.password);
    }
    validateUsername(username) {
        let regex = new RegExp('^[a-z0-9]+$');
        try {
            username = username.toLowerCase();
            if (!username || username.length <= 0)
                throw new Error(`Username is required`);
            if (username.length > 10)
                throw new Error('Invalid username, maximum length is 10.');
            if (!regex.test(username))
                throw new Error('Username contains invalid characters. n\ Characters validate are alphanumeric only.');
            return;
        }
        catch (err) {
            throw err;
        }
    }
    validateEmail(email) {
        let regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        try {
            if (!email || email.length <= 0)
                throw new Error('Please enter an email address');
            if (!regex.test(email))
                throw new Error('Invalid email. n\ Please enter a valid email address.');
            return;
        }
        catch (err) {
            throw err;
        }
    }
    validatePassword(password) {
        let regex = new RegExp(`^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*`);
        try {
            if (!password || password.length <= 0)
                throw new Error('Please enter a password');
            if (!regex.test(password))
                throw new Error('Password has invalid characters');
            if (password.length < 8)
                throw new Error('Password must be at least 8 characters');
            if (password.length > 12)
                throw new Error('Password  must be 12 characters maximum');
        }
        catch (err) {
            throw err;
        }
    }
}
exports.CUserSchema = CUserSchema;
