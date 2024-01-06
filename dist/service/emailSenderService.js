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
exports.Email = void 0;
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Email {
    constructor(from, to) {
        this.subject = 'Confirmation code - EleperClothes';
        this.html = '';
        this.from = from;
        this.to = to;
        this.key = process.env.API_RESEND_KEY ? process.env.API_RESEND_KEY : undefined;
    }
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let resend = createKey(this.key);
            let retry = 0;
            try {
                while (retry < 3) {
                    if (resend) {
                        return yield resend.emails.send({ from: email.from, to: email.to, subject: email.subject, html: email.html, headers: { Authorization: `Bearer ${this.key}` } });
                    }
                }
            }
            catch (e) {
                retry++;
                throw ('Email send failed: ' + e);
            }
        });
    }
}
exports.Email = Email;
function createKey(key) {
    if (key) {
        const resend = new resend_1.Resend(key);
        if (resend) {
            return resend;
        }
    }
    ;
    throw new Error('Invalid API key');
}
