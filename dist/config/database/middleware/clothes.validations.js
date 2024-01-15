"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrice = exports.validateColor = exports.validateSize = exports.validateName = void 0;
const clothes_schema_1 = require("../schema/clothes.schema");
/**
 * This function is responsible for validating data before sending to the database.
 * @param Reference of the tshirt schema
 * return the next middleware function.
 */
function validateName(value) {
    return value.length > 5 && value.length <= 100;
}
exports.validateName = validateName;
function validateSize(value) {
    return Object.values(clothes_schema_1.TSizeClothes).includes(value);
}
exports.validateSize = validateSize;
function validateColor(value) {
    let allValues = Object.values(value);
    return allValues.every(value => value >= 0 && value <= 255);
}
exports.validateColor = validateColor;
function validatePrice(value) {
    return value > 0;
}
exports.validatePrice = validatePrice;
