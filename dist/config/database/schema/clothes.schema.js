"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clothesSchema = exports.CTshirtSchema = exports.TSizeClothes = void 0;
const schema_1 = require("./schema");
const mongoose_1 = __importDefault(require("mongoose"));
const clothes_validations_1 = require("../middleware/clothes.validations");
var TSizeClothes;
(function (TSizeClothes) {
    TSizeClothes[TSizeClothes["S"] = 0] = "S";
    TSizeClothes[TSizeClothes["M"] = 1] = "M";
    TSizeClothes[TSizeClothes["L"] = 2] = "L";
    TSizeClothes[TSizeClothes["XL"] = 3] = "XL";
    TSizeClothes[TSizeClothes["XXL"] = 4] = "XXL";
    TSizeClothes[TSizeClothes["XXXL"] = 5] = "XXXL";
})(TSizeClothes || (exports.TSizeClothes = TSizeClothes = {}));
;
class CTshirtSchema extends schema_1.CBaseSchema {
    constructor(clothes) {
        super();
        this.name = clothes.name;
        this.size = clothes.size;
        this.color = clothes.color;
        this.price = clothes.price;
        this.created_at = clothes.created_at;
        this.createSchema(this);
    }
    createSchema(schema) {
        try {
            let clothesSchema = new mongoose_1.default.Schema(schema);
            if (clothesSchema instanceof mongoose_1.default.Schema) {
                console.log('Schema of clothes created successfully');
            }
        }
        catch (error) {
            throw new Error('Error creating schema: ' + error);
        }
    }
}
exports.CTshirtSchema = CTshirtSchema;
exports.clothesSchema = new CTshirtSchema({
    name: {
        type: "String",
        unique: [true, 'Name is required'],
        validate: [clothes_validations_1.validateName, 'Name required between 5 and 100 characters length']
    },
    size: {
        type: "String",
        required: [true, 'Size is required'],
        validate: [clothes_validations_1.validateSize, 'Size availables are: ' + Object.values(TSizeClothes)]
    },
    color: {
        type: "Object",
        validate: [clothes_validations_1.validateColor, 'RGB value must be a number between 0 and 255']
    },
    price: {
        type: "String",
        validate: [clothes_validations_1.validatePrice, 'Price cannot be less than 0']
    },
    created_at: {
        type: "Date",
        default: new Date()
    }
});
