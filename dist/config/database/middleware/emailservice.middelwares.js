"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHTMLformattedForEmail = exports.getRandomCode = void 0;
function getRandomCode(min = 11111, max = 99999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.getRandomCode = getRandomCode;
function getHTMLformattedForEmail(token, code) {
    let html = `<h1>Confirmation code - Eleper Clothes</h1> <br> <p>Insert code: <h3>${code}</h3></p>`;
    return html;
}
exports.getHTMLformattedForEmail = getHTMLformattedForEmail;
