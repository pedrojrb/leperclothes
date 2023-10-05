"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfiguration = void 0;
const dotenv = __importStar(require("dotenv"));
class ServerConfiguration {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        });
    }
    /**
     * This function return name of environment.
     * @param key Enviroment variable's name that need search into proccess object.
     * @returns number of server port but in string type.
     */
    getEnvironment(key) {
        return process.env[key];
    }
    /**
     * This function transform number port from environment variable to number type.
     * @param key Enviroment variable's name that need search into proccess object.
     * @returns number of port (type number).
     */
    getNumberPort(key) {
        return Number(this.getEnvironment(key));
    }
    /**
     * This function return environment from we are running server.
     * If environment is  production this return 'product' if not return ''.
     * @returns name of environment (type string)
     */
    get nodeEnv() {
        var _a;
        return ((_a = this.getEnvironment('NODE_ENV')) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    }
    /**
     * This function is used to create path from wich server will know environment variables.
     * @param path name of environment
     * @returns path of env file (type string)
     */
    createPathEnv(path) {
        if (path.length === 0) {
            return `.env`;
        }
        return `${path}.env`;
    }
}
exports.ServerConfiguration = ServerConfiguration;
