"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, name, lastname, gender, password, email) {
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.gender = gender;
        this.password = password;
        this.email = email;
        this.eliminated = false;
        this.verified = false;
    }
}
exports.User = User;
