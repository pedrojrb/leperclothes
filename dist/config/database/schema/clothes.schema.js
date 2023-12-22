"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const mongoose_1 = __importDefault(require("mongoose"));
class CClothesSchema extends schema_1.CBaseSchema {
    constructor(clothes) {
        super();
        this.name = clothes.name;
        this.size = clothes.size;
        this.color = clothes.color;
        this.price = clothes.price;
        this.created_at = clothes.created_at;
    }
    createSchema(schema) {
        try {
            this.validateSchema(schema);
            let clothesSchema = new mongoose_1.default.Schema(schema);
            if (clothesSchema instanceof mongoose_1.default.Schema) {
                console.log('Schema of clothes created successfully');
                return;
            }
        }
        catch (error) {
            throw new Error('Error creating schema: ' + error);
        }
    }
    validateSchema(schema) {
        this.validateName(schema.name);
        this.validatePrice(schema.price);
    }
    validateName(name) {
        try {
            if (!name)
                throw new Error('Name is required');
            if (name.length > 100)
                throw new Error('Name must be at least 100 characters long');
        }
        catch (error) {
            throw new Error('Error while validating name:' + error);
        }
    }
    validatePrice(price) {
        try {
            if (!price)
                throw new Error('Price is required');
            if (price < 0)
                throw new Error('Price dont be negative value');
        }
        catch (error) {
            throw new Error('Error while validating price: ' + error);
        }
    }
}
