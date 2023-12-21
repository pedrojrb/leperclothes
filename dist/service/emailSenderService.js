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
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let resend;
function createKey(key) {
    if (key)
        resend = new resend_1.Resend(key);
    throw new Error('Invalid API key');
}
class Email {
    constructor(from, to, subject, html) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;
        createKey(process.env.API_RESEND_KEY);
    }
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let retry = 0;
            try {
                while (retry < 3) {
                    return yield resend.emails.send(email);
                }
            }
            catch (e) {
                retry++;
                throw ('Email send failed: ' + e);
            }
        });
    }
}
