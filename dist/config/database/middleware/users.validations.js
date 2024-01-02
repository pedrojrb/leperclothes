"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = exports.validateUsername = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
/**
 * This function is responsible for validating data before sending to the database.
 * @param Reference of the tshirt schema
 * return the next middleware function.
 */
function validateUsername(username) {
    let regex = new RegExp('^[a-z0-9]+$');
    try {
        username = username.toLowerCase();
        if (!username || username.length <= 0)
            throw new Error(`Username is required`);
        if (username.length > 10)
            throw new Error('Invalid username, maximum length is 10.');
        if (!regex.test(username))
            throw new Error('Username contains invalid characters. n\ Characters validate are alphanumeric only.');
        return true;
    }
    catch (err) {
        throw err;
    }
}
exports.validateUsername = validateUsername;
function validateEmail(email) {
    let regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    try {
        if (!email || email.length <= 0)
            throw new Error('Please enter an email address');
        if (!regex.test(email))
            throw new Error('Invalid email. n\ Please enter a valid email address.');
        return true;
    }
    catch (err) {
        throw err;
    }
}
exports.validateEmail = validateEmail;
function validatePassword(password) {
    const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d)("#/@$!%*?&+}{]{8,10}$`);
    const cryptr = new cryptr_1.default('Password');
    try {
        password = cryptr.decrypt(password);
        if (!password)
            throw new Error('Please enter a password');
        if (password.length < 7)
            throw new Error('Password minimum length is 8');
        if (password.length > 10)
            throw new Error('Password maximum length is 10');
        if (!regex.test(password))
            throw new Error('Password is invalid, please enter a valid password.\n Password validate included: minimum 8 characters and maximum 10, one special character(#/@$!%*?&+}{]), one uppercase character, one lowercase character and one number.\n Please try again later.');
        return true;
    }
    catch (err) {
        throw err;
    }
}
exports.validatePassword = validatePassword;
