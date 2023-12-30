"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSize = exports.validateName = void 0;
/**
 * This function is responsible for validating data before sending to the database.
 * @param Reference of the tshirt schema
 * return the next middleware function.
 */
function validateName(value) {
    return value.length > 5 && value.length <= 100;
}
exports.validateName = validateName;
function validateSize(schema) {
}
exports.validateSize = validateSize;
