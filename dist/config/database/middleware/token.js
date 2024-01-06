"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(arg) {
    let token = '';
    if (!process.env.SECRET_TOKEN_KEY) {
        throw new Error('token key is required');
    }
    token = jsonwebtoken_1.default.sign(arg, process.env.SECRET_TOKEN_KEY, { expiresIn: 900 });
    return token;
}
exports.createToken = createToken;
function verifyToken(token) {
    let data;
    if (process.env.SECRET_TOKEN_KEY) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY, (err, payload) => {
            if (err)
                return err;
            data = payload;
        });
        return data;
    }
}
exports.verifyToken = verifyToken;