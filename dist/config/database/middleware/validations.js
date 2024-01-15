"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesInvalids = exports.allPropertiesAreValid = void 0;
function allPropertiesAreValid(original, updated) {
    let originalsProperties = Object.keys(original);
    let newProperties = Object.keys(updated);
    return newProperties.every(prop => originalsProperties.includes(prop));
}
exports.allPropertiesAreValid = allPropertiesAreValid;
function propertiesInvalids(original, updated) {
    let originalsProperties = Object.keys(original);
    let newProperties = Object.keys(updated);
    return newProperties.filter(prop => !originalsProperties.includes(prop));
}
exports.propertiesInvalids = propertiesInvalids;
