"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTshirtModel = void 0;
const db_config_1 = require("../db.config");
const model_1 = require("./model");
const mongoose_1 = __importDefault(require("mongoose"));
class CTshirtModel extends model_1.CBaseModel {
    constructor(name, schema) {
        super(name, schema);
        this.name = name;
        this.schema = schema;
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Create connection to database
                (0, db_config_1.databaseConnection)()
                    .then(conn => {
                    console.log('Connection to database successfully created: ' + conn);
                    let tshirtModel = mongoose_1.default.model('tshirt', this.schema);
                    let tshirt = new mongoose_1.default.Model(this.name, {
                        name: 'Test',
                        color: 'Red',
                        size: 'L',
                        created_at: new Date()
                    });
                    if (tshirt instanceof mongoose_1.default.Model) {
                        let savedTshirt = tshirt.save();
                        if (savedTshirt) {
                            console.log('Tshirt saved', savedTshirt);
                        }
                    }
                });
            }
            catch (e) {
                throw Error('Error creating model: ' + e);
            }
        });
    }
}
exports.CTshirtModel = CTshirtModel;
